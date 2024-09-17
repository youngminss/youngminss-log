export type TPost = {
  url: string;
  category: string;
  slug: string;
  dateString: string;
  readingMinutes: number;
  content: string;
  title: string;
  introduction?: string;
  keywords?: string[];
  thumbnail?: string;
  createdAt: string;
};

export type TPostAbstract = Pick<TPost, "url" | "category" | "slug">;
export type TPostDetail = Omit<TPost, "url" | "category" | "slug">;
