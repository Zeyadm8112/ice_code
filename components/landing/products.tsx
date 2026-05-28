"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Truck, Bot, Check, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Products() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t, isRTL } = useLanguage()

  const products = [
    {
      name: t("products.platform.name"),
      badge: t("products.platform.badge"),
      description: t("products.platform.description"),
      features: [
        t("products.platform.feature1"),
        t("products.platform.feature2"),
        t("products.platform.feature3"),
        t("products.platform.feature4"),
      ],
      featured: true,
    },
    {
      name: t("products.delivery.name"),
      badge: t("products.delivery.badge"),
      description: t("products.delivery.description"),
      features: [
        t("products.delivery.feature1"),
        t("products.delivery.feature2"),
        t("products.delivery.feature3"),
      ],
      icon: Truck,
      featured: false,
    },
    {
      name: t("products.assistant.name"),
      badge: t("products.assistant.badge"),
      description: t("products.assistant.description"),
      features: [
        t("products.assistant.feature1"),
        t("products.assistant.feature2"),
        t("products.assistant.feature3"),
      ],
      icon: Bot,
      featured: false,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section id="products" ref={sectionRef} className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
            {t("products.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("products.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("products.description")}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Product - ICE Platform */}
          <div
            className={`lg:col-span-2 bg-gradient-to-br from-[#1877F2] to-[#1560C4] rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 snow-pattern" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center relative">
              <div className={isRTL ? 'lg:order-2' : 'lg:order-1'}>
                <span className={`inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase px-4 py-2 rounded-full mb-6 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
                  {products[0].badge}
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  {products[0].name}
                </h3>
                <p className="text-white/85 text-lg leading-relaxed mb-6">
                  {products[0].description}
                </p>
                <ul className="space-y-3 mb-8">
                  {products[0].features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-white/80 flex-shrink-0" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1877F2] hover:bg-white/90 font-semibold px-8 rounded-xl"
                >
                  <Link href="#contact" className="flex items-center gap-2">
                    {t("products.requestDemo")}
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Visual - ICE CODE Icon */}
              <div className={`hidden lg:flex items-center justify-center ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  {/* ICE CODE Icon with white filter */}
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-cwL3OTiGeDu81kYXaDXZaeQ3UuoyxB.png"
                      alt="ICE CODE"
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
