import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

const PostCard = async ({ post }: { post: TPost }) => {
  const {
    title = "",
    subTitle = "",
    thumbnail = "/common/empty.webp",
    url,
  } = post;

  return (
    <Link href={url} className="flex flex-col">
      <div className="relative aspect-[1.618]">
        <Image
          src={thumbnail}
          alt="post-card-thumbnail"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={rgbDataURL(233, 233, 233)}
        />
      </div>

      <h2>{title}</h2>
      <h3>{subTitle}</h3>
    </Link>
  );
};

export default PostCard;
