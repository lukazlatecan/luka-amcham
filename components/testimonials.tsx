"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

function QuoteMarkSvg() {
  return (
    <svg
      width="48"
      height="40"
      viewBox="0 0 48 40"
      fill="none"
      className="text-teal opacity-30"
    >
      <path
        d="M0 40V24C0 17.2 1.6 11.5 4.8 6.8C8.1 2.1 12.8 0 18 0l2.4 4.3C15.8 5.5 12.4 7.9 10.2 11.4C8 14.9 6.9 18.9 6.9 23.4H14.4V40H0ZM27.6 40V24C27.6 17.2 29.2 11.5 32.4 6.8C35.7 2.1 40.4 0 45.6 0L48 4.3C43.4 5.5 40 7.9 37.8 11.4C35.6 14.9 34.5 18.9 34.5 23.4H42V40H27.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TestimonialCard({
  item,
  index,
  locale,
  inView,
}: {
  item: (typeof t.testimonials.items)[number]
  index: number
  locale: "en" | "sl"
  inView: boolean
}) {
  return (
    <motion.div
      className="rounded-2xl border border-border p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(79,207,192,0.04) 0%, rgba(255,255,255,0.03) 100%)",
        borderLeft: "3px solid rgba(79,207,192,0.3)",
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.65,
        delay: 0.15 + index * 0.15,
        ease: "easeOut",
      }}
    >
      {/* decorative quote mark */}
      <div className="mb-5">
        <QuoteMarkSvg />
      </div>

      {/* quote */}
      <blockquote className="text-base leading-relaxed text-text-dim italic">
        {item.quote[locale]}
      </blockquote>

      {/* divider */}
      <div className="my-6 h-px bg-border" />

      {/* author */}
      <div className="flex items-center gap-3">
        {/* avatar circle with gradient + initial */}
        <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-border">
          <img
            src={item.photo}
            alt={item.author[locale]}
            className="h-full w-full object-cover"
          />
        </div>

        <span className="font-mono text-xs tracking-widest text-text-dim uppercase">
          {item.author[locale]}
        </span>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="testimonials" ref={ref} className="relative py-14">
      <div className="mx-auto max-w-5xl px-6">
        {/* heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold tracking-widest text-teal uppercase">
            Perspectives
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {t.testimonials.title[locale]}
          </h2>
        </motion.div>

        {/* cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.testimonials.items.map((item, i) => (
            <TestimonialCard
              key={i}
              item={item}
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
