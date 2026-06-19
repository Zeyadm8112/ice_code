"use client"

import { useEffect, useRef, useState } from "react"
import {
  Search, PenTool, Code2, Rocket, LucideIcon,
  Layers, Globe, Brain, Cloud, Palette, Sparkles,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const iconMap: Record<string, LucideIcon> = {
  Search, PenTool, Code2, Rocket, Layers, Globe, Brain, Cloud, Palette, Sparkles,
}

interface ProcessItem {
  id: string
  number: string
  icon: string
  en_title: string
  ar_title: string
  en_description: string
  ar_description: string
}

export function Process({ data }: { data: ProcessItem[] }) {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const { t, language, isRTL } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleSteps((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    )

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
            {t("process.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("process.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("process.description")}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#1877F2] via-[#1877F2]/50 to-[#1877F2]/10 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((step, index) => {
              const Icon = iconMap[step.icon] || Rocket
              const title = language === "ar" ? step.ar_title : step.en_title
              const description = language === "ar" ? step.ar_description : step.en_description
              return (
                <div
                  key={step.id}
                  ref={(el) => { stepsRef.current[index] = el }}
                  data-index={index}
                  className={`relative text-center transition-all duration-500 ${
                    visibleSteps.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="relative z-10 mx-auto mb-6 group">
                    <div className="w-[72px] h-[72px] bg-white border-2 border-[#1877F2] rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-[#1877F2] group-hover:scale-110 shadow-lg shadow-[#1877F2]/20">
                      <Icon className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors" />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#07223F] text-white text-xs font-bold px-2 py-0.5 rounded-full" dir="ltr">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#07223F] mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
