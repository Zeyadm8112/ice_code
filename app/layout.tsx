import type { Metadata } from 'next'
import { Inter, Audiowide, JetBrains_Mono, Noto_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClientLayout } from '@/components/client-layout'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const audiowide = Audiowide({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-audiowide'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
})

const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"],
  variable: '--font-arabic'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://icecodeco.com'),
  title: 'ICE CODE — Freeze Your Worries, Let Us Handle It',
  description: 'ICE CODE delivers cutting-edge software solutions — from mobile apps and web platforms to AI-powered products — built to scale with your ambitions.',
  keywords: ['software development', 'mobile apps', 'web development', 'AI', 'branding', 'ICE CODE', 'Egypt', 'Suez'],
  authors: [{ name: 'ICE CODE' }],
  creator: 'ICE CODE',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://icecodeco.com' },
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-cwL3OTiGeDu81kYXaDXZaeQ3UuoyxB.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-cwL3OTiGeDu81kYXaDXZaeQ3UuoyxB.png',
  },
  openGraph: {
    title: 'ICE CODE — Freeze Your Worries, Let Us Handle It',
    description: 'Cutting-edge software solutions — mobile apps, web platforms, AI products, and branding services.',
    type: 'website',
    url: 'https://icecodeco.com',
    siteName: 'ICE CODE',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICE CODE — Freeze Your Worries, Let Us Handle It',
    description: 'Cutting-edge software solutions — mobile apps, web platforms, AI products, and branding services.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} ${audiowide.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable} font-sans antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
