import { BlogContentRender } from "@/app/blog/[id]/_components/BlogContentRender";
import { getBlog } from "@/lib/notion/getBlog";
import { getBlogList } from "@/lib/notion/getBlogList";

export async function generateStaticParams() {
  const blogList = await getBlogList();

  return blogList.map((blog) => ({
    id: blog?.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { metadata } = await getBlog(id);

  return {
    title: `${metadata.title} - 프론트엔드 개발자 이승훈 블로그`,
    description: metadata.description,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { content } = await getBlog(id);

  return <BlogContentRender content={content} />;
}
