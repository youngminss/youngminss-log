import PostCard from "@/components/post/PostCard";
import Avatars from "@/components/ui/Avatars";
import { parseDate } from "@/functions/date";
import { getPostList } from "@/functions/post";
import { AUTHOR_NAME, GITHUB_PROFILE, PROFILE_BIO } from "@/utils/const";

const Posts = async () => {
  const postList = (await getPostList()).sort((a, b) =>
    parseDate(a.createdAt).getTime() - parseDate(b.createdAt).getTime() < 0
      ? 1
      : -1,
  );

  return (
    <main className="mx-auto min-h-[calc(100vh_-_18.9rem)] max-w-[64rem]">
      <div className="mx-[1.6rem] mb-[1.6rem] flex items-center gap-x-[1.6rem] border-b-[0.15rem] border-solid border-[var(--foreground)] py-[1.6rem] pc:mb-[2.4rem] pc:py-[2.4rem]">
        <Avatars
          href={GITHUB_PROFILE}
          target="_blank"
          className="h-[4.8rem] w-[4.8rem] pc:h-[6.4rem] pc:w-[6.4rem]"
        />
        <div className="flx flex-col gap-y-[0.4rem]">
          <span className="font-pretendard text-[1.6rem] font-semibold">
            {AUTHOR_NAME}
          </span>
          <p className="font-pretendard text-[1.2rem]">{PROFILE_BIO}</p>
        </div>
      </div>

      <div className="flex flex-col max-postCard:gap-y-[1.6rem]">
        {postList.map((post) => {
          const { category, slug } = post;
          return <PostCard key={`${category}_${slug}_postCard`} post={post} />;
        })}
      </div>
    </main>
  );
};

export default Posts;