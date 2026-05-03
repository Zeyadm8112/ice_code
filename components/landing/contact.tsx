"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t, isRTL, language } = useLanguage()

  const contactInfo = [
    {
      icon: Mail,
      labelKey: "contact.info.email",
      value: "contact@icecodeco.com",
    },
    {
      icon: Phone,
      labelKey: "contact.info.phone",
      value: "+20 1120506082",
    },
    {
      icon: MapPin,
      labelKey: "contact.info.location",
      value: language === "ar" ? "السويس, مصر" : "Suez, Egypt",
    },
    {
      icon: Clock,
      labelKey: "contact.info.hours",
      value: t("contact.info.hoursValue"),
    },
  ]

  const services = [
    t("services.web.title"),
    t("services.mobile.title"),
    t("services.ai.title"),
    t("services.uiux.title"),
    t("services.cloud.title"),
    t("services.branding.title"),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", service: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : `opacity-0 ${isRTL ? 'translate-x-8' : '-translate-x-8'}`
            } ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <span className={`inline-block bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}>
              {t("contact.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#07223F] mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t("contact.description")}
            </p>

            {/* Contact Items */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div
                  key={item.labelKey}
                  className={`flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#1877F2]/30 hover:bg-[#F5F9FF] transition-all ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className="w-12 h-12 bg-[#1877F2]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {t(item.labelKey)}
                    </p>
                    <p className="font-semibold text-[#07223F]" dir={item.labelKey === "contact.info.email" ? "ltr" : undefined}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : `opacity-0 ${isRTL ? '-translate-x-8' : 'translate-x-8'}`
            } ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="bg-[#F5F9FF] border border-border rounded-2xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#07223F] mb-2">
                    {language === "ar" ? "تم إرسال الرسالة!" : "Message Sent!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "ar" ? "سنتواصل معك خلال 24 ساعة." : "We'll get back to you within 24 hours."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block"
                      >
                        {t("contact.form.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder={language === "ar" ? "أحمد محمد" : "John Doe"}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-[#07223F] placeholder:text-muted-foreground focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block"
                      >
                        {t("contact.form.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="you@company.com"
                        required
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-[#07223F] placeholder:text-muted-foreground focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 outline-none transition-all text-left"
                      />
                    </div>
                  </div>

                  {/* Service Select */}
                  <div className="space-y-2">
                    <label
                      htmlFor="service"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block"
                    >
                      {language === "ar" ? "الخدمة المطلوبة" : "Service Needed"}
                    </label>
                    <select
                      id="service"
                      value={formState.service}
                      onChange={(e) =>
                        setFormState({ ...formState, service: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-[#07223F] focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 outline-none transition-all"
                    >
                      <option value="">{language === "ar" ? "اختر خدمة..." : "Select a service..."}</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block"
                    >
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-[#07223F] placeholder:text-muted-foreground focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1877F2] hover:bg-[#1560C4] text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#1877F2]/25 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        {t("contact.form.submitting")}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {t("contact.form.submit")}
                        <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
