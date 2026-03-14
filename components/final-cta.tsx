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

export function FinalCTA() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-6 py-40"
    >
      {/* Orbital rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Ring 1 - outer */}
        <div className="absolute h-[700px] w-[700px] rounded-full border border-teal/[0.08]" />
        {/* Ring 2 - middle */}
        <div className="absolute h-[500px] w-[500px] rounded-full border border-indigo/[0.12]" />
        {/* Ring 3 - inner */}
        <div className="absolute h-[320px] w-[320px] rounded-full border border-teal/[0.08]" />

        {/* Orbital dot on ring 2 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute h-[500px] w-[500px]"
        >
          <div
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo"
            style={{
              boxShadow: "0 0 12px rgba(240,76,92,0.9), 0 0 24px rgba(240,76,92,0.4)",
            }}
          />
        </motion.div>

        {/* Orbital dot on ring 1, opposite direction */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute h-[700px] w-[700px]"
        >
          <div
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral"
            style={{
              boxShadow: "0 0 10px rgba(240,76,92,0.8), 0 0 20px rgba(240,76,92,0.3)",
            }}
          />
        </motion.div>

        {/* Orbital dot on ring 3 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute h-[320px] w-[320px]"
        >
          <div
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal"
            style={{
              boxShadow: "0 0 10px rgba(79,207,192,0.9), 0 0 20px rgba(79,207,192,0.4)",
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="relative mx-auto max-w-3xl text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-6 flex justify-center">
          <span className="inline-block rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-teal">
            Contact
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          className="mb-12 text-5xl font-bold tracking-tight text-text md:text-6xl"
          style={{ textShadow: "0 0 60px rgba(79,207,192,0.2)" }}
        >
          {t.cta.title[locale]}
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Download CV - coral */}
          <a
            href="/cv.pdf"
            download
            className="group relative inline-flex min-w-[200px] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-coral px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{ boxShadow: "0 4px 24px rgba(240,76,92,0.35), 0 0 60px rgba(240,76,92,0.15)" }}
          >
            {/* Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3v13M6 11l6 6 6-6M4 20h16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {t.cta.cv[locale]}
          </a>

          {/* Connect on LinkedIn - teal */}
          <a
            href="https://www.linkedin.com/in/luka-zlatecan/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex min-w-[200px] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-teal px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{ boxShadow: "0 4px 24px rgba(79,207,192,0.35), 0 0 60px rgba(79,207,192,0.15)" }}
          >
            {/* LinkedIn icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>

            {t.cta.linkedin[locale]}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
