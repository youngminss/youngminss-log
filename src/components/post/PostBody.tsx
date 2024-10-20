import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import CustomCodeBlock from "./CustomCodeBlock";

const components = {
  h1: (props: any) => (
    <h1
      className="pb-[1.2rem] font-pretendard text-[2.8rem] font-bold"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="pb-[1.2rem] font-pretendard text-[2.4rem] font-bold"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="pb-[1.2rem] font-pretendard text-[2.0rem] font-bold"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="pb-[1.2rem] font-pretendard text-[1.6rem] font-bold"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className="pb-[1.2rem] font-pretendard text-[1.6rem] font-bold"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className="pb-[1.2rem] font-pretendard text-[1.6rem] font-bold"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="pb-[1.6rem] font-pretendard text-[1.6rem]" {...props} />
  ),
  hr: (props: any) => (
    <hr className="my-[1.6rem] border-[var(--foreground)]" {...props} />
  ),
  img: (props: any) => (
    <figure className="relative mb-[1.6rem] aspect-[1.618]">
      <Image
        alt={props.alt || "image"}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={rgbDataURL(233, 233, 233)}
        {...props}
      />
    </figure>
  ),
  ul: (props: any) => <ul className="list-inside list-disc" {...props} />,
  li: (props: any) => (
    <li className="font-pretendard text-[1.6rem] leading-[150%]" {...props} />
  ),
  blockquote: (props: any) => <blockquote className="mb-[1.6rem]" {...props} />,
  pre: (props: any) => <CustomCodeBlock {...props} />,
};

const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: {
    dark: "slack-dark",
    light: "slack-dark",
  },
};

const PostBody = ({ post }: { post: TPost }) => {
  return (
    <div id="post-body" className="flex flex-1 flex-col">
      <MDXRemote
        components={{ ...components }}
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkUnwrapImages, remarkGfm, remarkBreaks],
            rehypePlugins: [
              rehypeSlug,
              rehypeAutolinkHeadings,
              [rehypePrettyCode, prettyCodeOptions],
            ],
          },
        }}
      />
    </div>
  );
};

export default PostBody;
