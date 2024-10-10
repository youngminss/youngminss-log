import PostBody from "@/components/post/PostBody";
import PostFooter from "@/components/post/PostFooter";
import PostHeader from "@/components/post/PostHeader";
import PostToC from "@/components/post/PostToC";
import { getPostDetail } from "@/functions/post";
import { Metadata, ResolvingMetadata } from "next";

type TPostDetailProps = {
  params: { category: string; slug: string };
};

export async function generateMetadata(
  { params: { category, slug } }: TPostDetailProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await getPostDetail({ category, slug });
  const { title, introduction, thumbnail, keywords, createdAt } = post;

  const metadata = {
    title,
    description: introduction,
    keywords,
    openGraph: {
      title,
      description: introduction,
      type: "website",
      siteName: "youngminss-log",
      url: `www.youngminss-log.com/blog/${category}/${slug}`,
      images: thumbnail
        ? {
            url: thumbnail,
            width: 1200,
            height: 800,
          }
        : undefined,
      locale: "ko_KR",
      alternateLocale: "en_US",
    },
  };

  return metadata;
}

const PostDetail = async ({ params: { category, slug } }: TPostDetailProps) => {
  const post = await getPostDetail({
    category: category,
    slug: slug,
  });

  return (
    <main>
      <div className="mx-auto flex max-w-[64rem] flex-col px-[1.6rem]">
        <PostHeader post={post} />
        <PostBody post={post} />
        <PostFooter />
      </div>

      <PostToC />
    </main>
  );
};

export default PostDetail;
