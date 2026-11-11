import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SponsorSection } from "@/components/SponsorSection";
import { VibeCodingSection } from "@/components/VibeCodingSection";
import { FaqSection } from "@/components/FaqSection";
import { ApplyFormSection } from "@/components/ApplyFormSection";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import { SponsorModalProvider } from "@/components/SponsorModalProvider";
import { ChallengeStartModal } from "@/components/ChallengeStartModal";
import { HackathonCatalog } from "@/components/HackathonCatalog";
import { FieldPhotosSection } from "@/components/FieldPhotosSection";

// Keep the popup implementation for future campaigns. Change to `true` to show it again.
const SHOW_CHALLENGE_START_MODAL = false;

export default function Home() {
  return (
    <SponsorModalProvider>
      <Nav />
      <main id="top">
        <Hero />
        <ScrollReveal className="reveal-section">
          <HackathonCatalog />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <SponsorSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <VibeCodingSection />
        </ScrollReveal>
        <ScrollReveal className="reveal-section">
          <FieldPhotosSection />
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
      {SHOW_CHALLENGE_START_MODAL && <ChallengeStartModal />}
    </SponsorModalProvider>
  );
}
