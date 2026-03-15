"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

export function Endorsements() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const items = t.endorsements.items

  const paginate = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + items.length) % items.length)
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  const item = items[current]

  return (
    <section ref={ref} className="relative py-14">
      <div className="mx-auto max-w-4xl px-6">
        {/* heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-indigo/30 bg-indigo/5 px-3 py-1 text-xs font-bold tracking-widest text-indigo uppercase">
            {locale === "en" ? "Endorsements" : "Priporočila"}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {t.endorsements.title[locale]}
          </h2>
        </motion.div>

        {/* carousel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
        >
          {/* card */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="rounded-2xl border border-border p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(240,76,92,0.04) 0%, rgba(79,207,192,0.04) 100%)",
                  borderLeft: "3px solid rgba(240,76,92,0.4)",
                }}
              >
                {/* quote mark */}
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
                <blockquote className="text-base leading-relaxed text-text-dim italic md:text-lg">
                  {item.quote[locale]}
                </blockquote>

                {/* divider */}
                <div className="my-6 h-px bg-border" />

                {/* author + download */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-border">
                      <img
                        src={item.photo}
                        alt={item.author[locale]}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-text">
                        {item.author[locale]}
                      </span>
                      {item.role[locale] && (
                        <span className="font-mono text-xs tracking-widest text-text-muted uppercase">
                          {item.role[locale]}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={item.pdfUrl}
                    download
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-indigo/25 bg-indigo/8 px-4 py-2 text-xs font-medium text-indigo transition-all hover:scale-[1.02] hover:bg-indigo/15"
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
                      <path d="M12 3v13M6 11l6 6 6-6M4 20h16" />
                    </svg>
                    {locale === "en" ? "Download" : "Prenesi"}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => paginate(-1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-surface transition-all hover:border-indigo/40 hover:bg-indigo/8"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* dots */}
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1)
                    setCurrent(i)
                  }}
                  className={`cursor-pointer rounded-full transition-all ${i === current ? "h-2 w-6 bg-indigo" : "h-2 w-2 bg-border hover:bg-indigo/40"}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-surface transition-all hover:border-indigo/40 hover:bg-indigo/8"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
