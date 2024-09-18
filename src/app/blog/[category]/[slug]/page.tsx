import PostBody from "@/components/post/PostBody";
import PostFooter from "@/components/post/PostFooter";
import PostHeader from "@/components/post/PostHeader";
import PostToC from "@/components/post/PostToC";
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
    <main>
      <div className="mx-auto flex max-w-[64rem] flex-col px-[1.6rem]">
        <PostHeader post={post} />
        <PostBody post={post} />
        <PostFooter />
      </div>

      <PostToC />
    </main>
  );
};

export default PostDetail;
