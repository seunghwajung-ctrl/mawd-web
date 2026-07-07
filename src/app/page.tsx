import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ChallengeSection } from "@/components/ChallengeSection";
import { ProgramSection } from "@/components/ProgramSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ApplySection } from "@/components/ApplySection";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/components/ModalProvider";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollTopButton } from "@/components/ScrollTopButton";

export default function Home() {
  return (
    <ModalProvider>
      <Nav />
      <main id="top">
        <Hero />
        <ScrollReveal className="reveal-section">
          <ChallengeSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <ProgramSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <BenefitsSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <ApplySection />
        </ScrollReveal>
      </main>
      <Footer />
      <ScrollTopButton />
    </ModalProvider>
  );
}
