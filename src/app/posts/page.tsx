import PostCard from "@/components/post/PostCard";
import { parseDate } from "@/functions/date";
import { getPostList } from "@/functions/post";

const Posts = async ({ category }: { category?: string }) => {
  const postList = (await getPostList(category)).sort((a, b) =>
    parseDate(a.createdAt).getTime() - parseDate(b.createdAt).getTime() < 0
      ? 1
      : -1,
  );

  return (
    <main className="mx-auto min-h-[calc(100vh_-_12rem)] max-w-[64rem] px-[2rem]">
      <p className="text-[3.2rem] font-bold">Post</p>

      <div className="flex flex-col pt-[1.6rem]">
        {postList.map((post) => {
          const { category, slug } = post;
          return <PostCard key={`${category}_${slug}_postCard`} post={post} />;
        })}
      </div>
    </main>
  );
};

export default Posts;
