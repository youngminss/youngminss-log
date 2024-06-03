import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

const PostBody = ({ post }: { post: TPost }) => {
  const { title, subTitle, thumbnail, readingMinutes, createdAt } = post;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col">
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
        <span>{readingMinutes}</span>
        <span>{createdAt}</span>
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

      <MDXRemote source={post.content} />
    </div>
  );
};

export default PostBody;
