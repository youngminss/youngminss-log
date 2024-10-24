import { TPost, TPostAbstract, TPostDetail } from "@/types/post";
import dayjs from "dayjs";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/blog";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getCategoryList = () => {
  const categoryPathList: string[] = sync(`${POSTS_PATH}/*`);
  const categoryList = categoryPathList.map(
    (path) => path.split("/").slice(-1)?.[0],
  );

  return categoryList;
};

export const getPostList = async (category?: string) => {
  const pathList: string[] = getPostPathList(category);
  const postList = await Promise.all(
    pathList.map((postPath) => parsePost(postPath)),
  );

  return postList;
};

export const getPost = async ({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) => {
  const postPath = `${POSTS_PATH}/${category}/${slug}/content.mdx`;
  const post = await parsePost(postPath);

  return post;
};

export const getPostPathList = (category?: string) => {
  const categoryPath = category || "**";
  const postPathList: string[] = sync(`${POSTS_PATH}/${categoryPath}/**/*.mdx`);

  return postPathList;
};

const parsePost = async (postPath: string): Promise<TPost> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);

  return { ...postAbstract, ...postDetail };
};

export const parsePostAbstract = (postPath: string): TPostAbstract => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(".mdx", "");

  const [category, slug] = filePath.split("/");
  const url = `/blog/${category}/${slug}`;

  return { url, category, slug };
};

const parsePostDetail = async (postPath: string): Promise<TPostDetail> => {
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);

  const title = data["title"];
  const keywords = data["keywords"]
    ?.split(",")
    .map((keyword: string) => keyword.trim());
  const createdAt = data["createdAt"];
  const dateString = dayjs(data.date).locale("ko").format("YYYY년 MM월 DD일");
  const readingMinutes = Math.ceil(readingTime(content).minutes);

  return {
    ...data,
    title,
    keywords,
    createdAt,
    dateString,
    readingMinutes,
    content,
  };
};
