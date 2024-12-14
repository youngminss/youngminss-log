import { rgbDataURL } from "@/functions/image";
import { TPost } from "@/types/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Callout, { TCalloutProps } from "./common/Callout";
import CustomCodeBlock from "./common/CustomCodeBlock";

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
    <p
      className="pb-[1.6rem] font-pretendard text-[1.6rem] leading-[150%]"
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="my-[1.6rem] border-[var(--foreground)]" {...props} />
  ),
  img: (props: any) => (
    <figure className="relative mb-[1.6rem]">
      <Image
        alt={props.alt || "image"}
        layout="responsive"
        width={1.618}
        height={1}
        objectFit="contain"
        placeholder="blur"
        blurDataURL={rgbDataURL(233, 233, 233)}
        {...props}
      />
    </figure>
  ),
  ul: (props: any) => (
    <ul className="mb-[1.6rem] list-inside list-disc" {...props} />
  ),
  ol: (props: any) => (
    <ul className="mb-[1.6rem] list-inside list-decimal" {...props} />
  ),
  li: (props: any) => (
    <li className="font-pretendard text-[1.6rem] leading-[150%]" {...props} />
  ),
  blockquote: (props: any) => <blockquote className="mb-[1.6rem]" {...props} />,
  pre: (props: any) => <CustomCodeBlock {...props} />,
  Callout: (props: TCalloutProps) => <Callout {...props} />,
  a: (props: any) => (
    <Link
      className="underline underline-offset-2 hover:text-[var(--highlight)]"
      target="_blank"
      {...props}
    />
  ),
  table: (props: any) => (
    <table
      className="my-[1.6rem] border border-solid border-[var(--foreground)]"
      {...props}
    />
  ),
  th: (props: any) => (
    <th
      className="border-b border-[var(--foreground)] font-pretendard text-[1.4rem]"
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr
      className="divide-x divide-[var(--foreground)] font-pretendard"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="overflow-paged-x font-pretendard text-[1.4rem] [&>*]:m-0"
      {...props}
    />
  ),
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
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              rehypeUnwrapImages,
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
