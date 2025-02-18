import { Text } from "@/lib/ui/Text";
import { flex } from "styled-system/patterns";

const LAFTEL_COLOR = "#816BFF";
const LAFTEL_URL = "https://laftel.net";

export default function AboutPage() {
  return (
    <div className={flex({ flexDir: "column", gap: "4" })}>
      <Text
        size="xl"
        as="h1"
        css={{ display: "inline", w: "full", whiteSpace: "nowrap" }}
      >
        안녕하세요 프론트엔드 개발자{" "}
        <Text css={{ w: "fit", display: "inline" }} variant="heading" as="b">
          이승훈
        </Text>
        입니다.
      </Text>
      <Text css={{ display: "inline" }}>
        현재{" "}
        <Text
          as="a"
          //a태그로 해도 href에서 타입에러 발생해서 이렇게 처리
          {...{
            href: LAFTEL_URL,
            target: "_blank",
            rel: "noopener noreferrer",
          }}
          css={{
            display: "inline",
            color: LAFTEL_COLOR,
            _hover: {
              fontWeight: "bold",
            },
            _active: {
              fontWeight: "bold",
            },
          }}
        >
          라프텔
        </Text>
        이라는 애니메이션 OTT서비스에서 웹/앱을 개발하고 있습니다.{" "}
      </Text>
    </div>
  );
}
