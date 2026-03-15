"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

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
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="px-6 py-16">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="mx-auto max-w-4xl"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-6 flex justify-center">
          <span className="inline-block rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-teal uppercase">
            Video
          </span>
        </motion.div>

        {/* Video embed */}
        <motion.div variants={fadeUp}>
          <div className="aspect-video overflow-hidden rounded-2xl border border-border">
            <iframe
              src="https://www.youtube.com/embed/nrig1CtGCck"
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
