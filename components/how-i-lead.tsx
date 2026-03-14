"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

/* ── SVG Icons ─────────────────────────────────────────────────────────── */

function IconSystems() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#f04c5c" strokeWidth="1.5" />
      <circle cx="4" cy="4" r="2" stroke="#4fcfc0" strokeWidth="1.5" />
      <circle cx="20" cy="4" r="2" stroke="#4fcfc0" strokeWidth="1.5" />
      <circle cx="4" cy="20" r="2" stroke="#4fcfc0" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2" stroke="#4fcfc0" strokeWidth="1.5" />
      <line x1="5.5" y1="5.5" x2="10" y2="10" stroke="#f04c5c" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.5" y1="5.5" x2="14" y2="10" stroke="#f04c5c" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.5" y1="18.5" x2="10" y2="14" stroke="#f04c5c" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.5" y1="18.5" x2="14" y2="14" stroke="#f04c5c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconOwnership() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="3" stroke="#4fcfc0" strokeWidth="1.5" />
      <path
        d="M5 18c0-3 2.5-5.5 7-5.5s7 2.5 7 5.5"
        stroke="#f04c5c"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 17v3" stroke="#4fcfc0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 19h4" stroke="#4fcfc0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconLongTerm() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polyline
        points="3,18 7,13 11,15 16,9 21,5"
        stroke="#f04c5c"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="17,5 21,5 21,9"
        stroke="#4fcfc0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClarity() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 014 10.5V16H8v-2.5A6 6 0 0112 3z"
        stroke="#f04c5c"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 3v1" stroke="#4fcfc0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const icons = [
  <IconSystems key="s" />,
  <IconOwnership key="o" />,
  <IconLongTerm key="l" />,
  <IconClarity key="c" />,
]

/* ── Card ──────────────────────────────────────────────────────────────── */

function LeadCard({
  card,
  index,
  locale,
  inView,
}: {
  card: (typeof t.lead.cards)[number]
  index: number
  locale: "en" | "sl"
  inView: boolean
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-all hover:border-border-hover"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: "easeOut" }}
      style={{ borderLeft: "3px solid rgba(79,207,192,0.4)" }}
    >
      {/* number badge */}
      <div className="absolute right-5 top-5 font-mono text-xs text-text-muted">
        0{index + 1}
      </div>

      {/* icon */}
      <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-indigo-dim bg-indigo-dim p-2.5">
        {icons[index]}
      </div>

      {/* title */}
      <h3 className="text-base font-semibold text-text">
        {card.title[locale]}
      </h3>

      {/* desc */}
      <p className="mt-2 text-sm text-text-dim">
        {card.desc[locale]}
      </p>
    </motion.div>
  )
}

/* ── Section ───────────────────────────────────────────────────────────── */

export function HowILead() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="leadership" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* heading */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            Leadership
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {t.lead.title[locale]}
          </h2>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {t.lead.cards.map((card, i) => (
            <LeadCard
              key={i}
              card={card}
              index={i}
              locale={locale}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
