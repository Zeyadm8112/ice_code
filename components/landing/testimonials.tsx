"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t, isRTL, language } = useLanguage()

  const testimonials = language === "ar" ? [
    {
      quote: "ICE CODE حولت عملياتنا بالكامل. المنصة التي بنوها تتعامل مع ملايين المعاملات يومياً بدون أي توقف. عمل استثنائي.",
      author: "أحمد خليل",
      role: "المدير التقني، PayFast Egypt",
      initials: "أخ",
      color: "bg-[#1877F2]",
    },
    {
      quote: "التطبيق الذي طوروه أُطلق في 3 أشهر وحصل على 50 ألف تحميل في الأسبوع الأول. اهتمام الفريق بالتفاصيل لا مثيل له.",
      author: "سارة محمد",
      role: "المديرة التنفيذية، NutriTrack",
      initials: "سم",
      color: "bg-[#07223F]",
    },
    {
      quote: "من الاكتشاف إلى الإطلاق، كان الفريق محترفاً ومتواصلاً وقدم أكثر من التوقعات. انخفضت تكاليف اللوجستيات لدينا 35%.",
      author: "عمر رشيد",
      role: "مدير العمليات، SwiftLog",
      initials: "عر",
      color: "bg-[#00897B]",
    },
  ] : [
    {
      quote: "ICE CODE transformed our operations. The platform they built handles millions of transactions daily with zero downtime. Exceptional work.",
      author: "Ahmed Khalil",
      role: "CTO, PayFast Egypt",
      initials: "AK",
      color: "bg-[#1877F2]",
    },
    {
      quote: "The mobile app they developed launched in 3 months and got 50K downloads in the first week. The team's attention to detail is unmatched.",
      author: "Sara Mohamed",
      role: "CEO, NutriTrack",
      initials: "SM",
      color: "bg-[#07223F]",
    },
    {
      quote: "From discovery to launch, the team was professional, communicative, and delivered beyond expectations. Our logistics costs dropped 35%.",
      author: "Omar Rashid",
      role: "Operations Director, SwiftLog",
      initials: "OR",
      color: "bg-[#00897B]",
    },
  ]

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
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
            {t("testimonials.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07223F] mb-4">
            {t("testimonials.title")}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`bg-white rounded-2xl p-8 border border-border hover:shadow-xl hover:shadow-[#1877F2]/10 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" dir="ltr">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote Mark */}
              <div className="text-6xl text-[#1877F2] font-serif leading-none mb-4">
                &ldquo;
              </div>

              {/* Quote */}
              <p className="text-muted-foreground italic leading-relaxed mb-6">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-[#07223F]">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
