import { css } from "styled-system/css";

export async function Resume() {
  return (
    <object
      data="http://docs.google.com/gview?url=https://lee-seung-hun.com/이승훈_이력서.pdf&embedded=true"
      type="application/pdf"
      className={css({
        w: "full",
        h: "5800",
        mobileDown: {
          h: "auto",
        },
      })}
    ></object>
  );
}
