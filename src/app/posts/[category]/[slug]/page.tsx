import PostBody from "@/components/post/PostBody";
import PostFooter from "@/components/post/PostFooter";
import PostHeader from "@/components/post/PostHeader";
import { getPostDetail } from "@/functions/post";

const PostDetail = async ({
  params: { category, slug },
}: {
  params: { category: string; slug: string };
}) => {
  const post = await getPostDetail({
    category: category,
    slug: slug,
  });

  return (
    <main className="mx-auto flex max-w-[64rem] flex-col px-[2rem]">
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter />
    </main>
  );
};

export default PostDetail;
