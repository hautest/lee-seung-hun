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
          w: "full",
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
        이라는 애니메이션 OTT 서비스에서 웹/앱을 개발하고 있습니다. 토스의
        박서진님 같은 개발자가 되고 싶습니다.
      </Text>
    </>
  );
}
