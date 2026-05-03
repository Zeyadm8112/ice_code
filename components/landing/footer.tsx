"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter, Instagram, Facebook, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
]

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { t, isRTL, language } = useLanguage()

  const footerLinks = {
    services: [
      { label: t("services.mobile.title"), href: "#services" },
      { label: t("services.web.title"), href: "#services" },
      { label: t("services.ai.title"), href: "#services" },
      { label: t("services.cloud.title"), href: "#services" },
      { label: t("services.branding.title"), href: "#services" },
    ],
    company: [
      { label: t("footer.about"), href: "#" },
      { label: t("nav.portfolio"), href: "#portfolio" },
      { label: t("nav.process"), href: "#process" },
      { label: t("footer.careers"), href: "#" },
      { label: t("footer.blog"), href: "#" },
    ],
    support: [
      { label: t("nav.contact"), href: "#contact" },
      { label: "FAQ", href: "#" },
      { label: t("footer.privacy"), href: "#" },
      { label: t("footer.terms"), href: "#" },
    ],
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <footer className="bg-[#07223F] text-white pt-16 pb-8 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 snow-pattern" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20horizontal-nl32QY5MaYLt4LoSRkqwdCvM02ag70.png"
                alt="ICE CODE"
                width={160}
                height={50}
                className="h-10 w-auto brightness-0 invert mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                {t("footer.slogan")}. {t("footer.description")}
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className={`font-bold text-sm uppercase mb-4 ${isRTL ? 'tracking-normal' : 'tracking-wider'}`}>
                {t("footer.services")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[#1877F2] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className={`font-bold text-sm uppercase mb-4 ${isRTL ? 'tracking-normal' : 'tracking-wider'}`}>
                {t("footer.company")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[#1877F2] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className={`font-bold text-sm uppercase mb-4 ${isRTL ? 'tracking-normal' : 'tracking-wider'}`}>
                {language === "ar" ? "الدعم" : "Support"}
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[#1877F2] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} ICE CODE. {t("footer.rights")}
            </p>
            <p className="text-white/40 text-sm">
              {language === "ar" ? "صنع بـ ❄️ في القاهرة، مصر" : "Made with ❄️ in Cairo, Egypt"}
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-50 w-12 h-12 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#1560C4] hover:shadow-xl ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  )
}
