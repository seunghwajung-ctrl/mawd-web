import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ChallengeSection } from "@/components/ChallengeSection";
import { ProgramSection } from "@/components/ProgramSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ApplySection } from "@/components/ApplySection";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/components/ModalProvider";

export default function Home() {
  return (
    <ModalProvider>
      <Nav />
      <main id="top">
        <Hero />
        <ChallengeSection />
        <ProgramSection />
        <BenefitsSection />
        <ApplySection />
      </main>
      <Footer />
    </ModalProvider>
  );
}
