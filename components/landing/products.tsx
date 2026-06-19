"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, ArrowRight, ArrowLeft, LucideIcon, Layers, Truck, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useLanguage } from "@/lib/language-context"

const iconMap: Record<string, LucideIcon> = { Layers, Truck, Bot }

interface ProductItem {
  id: string
  icon: string
  featured: boolean
  en_name: string
  ar_name: string
  en_badge: string
  ar_badge: string
  en_description: string
  ar_description: string
  en_features: string[]
  ar_features: string[]
  en_details?: string
  ar_details?: string
  video_url?: string
}

function youtubeEmbedUrl(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export function Products({ data }: { data: ProductItem[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState<ProductItem | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t, language, isRTL } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight
  const l = language

  const featured = data.find((p) => p.featured)
  const others = data.filter((p) => !p.featured)

  return (
    <section id="products" ref={sectionRef} className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
            {t("products.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("products.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("products.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featured && (
            <div
              onClick={() => setSelected(featured)}
              className={`lg:col-span-2 bg-gradient-to-br from-[#1877F2] to-[#1560C4] rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative transition-all duration-700 cursor-pointer hover:shadow-2xl hover:shadow-[#1877F2]/30 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 snow-pattern" />
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center relative">
                <div className={isRTL ? "lg:order-2" : "lg:order-1"}>
                  <span className={`inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase px-4 py-2 rounded-full mb-6 ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                    {l === "ar" ? featured.ar_badge : featured.en_badge}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    {l === "ar" ? featured.ar_name : featured.en_name}
                  </h3>
                  <p className="text-white/85 text-lg leading-relaxed mb-6">
                    {l === "ar" ? featured.ar_description : featured.en_description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {(l === "ar" ? featured.ar_features : featured.en_features).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-white/80 flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#1877F2] hover:bg-white/90 font-semibold px-8 rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="#contact" className="flex items-center gap-2">
                      {t("products.requestDemo")}
                      <ArrowIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className={`hidden lg:flex items-center justify-center ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
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
          )}

          {others.map((product, index) => {
            const Icon = iconMap[product.icon] || Layers
            return (
              <div
                key={product.id}
                onClick={() => setSelected(product)}
                className={`bg-white border border-border rounded-3xl p-8 transition-all duration-700 hover:border-[#1877F2]/30 hover:shadow-xl cursor-pointer hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 1) * 0.15}s` }}
              >
                <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-6 ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                  {l === "ar" ? product.ar_badge : product.en_badge}
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1877F2]/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#07223F]">
                    {l === "ar" ? product.ar_name : product.en_name}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {l === "ar" ? product.ar_description : product.en_description}
                </p>
                <ul className="space-y-2 mb-8">
                  {(l === "ar" ? product.ar_features : product.en_features).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-[#1877F2] flex-shrink-0" />
                      <span className="text-[#07223F]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link href="#contact" className="flex items-center gap-2">
                    {t("products.requestDemo")}
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <SheetContent
          side={isRTL ? "left" : "right"}
          className="w-full sm:max-w-lg overflow-y-auto flex flex-col gap-0 p-0"
        >
          {selected && (
            <div className={`flex-1 p-8 space-y-6 ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
              <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {l === "ar" ? selected.ar_badge : selected.en_badge}
              </span>

              <SheetTitle className="text-2xl font-bold text-[#07223F]">
                {l === "ar" ? selected.ar_name : selected.en_name}
              </SheetTitle>

              <p className="text-[#07223F]/70 leading-relaxed text-base">
                {l === "ar" ? selected.ar_description : selected.en_description}
              </p>

              {/* Extra details */}
              {(l === "ar" ? selected.ar_details : selected.en_details) && (
                <p className="text-[#07223F]/60 leading-relaxed text-sm border-t border-border pt-4">
                  {l === "ar" ? selected.ar_details : selected.en_details}
                </p>
              )}

              {/* YouTube embed */}
              {selected.video_url && youtubeEmbedUrl(selected.video_url) && (
                <div className="rounded-xl overflow-hidden aspect-video border border-border">
                  <iframe
                    src={youtubeEmbedUrl(selected.video_url)!}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={l === "ar" ? selected.ar_name : selected.en_name}
                  />
                </div>
              )}

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {l === "ar" ? "المميزات" : "Features"}
                </p>
                <ul className="space-y-3">
                  {(l === "ar" ? selected.ar_features : selected.en_features).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#1877F2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#1877F2]" />
                      </div>
                      <span className="text-[#07223F]/80 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                className="bg-[#1877F2] hover:bg-[#1560C4] text-white font-semibold px-6 rounded-xl w-full"
              >
                <Link href="#contact" onClick={() => setSelected(null)} className="flex items-center justify-center gap-2">
                  {t("products.requestDemo")}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}
