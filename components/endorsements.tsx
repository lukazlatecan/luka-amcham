"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

function EndorsementCard({
  item,
  index,
  locale,
  inView,
}: {
  item: (typeof t.endorsements.items)[number]
  index: number
  locale: "en" | "sl"
  inView: boolean
}) {
  const initial = item.author[locale].charAt(0)

  return (
    <motion.div
      className="rounded-2xl border border-border p-8 md:p-10"
      style={{
        background:
          "linear-gradient(135deg, rgba(240,76,92,0.04) 0%, rgba(79,207,192,0.04) 100%)",
        borderLeft: "3px solid rgba(240,76,92,0.4)",
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, delay: 0.15 + index * 0.15, ease: "easeOut" }}
    >
      {/* decorative quote mark */}
      <div className="mb-5">
        <svg
          width="48"
          height="40"
          viewBox="0 0 48 40"
          fill="none"
          className="text-indigo opacity-40"
        >
          <path
            d="M0 40V24C0 17.2 1.6 11.5 4.8 6.8C8.1 2.1 12.8 0 18 0l2.4 4.3C15.8 5.5 12.4 7.9 10.2 11.4C8 14.9 6.9 18.9 6.9 23.4H14.4V40H0ZM27.6 40V24C27.6 17.2 29.2 11.5 32.4 6.8C35.7 2.1 40.4 0 45.6 0L48 4.3C43.4 5.5 40 7.9 37.8 11.4C35.6 14.9 34.5 18.9 34.5 23.4H42V40H27.6Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* quote */}
      <blockquote className="text-base italic leading-relaxed text-text-dim md:text-lg">
        {item.quote[locale]}
      </blockquote>

      {/* divider */}
      <div className="my-6 h-px bg-border" />

      {/* author */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border"
          style={{
            background:
              "linear-gradient(135deg, rgba(240,76,92,0.3), rgba(79,207,192,0.2))",
          }}
        >
          <span className="font-mono text-sm font-bold text-indigo">
            {initial}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text">
            {item.author[locale]}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
            {item.role[locale]}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function Endorsements() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-indigo/30 bg-indigo/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo">
            {locale === "en" ? "Endorsements" : "Priporočila"}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {t.endorsements.title[locale]}
          </h2>
        </motion.div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-6">
          {t.endorsements.items.map((item, i) => (
            <EndorsementCard
              key={i}
              item={item}
              index={i}
              locale={locale}
              inView={inView}
            />
          ))}
        </div>

        {/* bottom note */}
        <motion.p
          className="mt-10 text-center text-xs italic text-text-muted"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {locale === "en"
            ? "Endorsements shared with permission."
            : "Priporočila objavljena z dovoljenjem."}
        </motion.p>
      </div>
    </section>
  )
}
