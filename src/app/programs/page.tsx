import { redirect } from "next/navigation";

export const metadata = {
  title: "프로그램 | MAWD Challenge",
  description: "지금 만들고 싶은 MAWD Challenge를 고르고 바로 참가하세요.",
};

export default function ProgramsPage() {
  // The program cards belong in the original landing-page journey, not in a
  // stripped-down standalone page. Keep old links working by returning them
  // to that section of the complete site.
  redirect("/#hackathons");
}
