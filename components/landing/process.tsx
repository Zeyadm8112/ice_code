"use client"

import { useEffect, useRef, useState } from "react"
import { Search, PenTool, Code2, Rocket } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Process() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const { t, isRTL } = useLanguage()

  const steps = [
    {
      number: "01",
      titleKey: "process.step1.title",
      descriptionKey: "process.step1.description",
      icon: Search,
    },
    {
      number: "02",
      titleKey: "process.step2.title",
      descriptionKey: "process.step2.description",
      icon: PenTool,
    },
    {
      number: "03",
      titleKey: "process.step3.title",
      descriptionKey: "process.step3.description",
      icon: Code2,
    },
    {
      number: "04",
      titleKey: "process.step4.title",
      descriptionKey: "process.step4.description",
      icon: Rocket,
    },
  ]

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
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
            {t("process.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("process.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("process.description")}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#1877F2] via-[#1877F2]/50 to-[#1877F2]/10 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el }}
                data-index={index}
                className={`relative text-center transition-all duration-500 ${
                  visibleSteps.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Number Circle */}
                <div className="relative z-10 mx-auto mb-6 group">
                  <div className="w-[72px] h-[72px] bg-white border-2 border-[#1877F2] rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-[#1877F2] group-hover:scale-110 shadow-lg shadow-[#1877F2]/20">
                    <step.icon className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors" />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#07223F] text-white text-xs font-bold px-2 py-0.5 rounded-full" dir="ltr">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#07223F] mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
