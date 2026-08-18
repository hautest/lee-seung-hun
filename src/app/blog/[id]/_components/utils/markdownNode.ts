/** react-markdown이 컴포넌트에 넘기는 hast 노드에서 필요한 부분만 추린 타입. */
export type MarkdownNode = {
  type?: string;
  value?: string;
  tagName?: string;
  properties?: { class?: unknown; className?: unknown };
  children?: MarkdownNode[];
};

const LANGUAGE_CLASS_PREFIX = "language-";

function toPlainText(node?: MarkdownNode): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";

  return (node.children ?? []).map(toPlainText).join("");
}

// shiki는 hast가 정규화한 className이 아니라 raw `class` 속성으로 클래스를 붙인다.
function getClassNames(node?: MarkdownNode) {
  const { class: rawClass, className } = node?.properties ?? {};

  return [rawClass, className].flatMap((value) =>
    Array.isArray(value) ? value.map(String) : [],
  );
}

export function containsImage(node?: MarkdownNode) {
  return node?.children?.some(
    (child) => child.type === "element" && child.tagName === "img",
  );
}

/**
 * shiki가 하이라이팅해 둔 <pre> 노드에서 원문과 언어를 읽는다.
 * 언어 클래스는 <pre>가 아니라 안쪽 <code>에 붙는다.
 */
export function readCodeBlock(node?: MarkdownNode) {
  const language = getClassNames(node?.children?.[0])
    .find((name) => name.startsWith(LANGUAGE_CLASS_PREFIX))
    ?.slice(LANGUAGE_CLASS_PREFIX.length);

  return { code: toPlainText(node).replace(/\n+$/, ""), language };
}
