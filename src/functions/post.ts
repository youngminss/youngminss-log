import { TPost, TPostAbstract, TPostDetail } from "@/types/post";
import dayjs from "dayjs";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/blog";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const parsePostAbstract = (postPath: string): TPostAbstract => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(".mdx", "");

  const [category, slug] = filePath.split("/");
  const url = `/blog/${category}/${slug}`;

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

  return {
    dateString,
    readingMinutes,
    content,
    title: data["title"],
    createdAt: data["createdAt"],
    ...grayMatter,
  };
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
    (path) => path.split("/").slice(-1)?.[0],
  );
  return categoryList;
};

// mdx 의 createdAt 지정한 형식
export const parseDateString = (dateString: string) => {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart
    .split(".")
    .map((part) => part.trim())
    .map(Number);

  const period = dateString.includes("오전") ? "오전" : "오후";
  const timeString = dateString.split(period)[1].trim();
  const { hour, minute, second } = convertTo24Hour(timeString, period);

  return new Date(year, month - 1, day, hour, minute, second);
};

const convertTo24Hour = (timeString: string, period: string) => {
  let [hour, minute, second] = timeString.split(":").map(Number);

  if (period === "오후" && hour !== 12) {
    hour += 12;
  } else if (period === "오전" && hour === 12) {
    hour = 0;
  }
  return { hour, minute, second };
};
