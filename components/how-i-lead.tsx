"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLocale } from "@/lib/i18n"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const photos = [
  { src: "/talk1.jpeg", alt: "Conference talk 1" },
  { src: "/talk2.jpeg", alt: "Conference talk 2" },
  { src: "/talk3.jpeg", alt: "Conference talk 3" },
  { src: "/talk4.jpeg", alt: "Conference talk 4" },
]

export function HowILead() {
  const { locale } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const title = locale === "en" ? "Stepping on stage" : "Na oder"
  const badge = locale === "en" ? "Public speaking" : "Javno nastopanje"
  const body1 =
    locale === "en"
      ? "Public speaking has been one of my biggest challenges outside my comfort zone. I had always built things behind screens and let the work speak for itself. Standing in front of an audience and owning the room felt like a different kind of skill entirely."
      : "Javno nastopanje je bil eden mojih največjih izzivov izven cone udobja. Vedno sem gradil stvari za zasloni in pustil, da delo govori samo zase. Stati pred občinstvom in obvladati prostor se je zdelo povsem drugačna veščina."
  const body2 =
    locale === "en"
      ? "I spoke at several conferences on topics ranging from AI in product development to sustainable space infrastructure. Each time I walked off stage, I understood something new about communication, clarity and conviction."
      : "Nastopil sem na več konferencah na teme od umetne inteligence v razvoju produktov do trajnostne vesoljske infrastrukture. Vsakič ko sem stopil z odra, sem razumel kaj novega o komunikaciji, jasnosti in prepričljivosti."

  return (
    <section id="leadership" ref={ref} className="relative py-14">
      <div className="mx-auto max-w-5xl px-6">
        {/* heading */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-xs font-bold tracking-widest text-teal uppercase">
            {badge}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
            {title}
          </h2>
        </motion.div>

        {/* text + photo grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <p className="text-lg leading-relaxed text-text-dim">{body1}</p>
            <p className="text-base leading-relaxed text-text-muted">{body2}</p>
          </motion.div>

          {/* right: 2x2 photo grid */}
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
