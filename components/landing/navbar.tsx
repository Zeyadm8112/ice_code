"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()

  const navLinks = [
    { href: "#services", label: t("nav.services") },
    { href: "#products", label: t("nav.products") },
    { href: "#portfolio", label: t("nav.portfolio") },
    { href: "#process", label: t("nav.process") },
    { href: "#contact", label: t("nav.contact") },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20horizontal-nl32QY5MaYLt4LoSRkqwdCvM02ag70.png"
              alt="ICE CODE"
              width={160}
              height={50}
              className="h-10 w-auto transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-[#1877F2] transition-colors relative group"
              >
                {link.label}
                <span className={`absolute -bottom-1 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 bg-[#1877F2] transition-all group-hover:w-full`} />
              </Link>
            ))}
          </div>

          {/* CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-[#1877F2] transition-colors border border-border rounded-lg hover:border-[#1877F2]/30"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </button>
            
            <Button
              asChild
              className="bg-[#1877F2] hover:bg-[#1560C4] text-white font-semibold px-6 rounded-lg transition-all hover:shadow-lg hover:shadow-[#1877F2]/25"
            >
              <Link href="#contact">{t("nav.getStarted")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-foreground hover:text-[#1877F2] transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>
            
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in-up">
          <div className="px-4 py-6 space-y-4" dir={isRTL ? "rtl" : "ltr"}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-foreground hover:text-[#1877F2] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 w-full text-base font-medium text-foreground hover:text-[#1877F2] transition-colors py-2"
            >
              <Globe size={20} />
              <span>{language === "en" ? "التبديل إلى العربية" : "Switch to English"}</span>
            </button>
            
            <Button
              asChild
              className="w-full bg-[#1877F2] hover:bg-[#1560C4] text-white font-semibold mt-4"
            >
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                {t("nav.getStarted")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
