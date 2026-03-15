"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function PersonalNote() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        {/* Top gradient line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="mx-auto mb-12 h-px max-w-xs origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, #4fcfc0, rgba(79,207,192,0.4), transparent)",
          }}
        />

        {/* Opening quote mark */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mb-6 font-serif text-8xl leading-none text-teal/20 select-none"
          aria-hidden
        >
          &ldquo;
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <p className="text-xl leading-relaxed text-white/80 italic md:text-2xl">
            {t.personal.text[locale]}
          </p>
        </motion.blockquote>

        {/* Closing quote mark */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="mt-6 text-right font-serif text-8xl leading-none text-teal/20 select-none"
          aria-hidden
        >
          &rdquo;
        </motion.div>

        {/* Bottom gradient line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="mx-auto mt-12 h-px max-w-xs origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, #4fcfc0, rgba(79,207,192,0.4), transparent)",
          }}
        />

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-sm font-medium tracking-widest text-teal/50 uppercase"
        >
          Luka Zlatečan
        </motion.div>
      </motion.div>
    </section>
  )
}
