"use client"

import { useState, useEffect } from "react"

export function StarField() {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; opacity: number; duration: number }[]
  >([])

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 4 + 3,
      })),
    )
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Aurora layer 1 — large teal wash, upper-left to center */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-15%",
          right: "-15%",
          bottom: "-20%",
          background:
            "radial-gradient(ellipse 70% 50% at 30% 35%, rgba(79,207,192,0.12) 0%, rgba(20,113,101,0.04) 45%, transparent 75%)",
          filter: "blur(80px)",
          animation: "aurora1 20s ease-in-out infinite",
        }}
      />

      {/* Aurora layer 2 — teal wash, center-right */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-15%",
          right: "-15%",
          bottom: "-20%",
          background:
            "radial-gradient(ellipse 60% 45% at 70% 55%, rgba(79,207,192,0.09) 0%, rgba(23,147,124,0.03) 50%, transparent 75%)",
          filter: "blur(90px)",
          animation: "aurora2 28s ease-in-out infinite",
        }}
      />

      {/* Aurora layer 3 — subtle blue tint, upper area */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(163,203,255,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "aurora3 32s ease-in-out infinite",
        }}
      />

      {/* Aurora layer 4 — bottom teal glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          right: "-10%",
          height: "55%",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(79,207,192,0.10) 0%, rgba(20,113,101,0.04) 45%, transparent 75%)",
          filter: "blur(70px)",
          animation: "aurora1 25s ease-in-out infinite reverse",
        }}
      />

      {/* Aurora layer 5 — indigo accent, bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(240,76,92,0.04) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "aurora3 24s ease-in-out infinite reverse",
        }}
      />

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: "#fff",
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
