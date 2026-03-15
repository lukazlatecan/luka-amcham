"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, target, duration])

  return count
}

interface MetricCardProps {
  value: string | number
  label: string
  isNumeric: boolean
  index: number
  parentInView: boolean
  suffix?: string
}

function MetricCard({
  value,
  label,
  isNumeric,
  index,
  parentInView,
  suffix = "",
}: MetricCardProps) {
  const count = useCountUp(
    isNumeric ? (value as number) : 0,
    1200 + index * 150,
    parentInView && isNumeric
  )

  const [textVisible, setTextVisible] = useState(false)
  useEffect(() => {
    if (parentInView && !isNumeric) {
      const timer = setTimeout(() => setTextVisible(true), index * 120)
      return () => clearTimeout(timer)
    }
  }, [parentInView, isNumeric, index])

  const displayValue = isNumeric ? `${count}${suffix}` : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.12 }}
      className="rounded-xl border border-border bg-surface p-6 text-center"
      style={{ borderTop: "2px solid rgba(79,207,192,0.5)" }}
    >
      <div
        className={`text-5xl font-bold text-teal transition-all duration-600 ${
          isNumeric
            ? "opacity-100"
            : textVisible
              ? "scale-100 opacity-100"
              : "scale-90 opacity-0"
        }`}
        style={{ textShadow: "0 0 30px rgba(79,207,192,0.4)" }}
      >
        {displayValue}
      </div>
      <p className="mt-3 text-sm text-text-dim">{label}</p>
    </motion.div>
  )
}

export function ImpactMetrics() {
  const { locale } = useLocale()

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const metrics = [
    {
      value: 4,
      label: t.metrics.companies[locale],
      isNumeric: true,
      suffix: "",
    },
    { value: 10, label: t.metrics.years[locale], isNumeric: true, suffix: "+" },
    {
      value: 15,
      label: locale === "en" ? "People I lead" : "Ljudi, ki jih vodim",
      isNumeric: true,
      suffix: "+",
    },
    {
      value: 6,
      label: locale === "en" ? "Awards won" : "Prejetih nagrad",
      isNumeric: true,
      suffix: "",
    },
  ]

  return (
    <section ref={ref} className="w-full py-14">
      <div className="mx-auto max-w-5xl px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold tracking-widest text-teal uppercase">
            {t.metrics.title[locale]}
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricCard
              key={i}
              value={metric.value}
              label={metric.label}
              isNumeric={metric.isNumeric}
              suffix={metric.suffix}
              index={i}
              parentInView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
