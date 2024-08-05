import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import Image from "next/image";

const PostHeader = ({ post }: { post: TPost }) => {
  const { title, introduction, readingMinutes, thumbnail, createdAt } = post;

  const createdDateOnly = createdAt.split(" ")[0];

  return (
    <div className="flex flex-col">
      <h2 className="font-pretendard text-[3.2rem] font-bold">{title}</h2>

      <div className="flex flex-col items-end">
        <span>
          Reading Time :{" "}
          <span className="font-pretendard text-[1.1rem] font-semibold">
            {readingMinutes} min
          </span>
        </span>
        <span>
          Created Date :{" "}
          <span className="font-pretendard text-[1.1rem] font-semibold">
            {createdDateOnly}
          </span>
        </span>
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
          />
        </div>
      )}

      <p className="pb-[1.6rem] font-pretendard text-[1.6rem] font-normal">
        {introduction}
      </p>
    </div>
  );
};

export default PostHeader;
