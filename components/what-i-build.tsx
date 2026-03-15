"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

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
      <div className="flex-1 p-8 pb-6">
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
        <p className="mt-4 text-sm leading-relaxed text-text-muted">{p1}</p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{p2}</p>

        {/* Visit button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02]"
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
            visitLabel={
              locale === "en" ? "Visit website" : "Obišči spletno stran"
            }
          />
        </div>
      </div>
    </section>
  )
}
