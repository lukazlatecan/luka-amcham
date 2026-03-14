"use client"

import { useState, type ReactNode } from "react"
import { LocaleContext, type Locale } from "@/lib/i18n"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
