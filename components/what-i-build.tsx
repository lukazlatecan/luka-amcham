"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

function YCBadge() {
  return (
    <img
      src="/ycombinator-ar21.svg"
      alt="Y Combinator"
      className="shrink-0 h-10 object-contain"
      style={{ width: "auto" }}
    />
  )
}

interface ProjectCardProps {
  logo: string
  company: string
  tag: string
  desc: string
  url: string
  visitLabel: string
  isYC?: boolean
  invertLogo?: boolean
  index: number
  inView: boolean
}

function ProjectCard({
  logo,
  company,
  tag,
  desc,
  url,
  visitLabel,
  isYC,
  invertLogo,
  index,
  inView,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + index * 0.12,
      }}
      className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border p-6 transition-all hover:border-border-hover"
      style={{
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <img src={logo} alt={company} className="h-7 object-contain" style={invertLogo ? { filter: "brightness(0) invert(1)" } : undefined} />
        {isYC && <YCBadge />}
      </div>

      {/* Tag */}
      <span className="mt-4 inline-block w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold tracking-widest text-text-muted uppercase">
        {tag}
      </span>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{desc}</p>

      {/* Visit button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-text-dim transition-all hover:scale-[1.02] hover:border-white/20"
      >
        {visitLabel}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </a>
    </motion.div>
  )
}

interface BuildCardProps {
  tag: string
  company: string
  headline: string
  p1: string
  p2: string
  variant: "indigo" | "space"
  index: number
  inView: boolean
  teamPhoto: string
  url: string
  visitLabel: string
  locale: "en" | "sl"
}

function BuildCard({
  tag,
  company,
  headline,
  p1,
  p2,
  variant,
  index,
  inView,
  teamPhoto,
  url,
  visitLabel,
  locale,
}: BuildCardProps) {
  const isIndigo = variant === "indigo"
  const accentColor = isIndigo ? "#f04c5c" : "#4fcfc0"
  const accentRgba = isIndigo ? "rgba(240,76,92," : "rgba(79,207,192,"

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border transition-all hover:border-border-hover"
      style={{
        borderTop: `3px solid ${accentColor}`,
        background: `linear-gradient(180deg, ${accentRgba}0.04) 0%, rgba(255,255,255,0.03) 100%)`,
      }}
    >
      <div className="flex flex-1 flex-col p-8 pb-6">
        {/* Header row with logo */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={
                isIndigo ? "/indigo-logo-white.png" : "/spaceguardian-logo.png"
              }
              alt={company}
              className="h-7 object-contain"
            />
          </div>
          <span
            className="shrink-0 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase"
            style={{
              borderColor: `${accentRgba}0.3)`,
              background: `${accentRgba}0.1)`,
              color: accentColor,
            }}
          >
            {tag}
          </span>
        </div>

        {/* Headline */}
        <p className="mt-4 text-base font-semibold text-text-dim">{headline}</p>

        {/* Body */}
        <div className="flex-1">
          <p className="mt-4 text-sm leading-relaxed text-text-muted">{p1}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{p2}</p>
        </div>

        {/* EUSPA Mentorship */}
        {!isIndigo && (
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <img
              src="/euspa.png"
              alt="EUSPA"
              className="h-14 shrink-0 object-contain"
              style={{ width: "auto" }}
            />
            <p className="text-xs leading-relaxed text-text-muted">
              {locale === "en"
                ? "SpaceGuardian is part of the EUSPA mentorship program, receiving guidance from the EU Agency for the Space Programme as we develop our autonomous collision-avoidance infrastructure."
                : "SpaceGuardian je del mentorskega programa agencije EUSPA, ki nas podpira pri razvoju avtonomne infrastrukture za izogibanje trkom v vesolju."}
            </p>
          </div>
        )}

        {/* Microsoft Partner */}
        {isIndigo && (
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <img
              src="/microsoft-partner.png"
              alt="Microsoft Partner"
              className="h-14 shrink-0 object-contain"
              style={{ width: "auto" }}
            />
            <p className="text-xs leading-relaxed text-text-muted">
              {locale === "en"
                ? "Indigo Labs is a certified Microsoft Partner, bringing enterprise-grade cloud infrastructure, AI tooling, and Microsoft ecosystem expertise to every product we build."
                : "Indigo Labs je certificiran Microsoft Partner. V vsak produkt prinašamo industrijsko oblačno infrastrukturo, AI orodja in globoko poznavanje Microsoftovega ekosistema."}
            </p>
          </div>
        )}

        {/* Visit button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex self-start items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02]"
          style={{
            borderColor: `${accentRgba}0.3)`,
            background: `${accentRgba}0.08)`,
            color: accentColor,
          }}
        >
          {visitLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      {/* Team photo */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={teamPhoto}
          alt={`${company} team`}
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  )
}

export function WhatIBuild() {
  const { locale } = useLocale()

  const { ref, inView } = useInView({
    threshold: 0.12,
    triggerOnce: true,
  })

  return (
    <section ref={ref} id="companies" className="w-full py-14">
      <div className="mx-auto max-w-6xl px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold tracking-widest text-teal uppercase">
            {locale === "en" ? "What I Build" : "Kaj gradim"}
          </span>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6 lg:flex-row">
          <BuildCard
            variant="indigo"
            company="Indigo Labs"
            tag={t.build.indigo.tag[locale]}
            headline={t.build.indigo.title[locale]}
            p1={t.build.indigo.p1[locale]}
            p2={t.build.indigo.p2[locale]}
            index={0}
            inView={inView}
            teamPhoto="/indigolabsteam.jpeg"
            url="https://indigo.si"
            locale={locale}
            visitLabel={
              locale === "en" ? "Visit website" : "Obišči spletno stran"
            }
          />
          <BuildCard
            variant="space"
            company="SpaceGuardian"
            tag={t.build.space.tag[locale]}
            headline={t.build.space.title[locale]}
            p1={t.build.space.p1[locale]}
            p2={t.build.space.p2[locale]}
            index={1}
            inView={inView}
            teamPhoto="/spaceguardianteam.jpeg"
            url="https://spaceguardian.eu"
            locale={locale}
            visitLabel={
              locale === "en" ? "Visit website" : "Obišči spletno stran"
            }
          />
        </div>

        {/* Projects subsection */}
        <div className="mt-12">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold tracking-widest text-text-muted uppercase"
          >
            {t.projects.eyebrow[locale]}
          </motion.span>

          <div className="flex flex-col gap-5 sm:flex-row">
            <ProjectCard
              logo="/benson.svg"
              company="Benson"
              tag={t.projects.benson.tag[locale]}
              desc={t.projects.benson.desc[locale]}
              url="https://www.meetbenson.com/"
              visitLabel={locale === "en" ? "Visit website" : "Obišči spletno stran"}
              isYC
              index={0}
              inView={inView}
            />
            <ProjectCard
              logo="/realroots.svg"
              company="RealRoots"
              tag={t.projects.realroots.tag[locale]}
              desc={t.projects.realroots.desc[locale]}
              url="https://www.therealroots.com/"
              visitLabel={locale === "en" ? "Visit website" : "Obišči spletno stran"}
              isYC
              invertLogo
              index={1}
              inView={inView}
            />
            <ProjectCard
              logo="/irriot.png"
              company="Irriot"
              invertLogo
              tag={t.projects.irriot.tag[locale]}
              desc={t.projects.irriot.desc[locale]}
              url="https://www.irriot.com/"
              visitLabel={locale === "en" ? "Visit website" : "Obišči spletno stran"}
              index={2}
              inView={inView}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
