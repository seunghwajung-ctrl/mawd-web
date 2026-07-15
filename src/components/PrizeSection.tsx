import Image from "next/image";

export function PrizeSection() {
  return (
    <section id="prize" className="prize-section">
      <div className="wrap prize-layout">
        <div className="prize-copy">
          <p className="section-kicker">PRIZE POOL</p>
          <h2>
            총 상금
            <span>??????</span>
          </h2>
          <p className="section-lead">
            상금은 미리 정해진 숫자가 아닙니다. 참가자가 받은 가상머니가
            그대로 현금으로 환전되는 구조입니다. 더 많은 투자를 받을수록 상금도
            커집니다.
          </p>
          <div className="prize-rule">
            <b>Virtual money → Cash prize</b>
            <p>
              심사위원과 참가자들이 가능성과 실행력에 투자하고, 라운드에서
              받은 가상머니가 최종 상금의 기준이 됩니다.
            </p>
          </div>
        </div>

        <div className="prize-visual" aria-hidden="true">
          <div className="prize-question">??????</div>
          <Image
            src="/trophy-prize.png"
            alt=""
            width={620}
            height={650}
            className="prize-trophy"
            priority={false}
          />
          <div className="prize-glitch prize-glitch-one">WIN?</div>
          <div className="prize-glitch prize-glitch-two">CASH?</div>
        </div>
      </div>
    </section>
  );
}
