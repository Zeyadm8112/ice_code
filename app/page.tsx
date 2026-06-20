import { getData } from "@/lib/data"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { Services } from "@/components/landing/services"
import { Products } from "@/components/landing/products"
import { Portfolio } from "@/components/landing/portfolio"
import { Process } from "@/components/landing/process"
import { TechStack } from "@/components/landing/tech-stack"
import { Testimonials } from "@/components/landing/testimonials"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  const heroData = getData("hero")
  const statsData = getData("stats")
  const servicesData = getData("services")
  const productsData = getData("products")
  const portfolioData = getData("portfolio")
  const processData = getData("process")
  const techStackData = getData("tech-stack")
  const testimonialsData = getData("testimonials")
  const contactData = getData("contact")
  const socialData = getData("social")

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ICE CODE',
    url: 'https://icecodeco.com',
    email: 'contact@icecodeco.com',
    telephone: '+201120506082',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Suez',
      addressCountry: 'EG',
    },
    description: 'ICE CODE is a full-service software development agency delivering custom mobile apps, web platforms, AI solutions, and branding services.',
    knowsAbout: ['Web Development', 'Mobile App Development', 'UI/UX Design', 'AI & Machine Learning', 'Cloud Infrastructure', 'Branding'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background">
      <Navbar />
      <Hero data={heroData} />
      <Stats data={statsData} />
      <Services data={servicesData} />
      <Products data={productsData} />
      <Portfolio data={portfolioData} />
      <Process data={processData} />
      <TechStack data={techStackData} />
      <Testimonials data={testimonialsData} />
      <Contact data={contactData} />
      <Footer socialLinks={socialData} />
    </main>
    </>
  )
}
