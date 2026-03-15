"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const blockVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

interface StepProps {
  step: number
  label: string
  children: React.ReactNode
  isLast?: boolean
}

function Step({ step, label, children, isLast = false }: StepProps) {
  return (
    <motion.div variants={blockVariants} className="relative flex gap-8">
      {/* Vertical connector */}
      <div className="relative flex flex-col items-center">
        {/* Step circle */}
        <div
          className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #4fcfc0 0%, #3ab5a8 100%)",
            boxShadow:
              "0 0 24px rgba(79,207,192,0.5), 0 0 60px rgba(79,207,192,0.2)",
          }}
        >
          {step}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className="mt-2 w-px flex-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(79,207,192,0.5) 0%, rgba(79,207,192,0.08) 100%)",
              minHeight: "48px",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-teal uppercase">
          {label}
        </div>
        <div
          className="rounded-xl border border-border bg-surface p-6"
          style={{ borderLeft: "3px solid rgba(79,207,192,0.3)" }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export function FirstYearPlan() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section ref={ref} className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={titleVariants}
          className="mb-20"
        >
          <div className="mb-4 inline-block rounded-full border border-coral/25 bg-coral/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-coral uppercase">
            Roadmap
          </div>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-text md:text-5xl">
            {t.plan.title[locale]}
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          {/* Step 1: Initiative */}
          <Step step={1} label={t.plan.initiative.label[locale]}>
            <p className="text-xl leading-snug font-semibold text-white">
              {t.plan.initiative.value[locale]}
            </p>
          </Step>

          {/* Step 2: Goal */}
          <Step step={2} label={t.plan.goal.label[locale]}>
            <p className="text-[15px] leading-relaxed text-text-dim">
              {t.plan.goal.value[locale]}
            </p>
          </Step>

          {/* Step 3: Impact */}
          <Step step={3} label={t.plan.impact.label[locale]} isLast>
            <ul className="flex flex-col gap-3">
              {(t.plan.impact.items[locale] as readonly string[]).map(
                (item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral shadow-[0_0_6px_rgba(240,76,92,0.8)]" />
                    <span className="text-[15px] leading-relaxed text-text-dim">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </Step>
        </motion.div>
      </div>
    </section>
  )
}
