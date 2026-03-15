"use client"

import { LanguageProvider } from "@/components/language-provider"
import { LoadingScreen } from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ImpactMetrics } from "@/components/impact-metrics"
import { CoreNarrative } from "@/components/core-narrative"
import { WhatIBuild } from "@/components/what-i-build"
import { Timeline } from "@/components/timeline"
import { HowILead } from "@/components/how-i-lead"
import { Testimonials } from "@/components/testimonials"
import { Endorsements } from "@/components/endorsements"
import { AmChamSection } from "@/components/amcham-section"
import { BeyondWork } from "@/components/beyond-work"
import { FinalCTA } from "@/components/final-cta"
import { StarField } from "@/components/star-field"

export default function Page() {
  return (
    <LanguageProvider>
      <LoadingScreen />
      <StarField />
      <Navbar />
      <main>
        <Hero />
        <CoreNarrative />
        <ImpactMetrics />
        <WhatIBuild />
        <Timeline />
        <HowILead />
        <Testimonials />
        <Endorsements />
        <AmChamSection />
        <BeyondWork />
<FinalCTA />
      </main>
    </LanguageProvider>
  )
}
