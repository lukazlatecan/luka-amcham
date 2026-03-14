# Deployment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the luka-young Next.js app to `amcham.indigo.si` via Docker Compose on an Ubuntu server, with a private Docker registry, Traefik reverse proxy + TLS, GitHub Actions CI/CD, and Watchtower auto-deployment.

**Architecture:** All four services (Traefik, registry, luka-young app, Watchtower) run in a single `docker-compose.yml` on the server. GitHub Actions builds the image on every push to `main` and pushes it to the private registry on the same server. Watchtower polls the registry every 5 minutes and redeploys the app when a new image digest is detected.

**Tech Stack:** Docker Compose, Traefik v3, registry:2, containrrr/watchtower, GitHub Actions (docker/login-action, docker/build-push-action), Let's Encrypt HTTP-01 ACME

**Spec:** `docs/superpowers/specs/2026-03-14-deployment-design.md`

---

## Chunk 1: Traefik Static Config

### Task 1: Create Traefik static config file

**Files:**
- Create: `traefik/traefik.yml`

This file configures Traefik's entrypoints, ACME Let's Encrypt resolver, HTTP→HTTPS redirect, and Docker provider. It must exist before `docker compose up` is run on the server.

- [ ] **Step 1: Create the traefik directory**

```bash
mkdir -p traefik
```

- [ ] **Step 2: Create `traefik/traefik.yml`**

```yaml
# traefik/traefik.yml
# Static configuration for Traefik v3
# Replace <YOUR_EMAIL> with a real email address for Let's Encrypt notifications

api:
  dashboard: false

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      email: <YOUR_EMAIL>
      storage: /acme.json
      httpChallenge:
        entryPoint: web

providers:
  docker:
    exposedByDefault: false
    network: proxy

log:
  level: INFO
```

> **Note:** HTTP→HTTPS redirect is configured as a middleware via Traefik labels in `docker-compose.yml` (on the Traefik service itself), not in the static config. This is the correct approach for Traefik v3.

- [ ] **Step 3: Validate YAML syntax**

```bash
docker run --rm -v $(pwd)/traefik/traefik.yml:/traefik.yml traefik:v3 --configFile=/traefik.yml --help > /dev/null 2>&1 && echo "OK" || python3 -c "import yaml,sys; yaml.safe_load(open('traefik/traefik.yml'))" && echo "YAML valid"
```

Expected: no YAML parse errors.

- [ ] **Step 4: Commit**

```bash
git add traefik/traefik.yml
git commit -m "chore: add traefik static config with Let's Encrypt and HTTP->HTTPS redirect"
```

---

## Chunk 2: Docker Compose Stack

### Task 2: Create docker-compose.yml

**Files:**
- Create: `docker-compose.yml`

Defines all four services on a shared `proxy` network. No host ports are bound for app or registry — only Traefik binds 80/443.

- [ ] **Step 1: Create `docker-compose.yml`**

```yaml
# docker-compose.yml
# Deployment stack for luka-young
# Requires:
#   - docker network create proxy  (run once on server)
#   - traefik/acme.json            (touch + chmod 600)
#   - auth/htpasswd                (generated via httpd:alpine)
#   - ~/.docker/config.json        (docker login registry.amcham.indigo.si)

services:

  traefik:
    image: traefik:v3
    restart: unless-stopped
    command: --configFile=/traefik.yml
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik/traefik.yml:/traefik.yml:ro
      - ./traefik/acme.json:/acme.json
    networks:
      - proxy
    labels:
      # Global HTTP→HTTPS redirect middleware (Traefik v3 approach)
      - "traefik.enable=true"
      - "traefik.http.routers.http-catchall.rule=HostRegexp(`.+`)"
      - "traefik.http.routers.http-catchall.entrypoints=web"
      - "traefik.http.routers.http-catchall.middlewares=redirect-to-https"
      - "traefik.http.routers.http-catchall.service=noop@internal"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.permanent=true"

  registry:
    image: registry:2
    restart: unless-stopped
    environment:
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
      REGISTRY_STORAGE_DELETE_ENABLED: "true"
    volumes:
      - registry_data:/var/lib/registry
      - ./auth:/auth:ro
    networks:
      - proxy
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.registry.rule=Host(`registry.amcham.indigo.si`)"
      - "traefik.http.routers.registry.entrypoints=websecure"
      - "traefik.http.routers.registry.tls.certresolver=letsencrypt"
      - "traefik.http.services.registry.loadbalancer.server.port=5000"

  luka-young:
    image: registry.amcham.indigo.si/luka-young:latest
    restart: unless-stopped
    networks:
      - proxy
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.luka-young.rule=Host(`amcham.indigo.si`)"
      - "traefik.http.routers.luka-young.entrypoints=websecure"
      - "traefik.http.routers.luka-young.tls.certresolver=letsencrypt"
      - "traefik.http.services.luka-young.loadbalancer.server.port=3000"
      - "com.centurylinklabs.watchtower.enable=true"

  watchtower:
    image: containrrr/watchtower
    restart: unless-stopped
    command: --label-enable --interval 300
    environment:
      DOCKER_CONFIG: /config
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /root/.docker:/config:ro
    networks:
      - proxy

networks:
  proxy:
    external: true

volumes:
  registry_data:
```

- [ ] **Step 2: Validate compose syntax**

```bash
docker compose config
```

Expected: full resolved YAML printed with no errors.

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml
git commit -m "chore: add docker-compose stack (traefik, registry, app, watchtower)"
```

---

## Chunk 3: GitHub Actions CI/CD Workflow

### Task 3: Create GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

Builds the Docker image on every push to `main`, tags it as both `:latest` and `:<git-sha>` (for rollback), and pushes both tags to the private registry.

Required GitHub repository secrets (set these before first push):
- `REGISTRY_USERNAME` — registry htpasswd username
- `REGISTRY_PASSWORD` — registry htpasswd password

- [ ] **Step 1: Create `.github/workflows/` directory**

```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Create `.github/workflows/deploy.yml`**

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Log in to registry
        uses: docker/login-action@v3
        with:
          registry: registry.amcham.indigo.si
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            registry.amcham.indigo.si/luka-young:latest
            registry.amcham.indigo.si/luka-young:${{ github.sha }}
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow to build and push Docker image"
```

---

## Chunk 4: Server Setup & First Deploy

### Task 4: One-time server setup

**Performed manually on the server over SSH (`ssh amcham`).**

These steps are run once. After this, all future deploys are automated.

- [ ] **Step 1: Install Docker on the server**

```bash
curl -fsSL https://get.docker.com | sh
```

Expected: Docker installed and daemon running. Verify: `docker --version`

- [ ] **Step 2: Open firewall ports**

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

- [ ] **Step 3: Create the proxy network**

```bash
docker network create proxy
```

Expected: network ID printed. Verify: `docker network ls | grep proxy`

- [ ] **Step 4: Clone the repo and set up directory**

```bash
git clone <repo-url> /opt/luka-young
cd /opt/luka-young
mkdir -p traefik auth
```

- [ ] **Step 5: Create and secure acme.json**

```bash
touch traefik/acme.json
chmod 600 traefik/acme.json
```

Expected: file exists with permissions `-rw-------`.

- [ ] **Step 6: Generate htpasswd credentials**

Choose a username and a strong random password. The `read -s` keeps the password out of shell history:

```bash
read -p "Username: " USER && read -s -p "Password: " PASS && echo ""
docker run --rm httpd:2.4-alpine htpasswd -Bbn "$USER" "$PASS" > auth/htpasswd
unset PASS
```

Store the username and password in a password manager. These are also the values for `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` GitHub secrets.

- [ ] **Step 7: Edit traefik/traefik.yml — replace `<YOUR_EMAIL>`**

```bash
nano traefik/traefik.yml
# Replace <YOUR_EMAIL> with your real email address
```

- [ ] **Step 8: Add registry credentials to GitHub repository secrets**

In GitHub → repo → Settings → Secrets and variables → Actions, add:
- `REGISTRY_USERNAME` — same username used in Step 6
- `REGISTRY_PASSWORD` — same password used in Step 6

- [ ] **Step 9: Push to `main` to trigger first image build**

From your local machine:

```bash
git push origin main
```

Wait for the GitHub Actions workflow to complete (green check in the Actions tab). This builds and pushes `registry.amcham.indigo.si/luka-young:latest` to the registry.

- [ ] **Step 10: Log Docker into the registry on the server (so Watchtower can pull)**

```bash
docker login registry.amcham.indigo.si
# Enter the same username/password from Step 6
```

This writes credentials to `~/.docker/config.json`, which is mounted into the Watchtower container.

- [ ] **Step 11: Start the stack**

```bash
cd /opt/luka-young
docker compose up -d
```

Expected: all four containers start. Verify:

```bash
docker compose ps
```

All services should show `running`.

---

## Chunk 5: Verification

### Task 5: Verify the deployment

Run these checks from any machine after the stack is up.

- [ ] **Step 1: Verify HTTP→HTTPS redirect**

```bash
curl -I http://amcham.indigo.si
```

Expected: `HTTP/1.1 301 Moved Permanently` with `Location: https://amcham.indigo.si`

- [ ] **Step 2: Verify app is serving over HTTPS**

```bash
curl -I https://amcham.indigo.si
```

Expected: `HTTP/2 200`

- [ ] **Step 3: Verify registry is accessible (requires auth)**

```bash
curl https://registry.amcham.indigo.si/v2/
```

Expected: `HTTP 401 Unauthorized` with `WWW-Authenticate: Basic` header — this means the registry is up and auth is working.

- [ ] **Step 4: Verify TLS cert is valid**

```bash
curl -v https://amcham.indigo.si 2>&1 | grep -E "SSL|subject|issuer"
```

Expected: certificate issued by `R10` or `E5` (Let's Encrypt).

- [ ] **Step 5: Verify Watchtower is polling**

```bash
docker logs watchtower --tail 20
```

Expected: log lines like `Checking all containers` or `No new images found`.

- [ ] **Step 6: Verify end-to-end auto-deploy (optional but recommended)**

Make a trivial visible change to `app/page.tsx`, commit, and push to `main`. After the GitHub Actions workflow completes and within 5 minutes, the change should appear live at `https://amcham.indigo.si` without any manual intervention.

---

## Rollback Procedure

To revert to a previous image:

```bash
ssh amcham
cd /opt/luka-young

# List available tagged images
docker images registry.amcham.indigo.si/luka-young

# Update docker-compose.yml to pin a specific SHA tag
# Change: image: registry.amcham.indigo.si/luka-young:latest
# To:     image: registry.amcham.indigo.si/luka-young:<previous-sha>
nano docker-compose.yml

docker compose up -d luka-young
```

---

## Registry Maintenance

Run monthly to reclaim disk from old image layers:

```bash
ssh amcham
docker exec registry registry garbage-collect /etc/docker/registry/config.yml --delete-untagged
```
