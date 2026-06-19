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

  return (
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
  )
}
