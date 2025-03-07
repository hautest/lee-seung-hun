import { BlogContentRender } from "@/app/blog/[id]/_components/BlogContentRender";
import { getBlog } from "@/lib/notion/getBlog";
import { getBlogList } from "@/lib/notion/getBlogList";
import { getPrevNextBlogs } from "@/lib/notion/getPrevNextBlogs";
import { PrevNextBlogs } from "./_components/PrevNextBlogs";
import { flex } from "styled-system/patterns";

export async function generateStaticParams() {
  const blogList = await getBlogList();

  return blogList.map((blog, index) => ({
    id: String(blog?.id),
    prevBlogId: index > 0 ? String(blogList[index - 1]?.id) : undefined,
    nextBlogId:
      index < blogList.length - 1 ? String(blogList[index + 1]?.id) : undefined,
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
  const { prevBlog, nextBlog } = await getPrevNextBlogs(id);

  return (
    <div className={flex({ flexDirection: "column" })}>
      <BlogContentRender content={content} />
      <PrevNextBlogs prevBlog={prevBlog} nextBlog={nextBlog} />
    </div>
  );
}
