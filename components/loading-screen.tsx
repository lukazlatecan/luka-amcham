"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { t, useLocale } from "@/lib/i18n"

function Stars() {
  const [stars, setStars] = useState<
    { id: number; left: string; top: string; size: number; delay: string; duration: string }[]
  >([])

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`,
      })),
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white/60"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

export function LoadingScreen() {
  const { locale } = useLocale()
  const [visible, setVisible] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [showName, setShowName] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const fullText = t.loading[locale]

  // Typewriter effect
  useEffect(() => {
    setTypedText("")
    setShowName(false)
    let index = 0
    const typeInterval = setInterval(() => {
      index++
      setTypedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        clearInterval(typeInterval)
        setTimeout(() => setShowName(true), 400)
        setTimeout(() => setVisible(false), 2600)
      }
    }, 38)
    return () => clearInterval(typeInterval)
  }, [fullText])

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
        >
          <Stars />

          {/* Subtle teal radial glow */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(79,207,192,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
            {/* Logos row */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-4"
            >
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-teal/50 bg-teal/8 font-sans text-lg font-semibold tracking-wide text-teal shadow-[0_0_24px_rgba(79,207,192,0.2)]">
                LZ
              </div>
              <div className="h-6 w-px bg-teal/20" />
              <img
                src="/amcham-logo-white.svg"
                alt="AmCham"
                className="h-8 w-auto opacity-70"
              />
            </motion.div>

            {/* Typewriter line */}
            <div className="min-h-[1.6em] font-mono text-[clamp(11px,1.8vw,14px)] uppercase tracking-[0.18em] text-teal/70">
              {typedText}
              <span
                className="ml-0.5 inline-block h-[1em] w-[0.55em] align-text-bottom transition-colors duration-75"
                style={{
                  background: showCursor
                    ? "rgba(79,207,192,0.8)"
                    : "transparent",
                }}
              />
            </div>

            {/* Name reveal */}
            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col items-center gap-2"
                >
                  <h1 className="font-sans text-[clamp(32px,6vw,56px)] font-semibold leading-tight tracking-tight text-text">
                    Luka Zlatečan
                  </h1>
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim/50">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_#4fcfc0]" />
                    CEO SpaceGuardian · CTO Indigo Labs
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, #4fcfc0, #f04c5c)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
