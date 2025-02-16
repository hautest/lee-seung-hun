import Image from "next/image";
import { flex } from "styled-system/patterns";
import { SelfIntroduction } from "./_components/SelfIntroduction";
import { SocialLinks } from "./_components/SocialLinks";

export default function HomePage() {
  return (
    <div
      className={flex({
        flexDir: "column",
        align: "center",
        justify: "center",
        h: "full",
        gap: "6",
      })}
    >
      <Image width={400} height={400} alt="" src="/assets/profile.jpeg" />
      <SelfIntroduction />
      <SocialLinks />
    </div>
  );
}
