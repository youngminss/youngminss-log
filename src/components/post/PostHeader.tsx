import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import { AUTHOR_NAME } from "@/utils/const";
import Image from "next/image";
import Avatars from "../ui/Avatars";

const PostHeader = ({ post }: { post: TPost }) => {
  const { title, introduction, readingMinutes, thumbnail, createdAt } = post;

  const createdDateOnly = createdAt.split(" ")[0];

  return (
    <div className="flex flex-col">
      <h2 className="font-pretendard text-[3.2rem] font-bold">{title}</h2>

      <div className="flex items-end justify-between py-[1.6rem]">
        <div className="flex items-center gap-x-[0.8rem]">
          <Avatars className="w-[4.8rem]" />

          <div className="flex flex-col items-start gap-y-[0.2rem]">
            <span className="font-pretendard text-[1.2rem] font-semibold">
              {AUTHOR_NAME}
            </span>
            <span>{createdDateOnly}</span>
          </div>
        </div>

        <div>
          Reading Time :{" "}
          <span className="font-pretendard text-[1.1rem] font-semibold">
            {readingMinutes} min
          </span>
        </div>
      </div>

      {thumbnail && (
        <div className="relative aspect-[1.618]">
          <Image
            className="mx-auto"
            src={thumbnail}
            alt="post-body-thumbnail"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={rgbDataURL(233, 233, 233)}
          />
        </div>
      )}

      {introduction && (
        <p className="py-[1.6rem] font-pretendard text-[1.6rem] font-normal">
          {introduction}
        </p>
      )}
    </div>
  );
};

export default PostHeader;
