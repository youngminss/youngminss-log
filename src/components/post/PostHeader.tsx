import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import { AUTHOR_NAME } from "@/utils/const";
import Image from "next/image";
import Avatars from "../ui/Avatars";
import { Badge } from "../ui/badge";

const PostHeader = ({ post }: { post: TPost }) => {
  const { title, readingMinutes, thumbnail, keywords, createdAt } = post;

  const createdDateOnly = createdAt.split(" ")[0];

  return (
    <div className="flex flex-col">
      <h1 className="font-pretendard text-[3.2rem] font-bold">{title}</h1>

      {keywords && (
        <div className="scrollbar-hide inline-flex gap-x-[0.4rem] overflow-x-auto pt-[0.4rem]">
          {keywords.map((keyword) => {
            return (
              <Badge
                key={`postKeyword_Badge_${keyword}`}
                className="px-[0.8rem] py-[0.2rem] text-[1.3rem]"
              >
                {keyword}
              </Badge>
            );
          })}
        </div>
      )}

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
        <div className="relative my-[1.6rem] aspect-[1.618]">
          <Image
            className="mx-auto"
            src={thumbnail}
            alt="post-body-thumbnail"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={rgbDataURL(233, 233, 233)}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
