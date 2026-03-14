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
import { WhyAmCham } from "@/components/why-amcham"
import { FirstYearPlan } from "@/components/first-year-plan"
import { VideoSection } from "@/components/video-section"
import { BeyondWork } from "@/components/beyond-work"
import { PersonalNote } from "@/components/personal-note"
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
        <ImpactMetrics />
        <CoreNarrative />
        <WhatIBuild />
        <Timeline />
        <HowILead />
        <Testimonials />
        <Endorsements />
        <WhyAmCham />
        <FirstYearPlan />
        <VideoSection />
        <BeyondWork />
        <PersonalNote />
        <FinalCTA />
      </main>
    </LanguageProvider>
  )
}
