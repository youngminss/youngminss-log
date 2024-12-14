import PostBody from "@/components/post/PostBody";
import PostFooter from "@/components/post/PostFooter";
import PostHeader from "@/components/post/PostHeader";
import PostToC from "@/components/post/PostToC";
import { getPost, getPostList } from "@/functions/post";
import { generateBlogPostingSchema } from "@/functions/schema";
import { BASE_URL } from "@/utils/const";
import { Metadata, ResolvingMetadata } from "next";

type TPostDetailProps = {
  params: { category: string; slug: string };
};

export const dynamic = "force-static";
export const revalidate = false; // revalidate: false = Infinity, default 긴 한데 명시적으로 선언

export async function generateStaticParams() {
  const postList = await getPostList();

  return postList.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params: { category, slug } }: TPostDetailProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await getPost({ category, slug });
  const { title, introduction, thumbnail, keywords } = post;

  const metadata: Metadata = {
    title,
    description: introduction,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/blog/${category}/${slug}`,
    },
    openGraph: {
      title,
      description: introduction,
      type: "website",
      siteName: "youngminss-log",
      url: `${BASE_URL}/blog/${category}/${slug}`,
      images: thumbnail
        ? {
            url: thumbnail,
            width: "1200",
            height: "800",
          }
        : undefined,
      locale: "ko_KR",
      alternateLocale: "en_US",
    },
  };

  return metadata;
}

const PostDetail = async ({ params: { category, slug } }: TPostDetailProps) => {
  const post = await getPost({
    category: category,
    slug: slug,
  });

  const blogPostingSchema = generateBlogPostingSchema({ category, slug, post });

  return (
    <main>
      <div className="mx-auto flex max-w-[64rem] flex-col px-[1.6rem]">
        <PostHeader post={post} />
        <PostBody post={post} />
        <PostFooter />
      </div>

      <PostToC />

      <script
        id="post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
    </main>
  );
};

export default PostDetail;
