import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SponsorModalProvider } from "@/components/SponsorModalProvider";

export const metadata = {
  title: "개인정보처리방침 | MAWD",
  description: "팀 마우드 도입 문의 개인정보처리방침",
};

// 문구: 다봉 privacy-notice-and-policy.md §B (대표 확인 2026-11-11).
// TODO(copy): <Blank> 4곳(시행일, 보호책임자 성명, Google 문의처, Vercel 로그 보관 기간)은 대표 답을 받아 채운다.
// 하나라도 남아 있으면 공개하지 않는다. 다 채우면 맨 위 초안 안내도 지운다.
function Blank({ children }: { children: string }) {
  return <mark className="legal-blank">[미정: {children}]</mark>;
}

const CONTACT = "team.mawd@cyz.today";

export default function PrivacyPage() {
  return (
    <SponsorModalProvider>
      <Nav />
      <main className="legal-page">
        <article className="wrap legal-body">
          <p className="legal-draft" role="note">
            초안입니다. 공개 전 확정되지 않은 항목이 남아 있습니다.
          </p>
          <h1>개인정보처리방침</h1>
          <p>
            팀 마우드(이하 &lsquo;마우드&rsquo;)는 도입 문의를 받으면서 개인정보를 처리합니다. 처리 목적, 항목, 보유 기간과
            정보주체의 권리를 아래와 같이 안내합니다.
          </p>
          <p>시행일: <Blank>공개일</Blank></p>

          <h2>1. 개인정보의 처리 목적</h2>
          <p>
            도입 문의에 대한 상담을 위해 개인정보를 처리합니다. 이 목적 외에는 이용하지 않습니다. 처리하는 항목은 이 목적에
            필요한 최소한입니다.
          </p>

          <h2>2. 처리하는 개인정보의 항목</h2>
          <ul>
            <li>필수: 회사·기관·학교명, 담당자 이름, 이메일, 행사 유형</li>
            <li>선택: 연락처, 예상 시기, 예상 참가 인원, 문의 내용</li>
            <li>선택 항목을 입력하지 않아도 문의를 접수할 수 있습니다.</li>
            <li>
              양식 외에 자동으로 수집하는 항목: 사이트가 직접 수집하는 접속 정보는 없습니다. 다만 스팸 방지에 쓰는 Google
              reCAPTCHA가 쿠키와 기기·브라우저 정보를 수집하며(제6, 9절), 호스팅사 Vercel에 IP 주소, 접속 시각, 요청 주소 같은
              기본 요청 기록이 남습니다.
            </li>
          </ul>

          <h2>3. 개인정보의 처리 및 보유 기간</h2>
          <p>
            문의 처리가 완료될 때까지 보유합니다. 처리가 완료되면 지체 없이 파기합니다. 다른 법령에 따라 보존해야 하는 경우에는
            그 기간 동안 따로 분리해 보관합니다. 문의 내용에 적용되는 별도 법령상 보존 의무는 없습니다.
          </p>

          <h2>4. 개인정보의 파기 절차와 방법</h2>
          <ul>
            <li>파기 시점: 문의 처리가 완료된 때 지체 없이 파기합니다.</li>
            <li>파기 방법: 접수된 문의 메일을 메일함에서 삭제하고 휴지통에서도 비우는 방식으로 하여 복구할 수 없게 합니다.</li>
          </ul>

          <h2>5. 개인정보의 제3자 제공</h2>
          <p>마우드는 개인정보를 제3자에게 제공하지 않습니다.</p>

          <h2>6. 개인정보 처리의 위탁과 국외 이전</h2>
          <p>
            도입 문의는 사이트 서버를 거쳐 Google Apps Script로 전달되고 팀 이메일({CONTACT})로 수신됩니다. 스팸 방지에는
            Google reCAPTCHA를 사용합니다. 이 과정의 국외 이전 사항은 다음과 같습니다.
          </p>
          <dl className="legal-table">
            <dt>국외 이전의 법적 근거</dt>
            <dd>법 제28조의8 제1항 제3호(계약 이행을 위한 처리위탁·보관, 처리방침 공개)</dd>
            <dt>이전·위탁받는 자</dt>
            <dd>Google LLC, <Blank>Google 개인정보 문의처</Blank></dd>
            <dt>이전되는 국가</dt>
            <dd>미국 등 Google 서버 소재국</dd>
            <dt>이전 시기와 방법</dt>
            <dd>문의 양식을 제출하는 때, 네트워크를 통한 전송</dd>
            <dt>이전되는 항목</dt>
            <dd>제2절의 수집 항목 전체</dd>
            <dt>이용 목적</dt>
            <dd>문의 전달과 메일 수신, 스팸 방지</dd>
            <dt>보유·이용 기간</dt>
            <dd>문의 처리 완료 후 메일을 삭제할 때까지</dd>
            <dt>거부 방법·절차와 거부의 효과</dt>
            <dd>동의하지 않을 수 있으며, 이 경우 양식으로 문의를 접수할 수 없습니다.</dd>
          </dl>
          <p>
            사이트 서버 운영 사업자(Vercel Inc., 미국)가 요청 기록(IP 주소, 시각, 주소)을 남깁니다. 보관 기간은{" "}
            <Blank>Vercel 로그 보관 기간</Blank>입니다.
          </p>

          <h2>7. 정보주체의 권리와 행사 방법</h2>
          <ul>
            <li>
              정보주체는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요구할 수 있고, 동의를 철회할 수 있습니다.
            </li>
            <li>요구는 {CONTACT}로 보내 주세요. 마우드는 지체 없이 조치하고 결과를 알립니다.</li>
            <li>열람 요구 접수 부서: 팀 마우드 운영 담당({CONTACT})</li>
            <li>이 양식은 만 14세 미만 아동을 대상으로 하지 않습니다.</li>
          </ul>

          <h2>8. 개인정보의 안전성 확보 조치</h2>
          <p>마우드는 개인정보 보호를 위해 다음 조치를 합니다.</p>
          <ul>
            <li>문의 메일함 접근 권한을 필요한 최소 인원으로 제한합니다.</li>
            <li>전송 구간 암호화(HTTPS)를 사용합니다.</li>
            <li>메일 외에 별도 저장소에 보관하지 않습니다.</li>
            <li>메일 계정은 2단계 인증을 사용합니다.</li>
          </ul>

          <h2>9. 자동으로 수집하는 장치(쿠키 등)</h2>
          <p>
            사이트는 쿠키나 접속 기록을 직접 수집하지 않으며 방문 분석 도구도 쓰지 않습니다. 다만 스팸 방지용 Google reCAPTCHA
            위젯이 쿠키와 기기·브라우저 정보를 수집하며 Google의 개인정보처리방침이 적용됩니다. 쿠키 수집을 원하지 않으면
            브라우저 설정에서 쿠키를 차단할 수 있으나, 차단하면 양식이 작동하지 않을 수 있습니다. 호스팅사 Vercel에는 IP 주소,
            접속 시각, 요청 주소 같은 기본 요청 기록이 남으며 보관 기간은 <Blank>Vercel 로그 보관 기간</Blank>입니다.
          </p>

          <h2>10. 개인정보 보호책임자</h2>
          <ul>
            <li>성명: <Blank>대표자 성명</Blank></li>
            <li>직책: 대표</li>
            <li>연락처: {CONTACT}</li>
            <li>개인정보 관련 문의와 불만, 피해 구제 요청은 위 연락처로 접수해 주세요.</li>
          </ul>

          <h2>11. 권익침해 구제 방법</h2>
          <p>개인정보 침해 신고나 상담이 필요하면 아래 기관에 문의할 수 있습니다.</p>
          <ul>
            <li>개인정보분쟁조정위원회</li>
            <li>개인정보침해신고센터(한국인터넷진흥원)</li>
          </ul>

          <h2>12. 처리방침의 변경</h2>
          <p>이 처리방침이 바뀌면 이 페이지에 변경 내용과 시행일을 알립니다.</p>
        </article>
      </main>
      <Footer />
    </SponsorModalProvider>
  );
}
