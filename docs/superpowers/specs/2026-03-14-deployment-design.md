# Deployment Design: luka-young → amcham.indigo.si

**Date:** 2026-03-14
**Project:** luka-young (Next.js 16, standalone output)
**Target server:** Ubuntu (`amcham` SSH alias)
**Domain:** amcham.indigo.si

---

## Architecture Overview

```
GitHub repo
    │
    ├─ push to main
    │
    ▼
GitHub Actions
    ├─ docker build (multi-stage, existing Dockerfile)
    └─ docker push → registry.amcham.indigo.si (HTTPS, HTTP basic auth)

Ubuntu server (amcham)
    /opt/luka-young/
    ├─ docker-compose.yml         ← all four services
    ├─ traefik/
    │    ├─ traefik.yml           ← static config: entrypoints, ACME, Docker provider
    │    └─ acme.json             ← Let's Encrypt cert storage (chmod 600)
    └─ auth/
         └─ htpasswd              ← registry bcrypt credentials

    docker-compose services:
    ├─ traefik          → TLS termination (Let's Encrypt HTTP-01), HTTP→HTTPS redirect, routing
    ├─ registry         → registry.amcham.indigo.si (htpasswd auth)
    ├─ luka-young       → amcham.indigo.si (Next.js app, port 3000)
    └─ watchtower       → polls registry every 5 min, redeploys on new image digest
```

All services share a Docker network named `proxy`, declared as an external network in `docker-compose.yml` and created once on the server with `docker network create proxy`. Traefik routes by hostname. No host ports bound for app or registry — all traffic flows through Traefik on 80/443.

---

## Prerequisites

Before running the stack, the server must have:

- Docker Engine + Docker Compose plugin installed
- Ports 80 and 443 open in UFW: `ufw allow 80/tcp && ufw allow 443/tcp`
- DNS A records pointing to the server's public IP:
  - `amcham.indigo.si`
  - `registry.amcham.indigo.si`

---

## Components

### Traefik
- Image: `traefik:v3` (latest stable v3.x — pinned to major version for automatic patch updates)
- Static config in `traefik/traefik.yml` (required — ACME cannot be configured via CLI flags alone in v3):
  - Entrypoints: `web` (80) and `websecure` (443)
  - HTTP→HTTPS redirect defined as a global middleware on the `web` entrypoint
  - `certificatesResolvers.letsencrypt` using HTTP-01 challenge with a Let's Encrypt account email (must be set during setup — use the operator's real email for renewal notifications)
  - `acme.storage` pointing to `/acme.json` inside the container
  - Docker provider with `exposedByDefault: false`
- Ports 80 and 443 bound to host
- `/var/run/docker.sock` mounted read-only for container discovery
- `acme.json` volume mounted from `traefik/acme.json` (must exist with `chmod 600` before first start)
- Docker network: `proxy`

### Docker Registry
- Image: `registry:2`
- Subdomain: `registry.amcham.indigo.si`
- Auth: `htpasswd` file (bcrypt) mounted from `auth/htpasswd`
- `REGISTRY_AUTH=htpasswd`, `REGISTRY_AUTH_HTPASSWD_REALM`, `REGISTRY_AUTH_HTPASSWD_PATH` env vars
- `REGISTRY_STORAGE_DELETE_ENABLED=true` to allow garbage collection
- Image layer data in a named Docker volume
- Traefik label: `Host('registry.amcham.indigo.si')` + TLS via `letsencrypt` resolver

### luka-young App
- Image: `registry.amcham.indigo.si/luka-young:latest`
- Subdomain: `amcham.indigo.si`
- Internal port: 3000 (no host binding)
- Traefik label: `Host('amcham.indigo.si')` + TLS + `loadbalancer.server.port=3000`
- Watchtower opt-in label: `com.centurylinklabs.watchtower.enable=true`
- `restart: unless-stopped`

### Watchtower
- Image: `containrrr/watchtower`
- Scoped to labeled containers only via `--label-enable`
- Poll interval: `--interval 300` (5 minutes)
- Registry credentials: `~/.docker/config.json` from the host mounted to `/config/config.json` inside the container, with env var `DOCKER_CONFIG=/config` pointing to the directory
- `restart: unless-stopped`

### GitHub Actions Workflow
- File: `.github/workflows/deploy.yml`
- Trigger: `push` to `main`
- Steps:
  1. Checkout code
  2. `docker/login-action` — authenticates to `registry.amcham.indigo.si` using GitHub secrets
  3. `docker/build-push-action` — builds multi-stage image, tags as `latest`, pushes
- Required GitHub secrets: `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`

---

## Deployment Lifecycle

1. Developer pushes to `main`
2. GitHub Actions builds the Docker image using the existing multi-stage `Dockerfile`
3. Image tagged `registry.amcham.indigo.si/luka-young:latest` and pushed
4. Within 5 minutes, Watchtower detects new image digest, pulls it, stops the old container, starts a new one
5. Traefik continues routing; brief downtime ~2–3 seconds during container swap

---

## Security

- Registry only accessible via HTTPS — Traefik enforces TLS, no plain HTTP reachable
- `htpasswd` uses bcrypt; plaintext password must NOT appear in shell commands directly — use:
  ```bash
  read -s PASS && docker run --rm httpd:2.4-alpine htpasswd -Bbn myuser "$PASS" > auth/htpasswd
  ```
- `acme.json` has `chmod 600` before first start to protect private keys
- Docker socket mounted read-only for Traefik
- Watchtower credentials in Docker credential store (`~/.docker/config.json`), not in compose file
- GitHub Actions secrets never logged in workflow output

---

## Rollback

There is no automatic rollback. To revert a bad deployment:

1. SSH into the server
2. Identify a previous image: `docker images registry.amcham.indigo.si/luka-young`
3. Update `docker-compose.yml` image tag to the specific digest or previous tag
4. `docker compose up -d luka-young`

To reduce rollback time, GitHub Actions will also tag images with the git SHA (`registry.amcham.indigo.si/luka-young:<sha>`) in addition to `latest`. This preserves previous versions in the registry.

---

## Server-Side One-Time Setup

```
# 1. Create directory structure
mkdir -p /opt/luka-young/traefik /opt/luka-young/auth
cd /opt/luka-young

# 2. Create and secure acme.json
touch traefik/acme.json && chmod 600 traefik/acme.json

# 3. Generate htpasswd (reads password from prompt, not shell history)
read -s PASS && docker run --rm httpd:2.4-alpine htpasswd -Bbn myuser "$PASS" > auth/htpasswd

# 4. Log Docker into the registry (so Watchtower can pull)
docker login registry.amcham.indigo.si

# 5. Start the stack
docker compose up -d

# 6. Add REGISTRY_USERNAME and REGISTRY_PASSWORD to GitHub repo secrets
```

---

## Verification Steps

After setup, verify each service is healthy:

```bash
# Traefik is routing
curl -I http://amcham.indigo.si          # expect 301 redirect to HTTPS

# App is serving
curl -I https://amcham.indigo.si         # expect 200

# Registry is accessible
curl https://registry.amcham.indigo.si/v2/   # expect 401 (auth required = working)

# Watchtower is polling
docker logs watchtower --tail 20
```

---

## Operational Notes

- **Registry garbage collection:** Run monthly to reclaim disk from deleted/old images:
  ```bash
  docker exec registry registry garbage-collect /etc/docker/registry/config.yml --delete-untagged
  ```
- **Cert renewal:** Let's Encrypt renews automatically via Traefik before expiry. Verify periodically with `docker logs traefik | grep -i acme`
- **Log access:** `docker logs <service-name>` for all services
- **Disk monitoring:** Monitor `/var/lib/docker` disk usage; registry image layers accumulate over time

---

## Files to Create

| File | Description |
|------|-------------|
| `docker-compose.yml` | All four services: traefik, registry, luka-young, watchtower |
| `traefik/traefik.yml` | Traefik static config: entrypoints, ACME resolver, Docker provider |
| `.github/workflows/deploy.yml` | CI/CD: build + push (`:latest` + `:<sha>`) on push to main |

No changes required to existing `Dockerfile` or `next.config.mjs`.
