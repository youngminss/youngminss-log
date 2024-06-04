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
    <div className="flex flex-col">
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter />
    </div>
  );
};

export default PostDetail;
