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
}

function BuildCard({ tag, company, headline, p1, p2, variant, index, inView }: BuildCardProps) {
  const isIndigo = variant === "indigo"
  const accentColor = isIndigo ? "#f04c5c" : "#4fcfc0"
  const accentRgba = isIndigo ? "rgba(240,76,92," : "rgba(79,207,192,"

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="flex-1 border border-border rounded-2xl p-8 hover:border-border-hover transition-all"
      style={{
        borderTop: `3px solid ${accentColor}`,
        background: `linear-gradient(180deg, ${accentRgba}0.04) 0%, rgba(255,255,255,0.03) 100%)`,
      }}
    >
      {/* Header row with logo */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={isIndigo ? "/indigo-logo-white.png" : "/spaceguardian-logo.png"}
            alt={company}
            className="h-7 object-contain"
          />
        </div>
        <span
          className="shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest"
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
      <p className="mt-4 text-base font-semibold text-text-dim">
        {headline}
      </p>

      {/* Body */}
      <p className="mt-4 text-sm leading-relaxed text-text-muted">
        {p1}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        {p2}
      </p>
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
    <section
      ref={ref}
      id="companies"
      className="w-full py-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            {locale === "en" ? "What I Build" : "Kaj gradim"}
          </span>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          <BuildCard
            variant="indigo"
            company="Indigo Labs"
            tag={t.build.indigo.tag[locale]}
            headline={t.build.indigo.title[locale]}
            p1={t.build.indigo.p1[locale]}
            p2={t.build.indigo.p2[locale]}
            index={0}
            inView={inView}
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
          />
        </div>
      </div>
    </section>
  )
}
