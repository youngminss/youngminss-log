import { TPost } from "@/types/post";
import { AUTHOR_NAME, GITHUB_PROFILE } from "@/utils/const";

export const generateBlogSchema = () => {
  return {
    "@context": "http://schema.org",
    "@type": "Blog",
    name: "Youngminss-log",
    url: "https://www.youngminss-log.com",
    about: "Web Development, Tech, Programming",
    description: "Youngminss-log 입니다. 주로 웹 개발 관련 글을 기록합니다.",
    dateCreated: "2024.10.28",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      image: {
        "@type": "ImageObject",
        url: GITHUB_PROFILE,
        width: "100",
        height: "100",
      },
    },
    inLanguage: "ko",
  };
};

export const generateBlogPostingSchema = ({
  category,
  slug,
  post,
}: {
  category: string;
  slug: string;
  post: TPost;
}) => {
  const { title, thumbnail, introduction, content, keywords, createdAt } = post;

  return {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: title,
    articleBody: content,
    description: introduction,
    keywords: keywords,
    datePublished: createdAt.split(" ").at(0),
    wordCount: content.length,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      image: {
        "@type": "ImageObject",
        url: GITHUB_PROFILE,
        width: "100",
        height: "100",
      },
    },
    image: {
      "@type": "ImageObject",
      url: thumbnail,
      width: "1200",
      height: "800",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.youngminss-log.com/${category}/${slug}`,
      url: `https://www.youngminss-log.com/blog/${category}/${slug}`,
    },
  };
};
