"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

const technologies = [
  "React",
  "Next.js",
  "Flutter",
  "React Native",
  "Node.js",
  "Python",
  "Django",
  "FastAPI",
  "TypeScript",
  "Go",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "GCP",
  "Docker",
  "Kubernetes",
  "TensorFlow",
  "PyTorch",
  "OpenAI API",
  "Firebase",
  "GraphQL",
]

export function TechStack() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t, isRTL } = useLanguage()

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

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#07223F] relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 snow-pattern" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-12">
          <span className={`inline-block bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
            {t("tech.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("tech.title")}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            {t("tech.description")}
          </p>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-3" dir="ltr">
          {technologies.map((tech, index) => (
            <div
              key={tech}
              className={`flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 transition-all duration-500 hover:bg-[#1877F2]/20 hover:border-[#1877F2] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <span className="w-2 h-2 bg-[#1877F2] rounded-full" />
              <span className="text-white/85 font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
