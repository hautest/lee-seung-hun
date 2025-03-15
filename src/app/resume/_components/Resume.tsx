import { css } from "styled-system/css";

export async function Resume() {
  return (
    <iframe
      src="https://docs.google.com/gview?url=https://lee-seung-hun.com/이승훈_이력서.pdf&embedded=true"
      className={css({
        w: "full",
        h: "5800",
        mobileDown: {
          h: "2500",
        },
      })}
    ></iframe>
  );
}
