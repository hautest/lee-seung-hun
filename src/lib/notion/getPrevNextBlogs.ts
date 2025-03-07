import { getBlogList } from "./getBlogList";

export async function getPrevNextBlogs(id: string) {
  const blogList = await getBlogList();
  const currentIndex = blogList.findIndex((blog) => blog?.id === id);

  if (currentIndex === -1) return { prevBlog: null, nextBlog: null };

  return {
    prevBlog:
      currentIndex < blogList.length - 1 ? blogList[currentIndex + 1] : null,
    nextBlog: currentIndex > 0 ? blogList[currentIndex - 1] : null,
  };
}
