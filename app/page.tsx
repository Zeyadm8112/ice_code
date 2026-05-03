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
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Products />
      <Portfolio />
      <Process />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
