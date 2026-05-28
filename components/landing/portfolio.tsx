"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Portfolio() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const { t, isRTL } = useLanguage()

  const projects = [
    {
      nameKey: "portfolio.pharmacy",
      descriptionKey: "portfolio.pharmacy.description",
      image: "/images/projects/ice-pharmacy.jpg",
      tags: ["Desktop"],
      gradient: "from-[#1877F2] to-[#07223F]",
    },
    {
      nameKey: "portfolio.cafe",
      descriptionKey: "portfolio.cafe.description",
      image: "/images/projects/ice-cafe.jpg",
      tags: ["Desktop"],
      gradient: "from-[#8B4513] to-[#D2691E]",
    },
    {
      nameKey: "portfolio.restraunt",
      descriptionKey: "portfolio.restraunt.description",
      image: "/images/projects/ice-cafe.jpg",
      tags: ["Desktop"],
      gradient: "from-[#8B4513] to-[#D2691E]",
    },
    {
      nameKey: "portfolio.clinic",
      descriptionKey: "portfolio.clinic.description",
      image: "/images/projects/ice-health.jpg",
      tags: ["Web", "Mobile", ],
      gradient: "from-[#00BFA5] to-[#0D3B38]",
    },
    {
      nameKey: "portfolio.auto",
      descriptionKey: "portfolio.auto.description",
      image: "/images/projects/ice-finance.jpg",
      tags: ["Web", "Mobile", ],
      gradient: "from-[#7C4DFF] to-[#1E1A3B]",
    },
    {
      nameKey: "portfolio.academy",
      descriptionKey: "portfolio.academy.description",
      image: "/images/projects/ice-academy.jpg",
      tags: ["Web", "Mobile", ],
      gradient: "from-[#43A047] to-[#0A2E0A]",
    },
    {
      nameKey: "portfolio.logistics",
      descriptionKey: "portfolio.logistics.description",
      image: "/images/projects/ice-logistics.jpg",
      tags: ["Web", "Mobile", ],
      gradient: "from-[#FF6D00] to-[#3B1A00]",
    },
  ]

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

  return (
    <section id="portfolio" className="py-24 bg-[#F5F9FF]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
            {t("portfolio.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("portfolio.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("portfolio.description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.nameKey}
              ref={(el) => { cardsRef.current[index] = el }}
              data-index={index}
              className={`group bg-white rounded-2xl overflow-hidden border border-border hover:border-[#1877F2]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#1877F2]/10 hover:-translate-y-2 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image */}
              <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}
              >
                <Image
                  src={project.image}
                  alt={t(project.nameKey)}
                  fill
                  className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Project Name Overlay */}
                <div className={`absolute bottom-4 ${isRTL ? 'right-4 left-4 text-right' : 'left-4 right-4'}`}>
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {t(project.nameKey)}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t(project.descriptionKey)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#F5F9FF] border border-border text-[#4A6CA3] text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
