import Image from "next/image";
import { css } from "styled-system/css";
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
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        gap: "6",
        w: "full",
        mobileDown: {
          position: "initial",
          transform: "translate(0, 0)",
        },
      })}
    >
      <Image
        width={400}
        height={400}
        alt=""
        src="/assets/profile.jpeg"
        className={css({
          mobileDown: {
            w: "auto",
            h: "auto",
            maxW: "full",
            maxH:
              "calc(100dvh - 18.0625rem - env(safe-area-inset-bottom))",
          },
        })}
      />
      <SelfIntroduction />
      <SocialLinks />
    </div>
  );
}
