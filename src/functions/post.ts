import { TPost, TPostAbstract, TPostDetail } from "@/types/post";
import dayjs from "dayjs";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const parsePostAbstract = (postPath: string): TPostAbstract => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(".mdx", "");

  const [category, slug] = filePath.split("/");
  const url = `/posts/${category}/${slug}`;

  return { url, category, slug };
};

const parsePost = async (postPath: string): Promise<TPost> => {
  const postDetail = await parsePostDetail(postPath);
  const postAbstract = parsePostAbstract(postPath);

  return { ...postAbstract, ...postDetail };
};

const parsePostDetail = async (postPath: string): Promise<TPostDetail> => {
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file); // data = matter 를 통해 읽은 mdx 의 요약 정보를 가져옴
  const grayMatter = data;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date)
    .locale("ko")
    .format("YYYY년 MM월 DD일");

  return { dateString, readingMinutes, content, ...grayMatter };
};

export const getPostDetail = async ({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) => {
  const filePath = `${POSTS_PATH}/${category}/${slug}/content.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};

export const getPostPaths = (category?: string) => {
  const folder = category || "**";
  const paths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return paths;
};

export const getPostList = async (category?: string) => {
  const paths: string[] = getPostPaths(category);
  const posts = await Promise.all(paths.map((postPath) => parsePost(postPath)));
  return posts;
};

export const getCategoryList = () => {
  const categoryPaths: string[] = sync(`${POSTS_PATH}/*`);
  const categoryList = categoryPaths.map(
    (path) => path.split("/").slice(-1)?.[0]
  );
  return categoryList;
};
