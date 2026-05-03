"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration, start])

  return count
}

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t, isRTL } = useLanguage()

  const stats = [
    { value: 150, suffix: "+", labelKey: "stats.projects" },
    { value: 80, suffix: "+", labelKey: "stats.clients" },
    { value: 5, suffix: "+", labelKey: "stats.experience" },
    { value: 24, suffix: "/7", labelKey: "stats.support" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#1877F2] py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 snow-pattern" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.labelKey}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.labelKey)}
              isVisible={isVisible}
              delay={index * 0.1}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({
  value,
  suffix,
  label,
  isVisible,
  delay,
}: {
  value: number
  suffix: string
  label: string
  isVisible: boolean
  delay: number
  isRTL: boolean
}) {
  const count = useCountUp(value, 2000, isVisible)

  return (
    <div
      className="text-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease-out ${delay}s`,
      }}
    >
      <div className="text-4xl sm:text-5xl font-bold text-white mb-2" dir="ltr">
        <span>{count}</span>
        <span>{suffix}</span>
      </div>
      <div className="text-white/75 text-sm sm:text-base font-medium">{label}</div>
    </div>
  )
}
