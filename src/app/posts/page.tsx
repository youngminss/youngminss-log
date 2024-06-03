import PostCard from "@/components/post/PostCard";
import { getPostList } from "@/functions/post";

const Posts = async ({ category }: { category?: string }) => {
  const postList = await getPostList(category);

  return (
    <main>
      <div className="grid grid-cols-2">
        {postList.map((post) => {
          const { category, slug } = post;
          return <PostCard key={`${category}_${slug}_postCard`} post={post} />;
        })}
      </div>
    </main>
  );
};

export default Posts;
