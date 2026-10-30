import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { DashboardPreview } from '@/components/landing/dashboard-preview'
import { TrustStrip } from '@/components/landing/trust-strip'
import { BrandScanner } from '@/components/landing/brand-scanner'
import { ProblemSection } from '@/components/landing/problem-section'
import { FeatureGrid } from '@/components/landing/feature-grid'
import { ProductShowcase } from '@/components/landing/product-showcase'
import { HowItWorks } from '@/components/landing/how-it-works'
import { RegionalSection } from '@/components/landing/regional-section'
import { IndustriesSection } from '@/components/landing/industries-section'
import { AudienceSection } from '@/components/landing/audience-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { FinalCta } from '@/components/landing/final-cta'
import { Footer } from '@/components/landing/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DashboardPreview />
        <TrustStrip />
        <BrandScanner />
        <ProblemSection />
        <FeatureGrid />
        <ProductShowcase />
        <HowItWorks />
        <RegionalSection />
        <IndustriesSection />
        <AudienceSection />
        <PricingSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
