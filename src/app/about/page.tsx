import { flex } from "styled-system/patterns";
import { ContentList } from "./_components/ContentList";
import { H1Content } from "./_components/H1Title";

export default function AboutPage() {
  return (
    <div className={flex({ flexDir: "column", gap: "4" })}>
      <H1Content />
      <ContentList title="이런일에 관심이 많아요.">
        <ContentList.Item>
          일을 하며 직접 개선할 점을 찾고 개선하여 구성원들의 DX를 향상시키는
          것을 좋아해요.
        </ContentList.Item>
        <ContentList.Item>
          빌드, 배포, ci/cd 속도 개선하는 것도 관심이 많아요.
        </ContentList.Item>
        <ContentList.Item>
          현재 조직에서 갖고 있는 문제점을 찾아내고 해결하는 것을 좋아해요.
        </ContentList.Item>
        <ContentList.Item>
          개발에 관한 주제로 토론을 하는 것도 좋아해요.
        </ContentList.Item>
      </ContentList>
      <ContentList title="저는 이런 개발자가 되기 위해 노력하고 있어요.">
        <ContentList.Item>자신의 한계를 정하지 않는 개발자</ContentList.Item>
        <ContentList.Item>
          모든 일을 빠르고 정확하게 처리하는 개발자
        </ContentList.Item>
        <ContentList.Item>
          복잡한 문제를 간단한 방법으로 해결하는 개발자
        </ContentList.Item>
        <ContentList.Item>조직에 선한 영향력을 끼치는 개발자</ContentList.Item>
      </ContentList>
    </div>
  );
}
