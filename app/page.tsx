import { PageLayout } from "@/components/layout/PageLayout"
import { HeroSection } from "@/components/sections/HeroSection"
import { ServicesSection } from "@/components/sections/ServicesSection"

export const metadata = {
  title: "Find an Advisor - Connect with Financial Experts",
  description: "Connect with top mortgage, insurance, and financial advisors across the UK. Get expert guidance for your financial decisions.",
}

export default function Home() {
  return (
    <PageLayout>
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
      </main>
    </PageLayout>
  )
}