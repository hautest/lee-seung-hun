import { getBlogList } from "@/lib/notion/getBlogList";

export async function generateStaticParams() {
  const blogList = await getBlogList();

  return blogList.map((blog) => ({
    id: blog?.id,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>BlogDetail {id}</div>;
}
