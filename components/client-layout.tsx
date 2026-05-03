"use client"

import { ReactNode } from "react"
import { LanguageProvider, useLanguage } from "@/lib/language-context"

function LayoutWrapper({ children }: { children: ReactNode }) {
  const { isRTL, language } = useLanguage()
  
  return (
    <div dir={isRTL ? "rtl" : "ltr"} lang={language} className="min-h-screen">
      {children}
    </div>
  )
}

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </LanguageProvider>
  )
}
