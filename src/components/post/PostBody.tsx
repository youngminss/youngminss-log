import { TPost } from "@/types/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const PostBody = ({ post }: { post: TPost }) => {
  return (
    <div className="flex flex-1 flex-col">
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: { dark: "github-dark", light: "github-light" },
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
