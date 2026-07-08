import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Showcase } from "@/components/showcase"
import { Stats } from "@/components/stats"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main id="top" className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <Stats />
      <Testimonials />
      <Footer />
    </main>
  )
}
