import Image from "next/image";
import Link from "next/link";

const photos = [
  { src: "/gallery/mawd-field-01.jpg", alt: "MAWD Challenge 현장 발표" },
  { src: "/gallery/mawd-field-02.jpg", alt: "MAWD Challenge 참가자 협업 현장" },
  { src: "/gallery/mawd-field-03.jpg", alt: "MAWD Challenge 행사 현장" },
];

export function FieldPhotosSection() {
  return (
    <section id="gallery" className="field-photos-section">
      <div className="wrap">
        <p className="section-kicker">FIELD NOTES</p>
        <h2>아이디어가 움직이기 시작한 현장</h2>
        <div className="field-photos">
          {photos.map((photo, index) => (
            <figure key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? "(max-width: 760px) 100vw, 66vw" : "(max-width: 760px) 100vw, 33vw"} />
            </figure>
          ))}
        </div>
        <Link className="field-photos-link" href="/gallery">현장 사진 더 보기 ↗</Link>
      </div>
    </section>
  );
}
