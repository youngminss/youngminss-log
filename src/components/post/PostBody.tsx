import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const PostBody = ({ post }: { post: TPost }) => {
  const { thumbnail } = post;

  return (
    <div className="flex flex-1 flex-col">
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

      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: { dark: "github-dark-dimmed", light: "github-light" },
                },
              ],
              rehypeSlug,
            ],
          },
        }}
      />
    </div>
  );
};

export default PostBody;
