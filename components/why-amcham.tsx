"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

interface ColumnProps {
  title: string
  items: readonly string[]
  highlighted?: boolean
}

function Column({ title, items, highlighted = false }: ColumnProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex-1"
    >
      <div
        className={[
          "flex h-full flex-col rounded-2xl bg-surface border p-8",
          highlighted
            ? "border-teal/30 shadow-[0_0_40px_rgba(79,207,192,0.12)]"
            : "border-border",
        ].join(" ")}
        style={highlighted ? { borderTop: "3px solid #4fcfc0", background: "linear-gradient(180deg, rgba(79,207,192,0.06) 0%, rgba(255,255,255,0.03) 100%)" } : undefined}
      >
        {/* Title */}
        <h3
          className={[
            "mb-6 text-sm font-semibold uppercase tracking-widest",
            highlighted ? "text-teal" : "text-text-dim",
          ].join(" ")}
        >
          {title}
        </h3>

        {/* Items */}
        <ul className="flex flex-col gap-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className={[
                  "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                  highlighted
                    ? "bg-teal shadow-[0_0_8px_rgba(79,207,192,0.8)]"
                    : "bg-text-muted",
                ].join(" ")}
              />
              <span
                className={[
                  "text-[15px] leading-relaxed",
                  highlighted ? "text-white/90" : "text-text-dim",
                ].join(" ")}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function WhyAmCham() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const columns = [
    {
      title: t.amcham.bring.title[locale],
      items: t.amcham.bring.items[locale],
      highlighted: false,
    },
    {
      title: t.amcham.seek.title[locale],
      items: t.amcham.seek.items[locale],
      highlighted: true,
    },
    {
      title: t.amcham.build.title[locale],
      items: t.amcham.build.items[locale],
      highlighted: false,
    },
  ]

  return (
    <section
      id="amcham"
      ref={ref}
      className="px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={titleVariants}
          className="mb-20 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-teal">
            AmCham Young Top Potential
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-text md:text-5xl">
            {t.amcham.title[locale]}
          </h2>
        </motion.div>

        {/* Columns */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col gap-5 md:flex-row"
        >
          {columns.map((col) => (
            <Column
              key={col.title}
              title={col.title}
              items={col.items}
              highlighted={col.highlighted}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
