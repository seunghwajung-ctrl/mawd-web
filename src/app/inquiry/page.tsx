import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SponsorModalProvider } from "@/components/SponsorModalProvider";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata = {
  title: "도입 문의 | MAWD",
  description: "해커톤·AI 행사 운영 도입 문의",
};

// TODO(copy): 다봉 초안(b2b-zone-copy.md §7). 대표 승인 전 임시 (#9).
export default function InquiryPage() {
  return (
    <SponsorModalProvider>
      <Nav />
      <main className="apply-form-section inquiry-page">
        <div className="wrap">
          <div className="apply-form-head">
            <p className="section-kicker">INQUIRY</p>
            <h1 className="section-title">도입 문의</h1>
            <p className="section-lead">행사 유형과 예상 시기를 알려 주시면 상담에 참고합니다.</p>
          </div>
          <InquiryForm />
        </div>
      </main>
      <Footer />
    </SponsorModalProvider>
  );
}
