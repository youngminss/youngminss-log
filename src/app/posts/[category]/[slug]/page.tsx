import PostBody from "@/components/post/PostBody";
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
    <div>
      <PostBody post={post} />
    </div>
  );
};

export default PostDetail;
