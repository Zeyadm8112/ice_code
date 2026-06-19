"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface PortfolioItem {
  id: string
  image: string
  tags: string[]
  gradient: string
  en_name: string
  ar_name: string
  en_description: string
  ar_description: string
  en_details?: string
  ar_details?: string
  video_url?: string
}

function youtubeEmbedUrl(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export function Portfolio({ data }: { data: PortfolioItem[] }) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
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
    cardsRef.current.forEach((card) => { if (card) observer.observe(card) })
    return () => observer.disconnect()
  }, [])

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section id="portfolio" className="py-24 bg-[#F5F9FF]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
            {t("portfolio.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("portfolio.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("portfolio.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((project, index) => {
            const name = language === "ar" ? project.ar_name : project.en_name
            const description = language === "ar" ? project.ar_description : project.en_description
            return (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[index] = el }}
                data-index={index}
                onClick={() => setSelected(project)}
                className={`group bg-white rounded-2xl overflow-hidden border border-border hover:border-[#1877F2]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#1877F2]/10 hover:-translate-y-2 cursor-pointer ${
                  visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <Image
                    src={project.image}
                    alt={name}
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute bottom-4 ${isRTL ? "right-4 left-4 text-right" : "left-4 right-4"}`}>
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">{name}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">{description}</p>
                  <div className="flex flex-wrap gap-2" dir="ltr">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-[#F5F9FF] border border-border text-[#4A6CA3] text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <SheetContent
          side={isRTL ? "left" : "right"}
          className="w-full sm:max-w-xl p-0 overflow-y-auto flex flex-col gap-0"
        >
          {selected && (
            <>
              <div className={`relative h-56 bg-gradient-to-br ${selected.gradient} flex-shrink-0`}>
                <Image
                  src={selected.image}
                  alt={language === "ar" ? selected.ar_name : selected.en_name}
                  fill
                  className="object-cover opacity-80"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute bottom-5 ${isRTL ? "right-6 text-right" : "left-6"}`}>
                  <SheetTitle className="text-2xl font-bold text-white drop-shadow-lg">
                    {language === "ar" ? selected.ar_name : selected.en_name}
                  </SheetTitle>
                </div>
              </div>

              <div className={`flex-1 p-6 space-y-5 ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-semibold px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[#07223F]/80 leading-relaxed text-base">
                  {language === "ar" ? selected.ar_description : selected.en_description}
                </p>

                {/* Extra details */}
                {(language === "ar" ? selected.ar_details : selected.en_details) && (
                  <p className="text-[#07223F]/70 leading-relaxed text-sm border-t border-border pt-4">
                    {language === "ar" ? selected.ar_details : selected.en_details}
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
                      title={language === "ar" ? selected.ar_name : selected.en_name}
                    />
                  </div>
                )}

                <Button
                  asChild
                  className="bg-[#1877F2] hover:bg-[#1560C4] text-white font-semibold px-6 rounded-xl w-full"
                >
                  <Link href="#contact" onClick={() => setSelected(null)} className="flex items-center justify-center gap-2">
                    {language === "ar" ? "طلب عرض سعر" : "Request a Quote"}
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}
