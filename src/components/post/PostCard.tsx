import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import TimeDifference from "./common/TimeDifference";

const PostCard = async ({ post }: { post: TPost }) => {
  const { url, title = "", introduction, thumbnail, createdAt } = post;

  return (
    <Link href={url} className="group">
      <div className="relative flex justify-between gap-x-[1.6rem] overflow-clip transition-all duration-200 max-postCard:mx-[1.6rem] max-postCard:flex-col-reverse max-postCard:gap-y-[1.6rem] max-postCard:rounded-[0.4rem] max-postCard:border max-postCard:border-solid max-postCard:border-[var(--foreground)] max-postCard:shadow-lg max-postCard:group-active:scale-95 postCard:px-[1.6rem] postCard:py-[2.4rem] postCard:will-change-transform postCard:group-hover:translate-x-[0.8rem] postCard:group-hover:bg-[var(--foreground)] postCard:group-hover:text-[var(--background)]">
        <div className="flex flex-1 flex-col justify-between max-postCard:px-[1.6rem] max-postCard:pb-[1.6rem]">
          <div className="flex flex-col gap-y-[1.2rem]">
            <h2 className="text-[2.2rem] font-bold">{title}</h2>

            {introduction && (
              <p className="line-clamp-3 text-[1.2rem]">{introduction}</p>
            )}
          </div>

          <TimeDifference createdAt={createdAt} />
        </div>

        {thumbnail && (
          <div className="relative aspect-[1.618] overflow-clip max-postCard:h-[18rem] postCard:h-[12rem]">
            <Image
              src={thumbnail}
              alt="post-card-thumbnail"
              sizes="(max-width: 640px) 80vw, (max-width: 1200px) 30vw, 300px"
              fill
              style={{
                objectFit: "cover",
              }}
              placeholder="blur"
              blurDataURL={rgbDataURL(233, 233, 233)}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostCard;
