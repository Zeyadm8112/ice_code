"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Smartphone, Globe, Brain, Cloud, Palette, Sparkles,
  ArrowRight, ArrowLeft, LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const iconMap: Record<string, LucideIcon> = {
  Globe, Smartphone, Palette, Cloud, Brain, Sparkles,
}

interface ServiceItem {
  id: string
  icon: string
  color: string
  en_title: string
  ar_title: string
  en_description: string
  ar_description: string
}

export function Services({ data }: { data: ServiceItem[] }) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const { t, language, isRTL } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section id="services" className="py-24 bg-[#F5F9FF]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
            {t("services.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe
            const title = language === "ar" ? service.ar_title : service.en_title
            const description = language === "ar" ? service.ar_description : service.en_description
            return (
              <div
                key={service.id}
                ref={(el) => { cardsRef.current[index] = el }}
                data-index={index}
                className={`group bg-white rounded-2xl p-8 border border-border hover:border-[#1877F2]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#1877F2]/10 hover:-translate-y-2 relative overflow-hidden ${
                  visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-[#1877F2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isRTL ? "origin-right" : "origin-left"}`} />

                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>

                <h3 className="text-xl font-bold text-[#07223F] mb-3 group-hover:text-[#1877F2] transition-colors">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[#1877F2] font-semibold text-sm hover:gap-3 transition-all"
                >
                  {t("products.learnMore")}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
