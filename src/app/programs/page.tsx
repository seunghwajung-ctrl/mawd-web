import { Footer } from "@/components/Footer";
import { HackathonCatalog } from "@/components/HackathonCatalog";
import { Nav } from "@/components/Nav";
import { SponsorModalProvider } from "@/components/SponsorModalProvider";

export const metadata = {
  title: "프로그램 | MAWD Challenge",
  description: "지금 만들고 싶은 MAWD Challenge를 고르고 바로 참가하세요.",
};

export default function ProgramsPage() {
  return (
    <SponsorModalProvider>
      <Nav />
      <main id="top">
        <HackathonCatalog />
      </main>
      <Footer />
    </SponsorModalProvider>
  );
}
