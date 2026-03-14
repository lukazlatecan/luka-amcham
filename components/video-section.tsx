"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

export function VideoSection() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="px-6 py-32"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="mx-auto max-w-4xl text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-4 flex justify-center">
          <span className="inline-block rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-teal">
            Video
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="mb-6 text-4xl font-bold tracking-tight text-text md:text-5xl"
        >
          {t.video.title[locale]}
        </motion.h2>

        {/* Body text */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-14 max-w-2xl text-[17px] leading-relaxed text-text-dim"
        >
          {t.video.text[locale]}
        </motion.p>

        {/* Video placeholder */}
        <motion.div variants={fadeUp} className="relative">
          <div className="group relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface aspect-video">
            {/* Play button */}
            <div className="flex flex-col items-center gap-5">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-teal/30 bg-teal/10 transition-transform duration-300 group-hover:scale-110">
                {/* Pulsing ring */}
                <div
                  className="absolute inset-0 animate-ping rounded-full bg-teal/20"
                  style={{ animationDuration: "2.5s" }}
                />

                {/* Play icon */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M6 4.5L19.5 12L6 19.5V4.5Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>

              {/* Coming soon badge */}
              <div className="rounded-full border border-coral/25 bg-coral/15 px-5 py-2 text-sm font-medium text-coral backdrop-blur-sm">
                Coming soon
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
