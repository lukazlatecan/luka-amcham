"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

export function CoreNarrative() {
  const { locale } = useLocale()

  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  // Split title to highlight key phrase in teal
  const titleEn = (
    <>
      I build systems that{" "}
      <span className="text-teal" style={{ textShadow: "0 0 40px rgba(79,207,192,0.4)" }}>make complexity</span> work.
    </>
  )
  const titleSl = (
    <>
      Gradim sisteme, ki{" "}
      <span className="text-teal" style={{ textShadow: "0 0 40px rgba(79,207,192,0.4)" }}>obvladujejo kompleksnost</span>.
    </>
  )

  return (
    <section
      id="journey"
      ref={ref}
      className="w-full py-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <span className="mb-8 inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
              {locale === "en" ? "The Story" : "Zgodba"}
            </span>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text">
              {locale === "en" ? titleEn : titleSl}
            </h2>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="flex flex-col justify-center gap-7"
          >
            <p className="text-text-dim text-base leading-relaxed">
              {t.narrative.p1[locale]}
            </p>

            <p className="text-text-dim text-base leading-relaxed">
              {t.narrative.p2[locale]}
            </p>

            {/* Blockquote */}
            <blockquote
              className="rounded-xl pl-5 py-4 pr-4"
              style={{
                borderLeft: "3px solid #4fcfc0",
                background: "linear-gradient(135deg, rgba(79,207,192,0.06) 0%, rgba(79,207,192,0.01) 100%)",
              }}
            >
              <p className="text-base font-medium italic text-text-dim leading-relaxed">
                &ldquo;{t.narrative.p3[locale]}&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
