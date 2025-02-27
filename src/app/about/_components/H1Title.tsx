import { Text } from "@/lib/ui/Text";

const LAFTEL_COLOR = "#816BFF";
const LAFTEL_URL = "https://laftel.net";

export function H1Content() {
  return (
    <>
      <Text
        size="xl"
        as="h1"
        css={{
          display: "inline",
          whiteSpace: "nowrap",
          fontWeight: "medium",
        }}
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
        에서 애니메이션 OTT 서비스의 웹과 앱 개발을 담당하며, 토스의 박서진님
        같은 개발자가 되기 위해 꾸준히 노력하고 있습니다.
      </Text>
    </>
  );
}
