"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Rocket, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t, isRTL, language } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-bg"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F9FF] via-background to-[#E8F0FE] -z-10" />
      
      {/* Animated Background Elements */}
      <div className={`absolute top-20 ${isRTL ? 'left-10' : 'right-10'} w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-20 ${isRTL ? 'right-10' : 'left-10'} w-96 h-96 bg-[#4A6CA3]/10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
          {/* Content */}
          <div 
            className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-full px-4 py-2`}>
              <span className="w-2 h-2 bg-[#1877F2] rounded-full animate-pulse" />
              <span className={`text-sm font-semibold text-[#1877F2] tracking-wide uppercase ${isRTL ? 'tracking-normal' : ''}`}>
                {t("hero.badge")}
              </span>
            </div>

            {/* Heading */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-[#07223F] leading-tight`}>
              {t("hero.title1")}{" "}
              <span className="text-[#1877F2] relative inline-block">
                {t("hero.title2")}
                <svg
                  className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} w-full`}
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 4 150 2 298 10"
                    stroke="#1877F2"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              {t("hero.title3")}
            </h1>

            {/* Slogan */}
            <p className={`text-lg text-[#4A6CA3] font-medium ${isRTL ? 'tracking-normal' : 'tracking-wider'} uppercase`}>
              {t("hero.slogan")}
            </p>

            {/* Description */}
            <p className={`text-lg text-muted-foreground max-w-lg leading-relaxed`}>
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4`}>
              <Button
                asChild
                size="lg"
                className="bg-[#1877F2] hover:bg-[#1560C4] text-white font-semibold px-8 rounded-xl transition-all hover:shadow-xl hover:shadow-[#1877F2]/30 hover:-translate-y-1"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  {t("hero.cta1")}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#07223F]/20 text-[#07223F] hover:bg-[#07223F] hover:text-white font-semibold px-8 rounded-xl transition-all"
              >
                <Link href="#portfolio">{t("hero.cta2")}</Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div 
            className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'} ${isRTL ? 'lg:order-1' : 'lg:order-2'}`} 
            style={{ animationDelay: '0.3s' }}
          >
            {/* Code Window */}
            <div className="bg-[#07223F] rounded-2xl shadow-2xl overflow-hidden border border-[#1877F2]/20">
              {/* Toolbar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0D3A6E] border-b border-[#1877F2]/20">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-4 text-xs text-[#4A6CA3] font-mono">icecode.solution.ts</span>
              </div>
              {/* Code - Always LTR */}
              <div className="p-6 font-mono text-sm leading-loose" dir="ltr">
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">1</span>
                  <span><span className="text-[#82AAFF]">interface</span> <span className="text-[#82CFFF]">Solution</span> {"{"}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">2</span>
                  <span className="pl-4"><span className="text-white">client</span>: <span className="text-[#C3E88D]">string</span>;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">3</span>
                  <span className="pl-4"><span className="text-white">tech</span>: <span className="text-[#C3E88D]">string[]</span>;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">4</span>
                  <span className="pl-4"><span className="text-white">quality</span>: <span className="text-[#C3E88D]">&apos;premium&apos;</span>;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">5</span>
                  <span>{"}"}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">6</span>
                  <span>&nbsp;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">7</span>
                  <span><span className="text-[#82AAFF]">async function</span> <span className="text-[#82CFFF]">build</span>(<span className="text-white">idea</span>) {"{"}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">8</span>
                  <span className="pl-4"><span className="text-[#82AAFF]">return await</span> <span className="text-[#82CFFF]">deliver</span>({"{"}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">9</span>
                  <span className="pl-8"><span className="text-white">quality</span>: <span className="text-[#F78C6C]">100</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">10</span>
                  <span className="pl-8"><span className="text-white">onTime</span>: <span className="text-[#82AAFF]">true</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">11</span>
                  <span className="pl-8"><span className="text-white">powered</span>: <span className="text-[#C3E88D]">&apos;ICE CODE&apos;</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">12</span>
                  <span className="pl-4">{"})"}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#4A6CA3] select-none">13</span>
                  <span>{"}"}</span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} bg-white rounded-xl shadow-xl border border-border px-4 py-3 flex items-center gap-3 animate-float`}>
              <div className="w-10 h-10 bg-[#1877F2]/10 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-[#1877F2]" />
              </div>
              <div dir={isRTL ? 'rtl' : 'ltr'}>
                <p className="text-sm font-bold text-[#07223F]">150+ {language === 'ar' ? 'مشروع' : 'Projects'}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'منجز' : 'Delivered'}</p>
              </div>
            </div>

            <div className={`absolute -top-4 ${isRTL ? '-left-4' : '-right-4'} bg-white rounded-xl shadow-xl border border-border px-4 py-3 flex items-center gap-3 animate-float`} style={{ animationDelay: '1.5s' }}>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <div dir={isRTL ? 'rtl' : 'ltr'}>
                <p className="text-sm font-bold text-[#07223F]">5.0 {language === 'ar' ? 'تقييم' : 'Rating'}</p>
                <p className="text-xs text-muted-foreground">{language === 'ar' ? 'آراء العملاء' : 'Client Reviews'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
