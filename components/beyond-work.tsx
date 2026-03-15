"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { t, useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const hobbyIcons: Record<string, React.ReactNode> = {
  badminton: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <path d="M8 21l4-5 4 5" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  ),
  cube: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  math: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="10" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="18" x2="16" y2="18" />
      <path d="M6 14l4 4M10 14l-4 4" />
      <circle cx="18" cy="16" r="0.5" fill="currentColor" />
    </svg>
  ),
  piano: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="8" y1="4" x2="8" y2="14" />
      <line x1="12" y1="4" x2="12" y2="14" />
      <line x1="16" y1="4" x2="16" y2="14" />
      <line x1="6" y1="14" x2="18" y2="14" />
    </svg>
  ),
}

function Photo({
  src,
  alt,
  delay,
  inView,
}: {
  src: string
  alt: string
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  )
}

export function BeyondWork() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="beyond" ref={ref} className="relative py-14">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold tracking-widest text-teal uppercase">
            {locale === "en" ? "Personal" : "Osebno"}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {t.beyondWork.title[locale]}
          </h2>
        </motion.div>

        {/* Father intro + photo grid */}
        <div className="mb-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <p className="text-xl leading-relaxed text-text-dim md:text-2xl">
              {t.beyondWork.intro[locale]}
            </p>
          </motion.div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-4">
            <Photo
              src="/father.jpeg"
              alt="Family"
              delay={0.2}
              inView={inView}
            />
            <Photo
              src="/father2.jpeg"
              alt="With my child"
              delay={0.3}
              inView={inView}
            />
          </div>
        </div>

        {/* Hobbies */}
        <motion.p
          className="mb-6 text-xs font-semibold tracking-[0.2em] text-teal uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        >
          {locale === "en" ? "Hobbies & interests" : "Hobiji in interesi"}
        </motion.p>
        <div className="mb-20 grid grid-cols-2 gap-5 md:grid-cols-4">
          {t.beyondWork.hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.icon}
              className="rounded-2xl border border-border p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(79,207,192,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.1 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-teal/20 bg-teal/8 text-teal">
                {hobbyIcons[hobby.icon]}
              </div>
              <h3 className="mb-1 text-sm font-semibold text-text">
                {hobby.title[locale]}
              </h3>
              <p className="text-xs leading-relaxed text-text-muted">
                {hobby.desc[locale]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Photo row */}
        <div className="grid grid-cols-3 gap-4">
          <Photo
            src="/badminton.jpeg"
            alt="Badminton"
            delay={0.4}
            inView={inView}
          />
          <Photo src="/piano.jpeg" alt="Piano" delay={0.5} inView={inView} />
          <Photo
            src="/hiking.jpeg"
            alt="Hiking adventures"
            delay={0.6}
            inView={inView}
          />
        </div>
      </div>
    </section>
  )
}
