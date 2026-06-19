"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface TestimonialItem {
  id: string
  en_initials: string
  ar_initials: string
  avatarColor: string
  en_quote: string
  ar_quote: string
  en_author: string
  ar_author: string
  en_role: string
  ar_role: string
}

export function Testimonials({ data }: { data: TestimonialItem[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language, isRTL } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 bg-[#F5F9FF]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
            {t("testimonials.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((testimonial, index) => {
            const quote = language === "ar" ? testimonial.ar_quote : testimonial.en_quote
            const author = language === "ar" ? testimonial.ar_author : testimonial.en_author
            const role = language === "ar" ? testimonial.ar_role : testimonial.en_role
            const initials = language === "ar" ? testimonial.ar_initials : testimonial.en_initials
            return (
              <div
                key={testimonial.id}
                className={`bg-white rounded-2xl p-8 border border-border hover:shadow-xl hover:shadow-[#1877F2]/10 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4" dir="ltr">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <div className="text-6xl text-[#1877F2] font-serif leading-none mb-4">&ldquo;</div>

                <p className="text-muted-foreground italic leading-relaxed mb-6">{quote}</p>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#07223F]">{author}</p>
                    <p className="text-sm text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
