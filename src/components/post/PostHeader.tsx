import { TPost } from "@/types/post";

const PostHeader = ({ post }: { post: TPost }) => {
  const { title, subTitle, readingMinutes, createdAt } = post;

  return (
    <div className="flex flex-col">
      <h2>{title}</h2>
      <h3>{subTitle}</h3>
      <span>{readingMinutes}</span>
      <span>{createdAt}</span>
    </div>
  );
};

export default PostHeader;
