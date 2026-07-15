import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { VibeCodingSection } from "@/components/VibeCodingSection";
import { NoBarrierSection } from "@/components/NoBarrierSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ReasonSection } from "@/components/ReasonSection";
import { PrizeSection } from "@/components/PrizeSection";
import { ProgramSection } from "@/components/ProgramSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { FaqSection } from "@/components/FaqSection";
import { ApplyFormSection } from "@/components/ApplyFormSection";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import { SponsorModalProvider } from "@/components/SponsorModalProvider";

export default function Home() {
  return (
    <SponsorModalProvider>
      <Nav />
      <main id="top">
        <Hero />
        <ScrollReveal className="reveal-section">
          <VibeCodingSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <NoBarrierSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <ExperienceSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <ProblemSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <ReasonSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <PrizeSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <ProgramSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <BenefitsSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <FaqSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <ApplyFormSection />
        </ScrollReveal>
      </main>
      <Footer />
      <ScrollTopButton />
    </SponsorModalProvider>
  );
}
