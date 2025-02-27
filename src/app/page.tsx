import Image from "next/image";
import { flex } from "styled-system/patterns";
import { SelfIntroduction } from "./_components/SelfIntroduction";
import { SocialLinks } from "./_components/SocialLinks";
import { Metadata } from "next";

export const metadata: Metadata = {};

export default function HomePage() {
  return (
    <div
      className={flex({
        flexDir: "column",
        align: "center",
        justify: "center",
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        gap: "6",
      })}
    >
      <Image width={400} height={400} alt="" src="/assets/profile.jpeg" />
      <SelfIntroduction />
      <SocialLinks />
    </div>
  );
}
