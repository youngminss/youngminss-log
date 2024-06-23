import { timeDifference } from "@/functions/date";
import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

const PostCard = async ({ post }: { post: TPost }) => {
  const { url, title = "", introduction, thumbnail, createdAt } = post;

  return (
    <Link href={url}>
      <div className="max-postCard:flex-col-reverse max-postCard:gap-y-[1.6rem] group flex justify-between gap-x-[1.6rem] py-[2.4rem] transition-[background-color] duration-300">
        <div className="postCard:flex-[2_1_0] flex flex-col justify-between">
          <div className="flex flex-col gap-y-[1.2rem]">
            <h2 className="text-[2.4rem] font-bold">{title}</h2>

            {introduction && (
              <p className="line-clamp-3 text-[1.2rem]">{introduction}</p>
            )}
          </div>

          <span className="pt-[1.2rem]">{timeDifference(createdAt)}</span>
        </div>

        {thumbnail && (
          <div className="postCard:flex-[1_1_0] relative aspect-[1.618] h-[12rem] overflow-clip">
            <Image
              className="transition-all duration-300 group-hover:scale-110"
              src={thumbnail}
              alt="post-card-thumbnail"
              layout="fill"
              objectFit="cover"
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
