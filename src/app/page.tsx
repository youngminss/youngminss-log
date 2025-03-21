import { parseDate } from "@/functions/date";
import { getPostList } from "@/functions/post";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const postList = (await getPostList())
    .slice(0, 4)
    .sort((postA, postB) =>
      parseDate(postA.createdAt).getTime() -
        parseDate(postB.createdAt).getTime() <
      0
        ? 1
        : -1,
    );

  return (
    <main className="min-h-[calc(100vh_-_18.9rem)] px-[1.6rem]">
      <section className="flex flex-col items-center justify-center gap-[3rem] pt-[3.2rem] transition-[translate] duration-300 animate-in fade-in">
        <div className="relative h-[12rem] w-[12rem] overflow-clip rounded-full">
          <Image
            src="/images/profile.webp"
            alt="프로필 이미지"
            width={192}
            height={192}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            priority
          />
        </div>

        <div className="space-y-[1.6rem] text-center transition-[translate] duration-300 animate-in fade-in slide-in-from-bottom">
          <h1 className="text-4xl font-bold">youngminss-log</h1>
          <p className="text-xl text-muted-foreground">
            🌟 Let the brighter shine the brighter.
          </p>
        </div>

        <div className="w-full max-w-[64rem] space-y-[3.2rem]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">최근 게시물</h2>
            <Link
              href="/blog"
              className="text-[1.2rem] text-muted-foreground hover:underline hover:underline-offset-2"
            >
              더보기 →
            </Link>
          </div>

          <div className="grid gap-[1.6rem] md:grid-cols-2">
            {postList.map((post) => (
              <article
                key={`Post-${post.category}-${post.slug}`}
                className="group cursor-pointer rounded-[0.6rem] border border-[var(--foreground)] p-[1.6rem] transition-[translate] duration-300 animate-in slide-in-from-bottom-4"
              >
                <Link href={`/blog/${post.category}/${post.slug}`}>
                  <span className="text-[1rem] text-muted-foreground">
                    {post.createdAt.split(" ").at(0) ?? ""}
                  </span>
                  <h3 className="pt-[0.6rem] text-[1.4rem] font-semibold group-hover:underline group-hover:underline-offset-2">
                    {post.title}
                  </h3>
                  {post.introduction && (
                    <p className="pt-[0.6rem] text-[1.2rem] text-muted-foreground">
                      {post.introduction}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
