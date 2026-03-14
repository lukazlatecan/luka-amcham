"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const hobbyIcons: Record<string, React.ReactNode> = {
  badminton: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <path d="M8 21l4-5 4 5" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  ),
  cube: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  math: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="10" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="18" x2="16" y2="18" />
      <path d="M6 14l4 4M10 14l-4 4" />
      <circle cx="18" cy="16" r="0.5" fill="currentColor" />
    </svg>
  ),
  piano: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="8" y1="4" x2="8" y2="14" />
      <line x1="12" y1="4" x2="12" y2="14" />
      <line x1="16" y1="4" x2="16" y2="14" />
      <line x1="6" y1="14" x2="18" y2="14" />
    </svg>
  ),
}

function PhotoPlaceholder({ label, delay, inView }: { label: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
      style={{
        background: "linear-gradient(135deg, rgba(79,207,192,0.06) 0%, rgba(240,76,92,0.04) 100%)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {/* Placeholder icon */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-text-muted/30">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="px-4 text-center font-mono text-[10px] uppercase tracking-widest text-text-muted/40">
          {label}
        </span>
      </div>
    </motion.div>
  )
}

export function BeyondWork() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section ref={ref} className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            {locale === "en" ? "Personal" : "Osebno"}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {t.beyondWork.title[locale]}
          </h2>
        </motion.div>

        {/* Father intro + photo grid */}
        <div className="mb-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <p className="text-xl leading-relaxed text-text-dim md:text-2xl">
              {t.beyondWork.intro[locale]}
            </p>
          </motion.div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-4">
            <PhotoPlaceholder label={locale === "en" ? "Family" : "Družina"} delay={0.2} inView={inView} />
            <PhotoPlaceholder label={locale === "en" ? "With my child" : "Z otrokom"} delay={0.3} inView={inView} />
          </div>
        </div>

        {/* Hobbies */}
        <div className="mb-20 grid grid-cols-2 gap-5 md:grid-cols-4">
          {t.beyondWork.hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.icon}
              className="rounded-2xl border border-border p-6"
              style={{
                background: "linear-gradient(135deg, rgba(79,207,192,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.1 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-teal/20 bg-teal/8 text-teal">
                {hobbyIcons[hobby.icon]}
              </div>
              <h3 className="mb-1 text-sm font-semibold text-text">
                {hobby.title[locale]}
              </h3>
              <p className="text-xs leading-relaxed text-text-muted">
                {hobby.desc[locale]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Photo row */}
        <div className="mb-20 grid grid-cols-3 gap-4">
          <PhotoPlaceholder label={locale === "en" ? "Badminton" : "Badminton"} delay={0.4} inView={inView} />
          <PhotoPlaceholder label={locale === "en" ? "Piano" : "Klavir"} delay={0.5} inView={inView} />
          <PhotoPlaceholder label={locale === "en" ? "Adventures" : "Pustolovščine"} delay={0.6} inView={inView} />
        </div>

        {/* Slovenia 3000 */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-border"
          style={{
            background: "linear-gradient(135deg, rgba(79,207,192,0.06) 0%, rgba(240,76,92,0.04) 100%)",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-[1fr_1.2fr] md:p-10">
            {/* Text */}
            <div>
              <span className="mb-3 inline-block rounded-full border border-indigo/25 bg-indigo/8 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo">
                {locale === "en" ? "Side project" : "Stranski projekt"}
              </span>
              <h3 className="mb-4 text-2xl font-bold tracking-tight text-text md:text-3xl">
                {t.beyondWork.slovenia3000.title[locale]}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-text-dim">
                {t.beyondWork.slovenia3000.desc[locale]}
              </p>
              <a
                href={t.beyondWork.slovenia3000.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-teal/30 bg-teal/8 px-5 py-2.5 text-sm font-medium text-teal transition-all hover:bg-teal/15 hover:scale-[1.02]"
              >
                {locale === "en" ? "Visit slovenia3000.si" : "Obišči slovenia3000.si"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            {/* Screenshot placeholder */}
            <div
              className="flex aspect-video items-center justify-center rounded-xl border border-border"
              style={{
                background: "linear-gradient(135deg, rgba(79,207,192,0.04) 0%, rgba(240,76,92,0.03) 100%)",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-text-muted/30">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/40">
                  slovenia3000.si
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
