"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { t, useLocale, type Locale } from "@/lib/i18n"

type NavLink = {
  labelKey: keyof typeof t.nav
  href: string
}

const links: NavLink[] = [
  { labelKey: "journey", href: "#journey" },
  { labelKey: "companies", href: "#companies" },
  { labelKey: "leadership", href: "#leadership" },
  { labelKey: "testimonials", href: "#testimonials" },
  { labelKey: "beyond", href: "#beyond" },
  { labelKey: "amcham", href: "#amcham" },
  { labelKey: "contact", href: "#contact" },
]

function scrollToSection(href: string) {
  const id = href.replace("#", "")
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

// ─── Mobile Drawer ──────────────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
  locale,
  setLocale,
}: {
  open: boolean
  onClose: () => void
  locale: Locale
  setLocale: (l: Locale) => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 bottom-0 z-50 flex w-[min(320px,85vw)] flex-col border-l border-border bg-bg/97 px-8 pt-20 pb-10 backdrop-blur-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.button
                  key={link.labelKey}
                  onClick={() => {
                    scrollToSection(link.href)
                    onClose()
                  }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.06 + 0.08,
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="cursor-pointer border-b border-border bg-transparent py-2.5 text-left font-sans text-[22px] font-medium tracking-tight text-text-dim transition-colors hover:text-teal"
                >
                  {t.nav[link.labelKey][locale]}
                </motion.button>
              ))}
            </nav>

            {/* Language toggle */}
            <motion.div
              className="mt-10 flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {(["en", "sl"] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`cursor-pointer rounded-lg border px-4 py-2 font-mono text-xs tracking-[0.18em] uppercase transition-all ${
                    l === locale
                      ? "border-teal/60 bg-teal/18 text-teal"
                      : "border-border bg-transparent text-text-muted hover:border-teal/30 hover:text-text-dim"
                  }`}
                >
                  <span className="mr-1">{l === "en" ? "🇬🇧" : "🇸🇮"}</span>
                  {l}
                </button>
              ))}
            </motion.div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="absolute top-6 right-6 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition-colors hover:border-teal/30 hover:text-teal"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

export function Navbar() {
  const { locale, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""))
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -50% 0px" }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-30 px-6 md:px-12"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
      >
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between transition-all duration-300 ${
            scrolled
              ? "border-b border-border bg-bg/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          {/* Logo / Monogram */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex cursor-pointer items-center gap-2.5 bg-transparent p-0"
          >
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-teal/45 bg-teal/10 font-sans text-[13px] font-bold tracking-wide text-teal shadow-[0_0_14px_rgba(79,207,192,0.18)]">
              LZ
            </div>
            <span className="hidden font-sans text-sm font-semibold tracking-tight text-text-dim sm:block">
              Luka Zlatečan
            </span>
          </motion.button>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <button
                  key={link.labelKey}
                  onClick={() => scrollToSection(link.href)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 font-sans text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal/10 text-teal"
                      : "text-text-dim hover:text-teal"
                  }`}
                >
                  {t.nav[link.labelKey][locale]}
                </button>
              )
            })}
          </nav>

          {/* Right side: language toggle + hamburger */}
          <div className="flex items-center gap-3">
            {/* Language toggle - desktop */}
            <div className="hidden items-center overflow-hidden rounded-lg border border-border bg-surface md:flex">
              {(["en", "sl"] as Locale[]).map((l, i) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`cursor-pointer px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
                    i > 0 ? "border-l border-border" : ""
                  } ${
                    l === locale
                      ? "bg-teal/20 text-teal"
                      : "bg-transparent text-text-muted hover:text-text-dim"
                  }`}
                >
                  <span className="mr-1">{l === "en" ? "🇬🇧" : "🇸🇮"}</span>
                  {l}
                </button>
              ))}
            </div>

            {/* Hamburger - mobile */}
            <button
              className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border border-border bg-surface md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-[1.5px] rounded-sm bg-text-dim"
                  style={{ width: i === 1 ? 12 : 16 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        setLocale={setLocale}
      />
    </>
  )
}
