import { flex } from "styled-system/patterns";
import { ContentList } from "./_components/ContentList";
import { H1Content } from "./_components/H1Title";

export default function AboutPage() {
  return (
    <div className={flex({ flexDir: "column", gap: "4", paddingBottom: "4" })}>
      <H1Content />
      <ContentList title="이런일에 관심이 많아요.">
        <ContentList.Item>
          미흡한 사용자 경험(UX)를 개선하여 보다 만족스러운 서비스를 제공하는 데
          집중합니다.
        </ContentList.Item>
        <ContentList.Item>
          업무 과정에서 발견한 문제점과 비효율적인 부분을 분석하고 개선하여
          구성원들의 개발 경험(DX)을 향상시키고자 노력합니다.
        </ContentList.Item>
        <ContentList.Item>
          빌드, 배포, CI/CD 프로세스의 효율성을 높이고 속도를 개선하기 위해
          꾸준히 최적화 작업에 임하고 있습니다.
        </ContentList.Item>
        <ContentList.Item>
          개발 관련 토론을 통해 혁신적인 아이디어와 해결책을 도출하는 데 열정을
          쏟고 있습니다.
        </ContentList.Item>
      </ContentList>
      <ContentList title="저는 이런 개발자가 되기 위해 노력하고 있어요.">
        <ContentList.Item>
          자신의 한계를 스스로 제한하지 않는 개발자
        </ContentList.Item>
        <ContentList.Item>
          모든 업무를 신속하고 정확하게 수행하는 개발자
        </ContentList.Item>
        <ContentList.Item>
          복잡한 문제를 간단한 방법으로 해결하는 개발자
        </ContentList.Item>
        <ContentList.Item>
          가장 복잡한 문제를 가장 단순하게 해결하는 개발자
        </ContentList.Item>
        <ContentList.Item>
          조직 내에서 긍정적이고 선한 영향력을 발휘하는 개발자
        </ContentList.Item>
      </ContentList>
      <ContentList title="저는 이런 순간에 동기부여를 얻어요.">
        <ContentList.Item>
          좋은 서비스를 만들어서 사용자로부터 긍정적 평가를 받을 때
        </ContentList.Item>
        <ContentList.Item>
          팀원들이 겪는 불편함을 해소하여, 전반적인 생산성을 향상시킬 때
        </ContentList.Item>
      </ContentList>
    </div>
  );
}
