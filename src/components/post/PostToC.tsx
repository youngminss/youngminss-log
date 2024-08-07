"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

interface IToCItem {
  level: string;
  text: string | null;
  href: string;
}

const levelToStyleClassNameMap: { [key: string]: string } = {
  H1: "p-0",
  H2: "p-2",
  H3: "p-4",
};

const PostToC = () => {
  const isServerSide = typeof window === "undefined";

  const router = useRouter();
  const [isSticky, setIsSticky] = useState<boolean>();

  const [postToCList, setPostToCList] = useState<IToCItem[]>([]);
  const isToCReady = postToCList.length !== 0;

  const handleToCItemClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    const decodedHashId = decodeURIComponent(event.currentTarget.hash);
    const scrollTargetId = decodedHashId.replace(/.*\#/, "");
    const scrollTarget = document.getElementById(scrollTargetId);

    if (scrollTarget) {
      // 1. change url hash
      router.push(decodedHashId, { scroll: false });

      // 2. smooth scroll target section
      window.scrollTo({
        top: scrollTarget.offsetTop - 64, // subtract header height
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!isServerSide) {
      const $postBody = document.getElementById("post-body");

      if ($postBody) {
        // step 1 : h1 ~ h3 태그까지 추출
        const hTagList = $postBody.querySelectorAll("h1, h2, h3"); // h1, h2, h3 정도만 ToC 로 활용

        // step 2 : ToC 리스트 만들기 (item = tagName, text, id)
        const postToCListTemp: IToCItem[] = [];

        hTagList.forEach((hTagItem) => {
          const { id: href, nodeName: level, textContent: text } = hTagItem;
          postToCListTemp.push({ level, text, href });
        });

        if (postToCListTemp.length !== 0) {
          setPostToCList(postToCListTemp);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleScrollForSticky = () => {
      if (window.scrollY >= 300) {
        setIsSticky(true);
        return;
      }

      setIsSticky(false);
    };

    if (!isServerSide) {
      window.addEventListener("scroll", handleScrollForSticky);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollForSticky);
    };
  }, []);

  return (
    <aside
      className={`${isToCReady ? `opacity-100 transition-opacity duration-300` : `opacity-0`} ${isSticky ? `fixed top-[12rem]` : `absolute top-[30rem] mt-[12rem]`} right-[calc(50%_-_32rem_-_20rem_-_3rem)] !w-[20rem] rounded-[0.8rem] border-[0.2rem] border-solid border-[var(--foreground)] p-[1.2rem] max-pc:hidden`}
    >
      {postToCList.map((postToCItem, index) => {
        const { level, text, href } = postToCItem;
        return (
          <div
            key={index}
            className={`${levelToStyleClassNameMap[level]} py-[0.4rem] text-[var(--foreground)] hover:text-cyan-600`}
          >
            <a href={`#${href}`} onClick={handleToCItemClick}>
              {text}
            </a>
          </div>
        );
      })}
    </aside>
  );
};

export default PostToC;
