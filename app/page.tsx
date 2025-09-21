import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { SarDemoSection } from "@/components/sar-demo-section"
import { TeamShowcase } from "@/components/team-showcase"
import { TechnicalArchitecture } from "@/components/technical-architecture"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <SarDemoSection />
      <TechnicalArchitecture />
      <TeamShowcase />
      <Footer />
    </main>
  )
}
