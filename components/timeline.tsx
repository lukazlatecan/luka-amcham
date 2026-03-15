"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

function TimelineItem({
  item,
  index,
  locale,
  inView,
  direction,
}: {
  item: (typeof t.timeline.items)[number]
  index: number
  locale: "en" | "sl"
  inView: boolean
  direction: "above" | "below"
}) {
  return (
    <motion.div
      className={`flex flex-col items-start gap-1 text-left ${
        direction === "above" ? "pb-2" : "pt-2"
      }`}
      initial={{ opacity: 0, y: direction === "above" ? 20 : -20 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: direction === "above" ? 20 : -20 }
      }
      transition={{ duration: 0.6, delay: 0.4 + index * 0.15, ease: "easeOut" }}
    >
      <span className="font-mono text-xs font-bold tracking-widest text-teal uppercase">
        {item.year[locale]}
      </span>
      <span className="max-w-[160px] text-sm leading-snug font-semibold text-text">
        {item.title[locale]}
      </span>
      <span className="max-w-[160px] text-xs leading-relaxed text-text-dim">
        {item.desc[locale]}
      </span>
    </motion.div>
  )
}

function MobileTimelineItem({
  item,
  index,
  locale,
  inView,
}: {
  item: (typeof t.timeline.items)[number]
  index: number
  locale: "en" | "sl"
  inView: boolean
}) {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{
        duration: 0.55,
        delay: 0.15 + index * 0.12,
        ease: "easeOut",
      }}
    >
      {/* dot + line column */}
      <div className="flex w-4 flex-shrink-0 flex-col items-center">
        <div
          className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-teal"
          style={{
            boxShadow:
              "0 0 12px rgba(79,207,192,0.5), 0 0 24px rgba(79,207,192,0.2)",
          }}
        />
        {index < t.timeline.items.length - 1 && (
          <motion.div
            className="mt-2 w-0.5 flex-1 bg-border"
            style={{ minHeight: 40, transformOrigin: "top" }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
          />
        )}
      </div>

      {/* content */}
      <div className="flex flex-col gap-1 pb-8">
        <span className="font-mono text-xs font-bold tracking-widest text-teal uppercase">
          {item.year[locale]}
        </span>
        <span className="text-sm leading-snug font-semibold text-text">
          {item.title[locale]}
        </span>
        <span className="text-xs leading-relaxed text-text-dim">
          {item.desc[locale]}
        </span>
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const { locale } = useLocale()
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })
  const [lineRef, lineInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const items = t.timeline.items
  const desktopLayout: Array<"above" | "below"> = items.map((_, i) =>
    i % 2 === 0 ? "above" : "below"
  )

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative overflow-hidden py-14"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold tracking-widest text-teal uppercase">
            Timeline
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {t.timeline.title[locale]}
          </h2>
        </motion.div>

        {/* DESKTOP: horizontal timeline */}
        <div className="hidden md:block" ref={lineRef}>
          <div className="relative">
            {/* top row (above-line items) */}
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
            >
              {items.map((item, i) => (
                <div key={i} className="flex justify-start pl-2">
                  {desktopLayout[i] === "above" ? (
                    <TimelineItem
                      item={item}
                      index={i}
                      locale={locale}
                      inView={lineInView}
                      direction="above"
                    />
                  ) : (
                    <div className="pb-6" style={{ minHeight: 80 }} />
                  )}
                </div>
              ))}
            </div>

            {/* line + dots row */}
            <div className="relative flex items-center" style={{ height: 32 }}>
              {/* background track */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-border" />

              {/* animated fill */}
              <motion.div
                className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-teal shadow-[0_0_8px_rgba(79,207,192,0.5)]"
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              />

              {/* dots */}
              <div
                className="absolute inset-x-0 grid h-full items-center"
                style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
              >
                {items.map((_, i) => (
                  <div key={i} className="flex justify-start pl-2">
                    <motion.div
                      className="h-4 w-4 rounded-full bg-teal"
                      style={{
                        boxShadow:
                          "0 0 12px rgba(79,207,192,0.5), 0 0 24px rgba(79,207,192,0.2)",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        lineInView
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + i * 0.15,
                        ease: "backOut",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* bottom row (below-line items) */}
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
            >
              {items.map((item, i) => (
                <div key={i} className="flex justify-start pl-2">
                  {desktopLayout[i] === "below" ? (
                    <TimelineItem
                      item={item}
                      index={i}
                      locale={locale}
                      inView={lineInView}
                      direction="below"
                    />
                  ) : (
                    <div className="pt-6" style={{ minHeight: 80 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE: vertical timeline */}
        <div className="block md:hidden">
          {items.map((item, i) => (
            <MobileTimelineItem
              key={i}
              item={item}
              index={i}
              locale={locale}
              inView={sectionInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
