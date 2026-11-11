import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SponsorModalProvider } from "@/components/SponsorModalProvider";

export const metadata = {
  title: "개인정보처리방침 | MAWD",
  description: "팀 마우드 도입 문의 개인정보처리방침",
};

// TODO(copy): 다봉 초안(privacy-notice-and-policy.md §B). 법률 검토·대표 승인 전 임시 (#9).
// <Blank>는 대표 답이 필요한 빈칸이다. 공개 전에 하나도 남으면 안 된다.
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
            초안입니다. 법률 검토와 대표 승인 전이며 내용이 바뀔 수 있습니다.
          </p>
          <h1>개인정보처리방침</h1>
          <p>
            팀 마우드(이하 &lsquo;마우드&rsquo;)는 도입 문의를 받으면서 개인정보를 처리합니다. 처리 목적, 항목, 보유 기간과
            정보주체의 권리를 아래와 같이 안내합니다.
          </p>
          <p>시행일: <Blank>시행일</Blank></p>

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
            <li>양식 외에 자동으로 수집하는 항목: <Blank>자동 수집 여부와 항목, 개발자 확인</Blank></li>
          </ul>

          <h2>3. 개인정보의 처리 및 보유 기간</h2>
          <p>
            문의 처리가 완료될 때까지 보유합니다. 처리가 완료되면 지체 없이 파기합니다. 다른 법령에 따라 보존해야 하는 경우에는
            그 기간 동안 따로 분리해 보관합니다. <Blank>보존 의무 해당 여부, 대표 확인</Blank>
          </p>

          <h2>4. 개인정보의 파기 절차와 방법</h2>
          <ul>
            <li>파기 시점: 문의 처리가 완료된 때 지체 없이 파기합니다.</li>
            <li>파기 방법: 접수된 문의 메일을 <Blank>삭제 방식, 대표 확인</Blank>하여 복구할 수 없게 합니다.</li>
          </ul>

          <h2>5. 개인정보의 제3자 제공</h2>
          <p>마우드는 개인정보를 제3자에게 제공하지 않습니다. <Blank>사실 여부, 대표 확인</Blank></p>

          <h2>6. 개인정보 처리의 위탁과 국외 이전</h2>
          <p>
            도입 문의는 사이트 서버를 거쳐 Google Apps Script로 전달되고 팀 이메일({CONTACT})로 수신됩니다. 스팸 방지에는
            Google reCAPTCHA를 사용합니다.
          </p>
          <p><Blank>국외 이전·위탁 해당 여부와 세부 항목, 전문가 확인</Blank></p>

          <h2>7. 정보주체의 권리와 행사 방법</h2>
          <ul>
            <li>
              정보주체는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요구할 수 있고, 동의를 철회할 수 있습니다.
            </li>
            <li>요구는 {CONTACT}로 보내 주세요. 마우드는 지체 없이 조치하고 결과를 알립니다.</li>
            <li>열람 요구 접수 부서: <Blank>담당 부서 또는 담당자</Blank></li>
          </ul>

          <h2>8. 개인정보의 안전성 확보 조치</h2>
          <ul>
            <li>문의 메일함 접근 권한을 필요한 최소 인원으로 제한합니다. <Blank>인원과 관리 방식</Blank></li>
            <li>전송 구간 암호화(HTTPS)를 사용합니다.</li>
            <li>메일 외에 별도 저장소에 보관하지 않습니다.</li>
            <li>계정 보안 설정: <Blank>2단계 인증 등, 대표 확인</Blank></li>
          </ul>

          <h2>9. 자동으로 수집하는 장치(쿠키 등)</h2>
          <p><Blank>쿠키·접속 기록 사용 여부와 reCAPTCHA 수집 정보, 개발자 확인</Blank></p>

          <h2>10. 개인정보 보호책임자</h2>
          <ul>
            <li>성명: <Blank>성명</Blank></li>
            <li>직책: <Blank>직책</Blank></li>
            <li>연락처: {CONTACT}</li>
            <li>개인정보 관련 문의와 불만, 피해 구제 요청은 위 연락처로 접수해 주세요.</li>
          </ul>

          <h2>11. 권익침해 구제 방법</h2>
          <p>개인정보 침해 신고나 상담이 필요하면 아래 기관에 문의할 수 있습니다. <Blank>기관 연락처, 공개 전 확인</Blank></p>
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
