import { Inter, JetBrains_Mono } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Luka Zlatečan | AmCham Top Potential 2026",
  description:
    "CEO of SpaceGuardian, CTO of Indigo Labs. Engineering systems that scale from cloud to orbit.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Luka Zlatečan | AmCham Top Potential 2026",
    description:
      "CEO of SpaceGuardian, CTO of Indigo Labs. Engineering systems that scale from cloud to orbit.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  )
}
