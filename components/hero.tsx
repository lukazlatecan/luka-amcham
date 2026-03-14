"use client"

import { motion, type Variants } from "framer-motion"
import { t, useLocale } from "@/lib/i18n"

// ─── Animation variants ─────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  },
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero() {
  const { locale } = useLocale()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Main content */}
      <motion.div
        className="relative z-10 flex max-w-4xl flex-col items-center gap-7 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile photo */}
        <motion.div variants={itemVariants}>
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-teal/40 shadow-[0_0_30px_rgba(79,207,192,0.2)]">
            <img
              src="/luka.png"
              alt="Luka Zlatečan"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* AmCham badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <img src="/amcham-logo-white.svg" alt="AmCham Slovenia" className="h-7 object-contain" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted/60">
            Young Top Potential 2026
          </span>
        </motion.div>

        {/* Company logos */}
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          <div
            className="flex h-10 items-center justify-center rounded-xl px-4"
            style={{ background: "rgba(79,207,192,0.08)", border: "1px solid rgba(79,207,192,0.2)" }}
          >
            <img src="/spaceguardian-logo.png" alt="SpaceGuardian" className="h-6 object-contain" />
          </div>
          <span className="text-text-muted/40 text-lg font-light">×</span>
          <div
            className="flex h-10 items-center justify-center rounded-xl px-4"
            style={{ background: "rgba(240,76,92,0.08)", border: "1px solid rgba(240,76,92,0.2)" }}
          >
            <img src="/indigo-logo-white.png" alt="Indigo Labs" className="h-5 object-contain" />
          </div>
        </motion.div>

        {/* Badge pill */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-teal/35 bg-teal/8 px-4 py-1.5 backdrop-blur-sm">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-teal shadow-[0_0_10px_#4fcfc0]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal/85">
              CEO SpaceGuardian · CTO Indigo Labs
            </span>
          </div>
        </motion.div>

        {/* H1 Name */}
        <motion.h1
          variants={itemVariants}
          className="font-sans text-6xl font-bold tracking-tight leading-none text-text md:text-8xl"
          style={{ textShadow: "0 0 80px rgba(79,207,192,0.15)" }}
        >
          {t.hero.name[locale]}
        </motion.h1>

        {/* Headline with teal accent */}
        <motion.p
          variants={itemVariants}
          className="max-w-[680px] font-sans text-[clamp(18px,3.2vw,28px)] leading-relaxed tracking-tight text-teal"
        >
          {t.hero.headline[locale]}
        </motion.p>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="max-w-[480px] whitespace-pre-line font-sans text-[clamp(13px,1.8vw,16px)] leading-relaxed text-text-dim"
        >
          {t.hero.sub[locale]}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {/* Primary */}
          <motion.button
            onClick={() => scrollTo("journey")}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="cursor-pointer rounded-full bg-teal px-7 py-3.5 font-sans text-[15px] font-semibold tracking-tight text-bg shadow-[0_4px_24px_rgba(79,207,192,0.35)]"
          >
            {t.hero.cta1[locale]}
          </motion.button>

          {/* Secondary ghost */}
          <motion.button
            onClick={() => scrollTo("amcham")}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="cursor-pointer rounded-full border border-border-hover bg-surface px-7 py-3.5 font-sans text-[15px] font-medium tracking-tight text-text-dim backdrop-blur-sm transition-colors hover:border-teal/30 hover:text-teal"
          >
            {t.hero.cta2[locale]}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted/50">
          scroll
        </span>
        <motion.div
          className="w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(79,207,192,0.6) 0%, transparent 100%)",
          }}
          animate={{ height: [16, 32, 16] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
