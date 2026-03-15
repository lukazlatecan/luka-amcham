"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

function StatementModal({
  open,
  onClose,
  locale,
}: {
  open: boolean
  onClose: () => void
  locale: "en" | "sl"
}) {
  const text = t.amchamSection.statement[locale]
  const charCount = text.replace(/\s/g, "").length

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl border border-border p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(79,207,192,0.06) 0%, #0a0a0f 100%)",
                borderTop: "3px solid rgba(79,207,192,0.4)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-teal/40 hover:text-teal"
              >
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
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Title */}
              <div className="mb-2 text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                AmCham Top Potential 2026
              </div>
              <h3 className="mb-6 text-xl font-bold text-text">
                {t.amchamSection.statementTitle[locale]}
              </h3>

              {/* Statement text */}
              <p className="mb-8 text-[15px] leading-relaxed text-text-dim">
                {text}
              </p>

              {/* Char count */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-text-muted">
                  {locale === "en"
                    ? "Characters (without spaces)"
                    : "Znaki (brez presledkov)"}
                </span>
                <span
                  className={`font-mono text-sm font-semibold ${charCount <= 1000 ? "text-teal" : "text-coral"}`}
                >
                  {charCount} / 1000
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function AmChamSection() {
  const { locale } = useLocale()
  const [modalOpen, setModalOpen] = useState(false)
  const [introRef, introInView] = useInView({
    threshold: 0.08,
    triggerOnce: true,
  })
  const [contributionsRef, contributionsInView] = useInView({
    threshold: 0.08,
    triggerOnce: true,
  })

  return (
    <section id="amcham" className="relative py-16">
      <StatementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        locale={locale}
      />

      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <motion.div
          ref={introRef}
          className="mb-14 text-center"
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <div className="mb-4 inline-block rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-teal uppercase">
            AmCham Top Potential 2026
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
            {t.amchamSection.title[locale]}
          </h2>
        </motion.div>

        {/* ── Part 1: How it started ── */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs font-semibold tracking-[0.2em] text-teal uppercase"
          >
            {t.amchamSection.introLabel[locale]}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-2xl text-[17px] leading-relaxed text-text-dim"
          >
            {t.amchamSection.intro[locale]}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="aspect-video overflow-hidden rounded-2xl border border-border"
          >
            <iframe
              src="https://www.youtube.com/embed/nrig1CtGCck"
              title="AmCham presentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>

        {/* ── Part 2: Contributions ── */}
        <motion.div
          ref={contributionsRef}
          initial="hidden"
          animate={contributionsInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center justify-between gap-4"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
              {t.amchamSection.contributionsLabel[locale]}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-teal/25 bg-teal/8 px-4 py-2 text-xs font-medium text-teal transition-all hover:scale-[1.02] hover:bg-teal/15"
            >
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
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              {t.amchamSection.statementLabel[locale]}
            </button>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Snowball Think Tank */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-border p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(79,207,192,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderTop: "3px solid rgba(79,207,192,0.4)",
              }}
            >
              <span className="mb-3 inline-block self-start rounded-full border border-teal/25 bg-teal/8 px-3 py-1 text-[10px] font-bold tracking-widest text-teal uppercase">
                {t.amchamSection.snowballBadge[locale]}
              </span>
              <h3 className="mb-3 text-sm font-bold text-text">
                {locale === "en"
                  ? "Advocacy: Slovenia3000"
                  : "Zagovorništvo: Slovenija 3000"}
              </h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-text-dim">
                {t.amchamSection.snowballDesc[locale]}
              </p>
              <a
                href={t.beyondWork.slovenia3000.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal/60 transition-colors hover:text-teal"
              >
                slovenia3000.si
                <svg
                  width="11"
                  height="11"
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

            {/* Ready 4D Future */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-border p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderTop: "3px solid rgba(99,102,241,0.4)",
              }}
            >
              <span className="mb-3 inline-block self-start rounded-full border border-indigo/25 bg-indigo/8 px-3 py-1 text-[10px] font-bold tracking-widest text-indigo uppercase">
                {t.amchamSection.ready4dBadge[locale]}
              </span>
              <h3 className="mb-3 text-sm font-bold text-text">
                Ready 4D Future
              </h3>
              <p className="flex-1 text-xs leading-relaxed text-text-dim">
                {t.amchamSection.ready4dDesc[locale]}
              </p>
            </motion.div>

            {/* Delegations */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-border p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(240,76,92,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderTop: "3px solid rgba(240,76,92,0.4)",
              }}
            >
              <span className="mb-3 inline-block self-start rounded-full border border-coral/25 bg-coral/8 px-3 py-1 text-[10px] font-bold tracking-widest text-coral uppercase">
                {t.amchamSection.delegationBadge[locale]}
              </span>
              <h3 className="mb-3 text-sm font-bold text-text">
                {locale === "en"
                  ? "Startup delegation readiness"
                  : "Pripravljenost startupov"}
              </h3>
              <p className="flex-1 text-xs leading-relaxed text-text-dim">
                {t.amchamSection.delegationDesc[locale]}
              </p>
            </motion.div>

            {/* Mentor Program */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-border p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(79,207,192,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderTop: "3px solid rgba(79,207,192,0.4)",
              }}
            >
              <span className="mb-3 inline-block self-start rounded-full border border-teal/25 bg-teal/8 px-3 py-1 text-[10px] font-bold tracking-widest text-teal uppercase">
                {t.amchamSection.mentorBadge[locale]}
              </span>
              <h3 className="mb-3 text-sm font-bold text-text">
                {locale === "en" ? "Mentor Program" : "Program mentorstva"}
              </h3>
              <p className="flex-1 text-xs leading-relaxed text-text-dim">
                {t.amchamSection.mentorDesc[locale]}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
