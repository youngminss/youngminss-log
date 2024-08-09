"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

// 1. 렌딩되었을때(스크롤 X)도 보이도록
// 2. 현재 보고 있는 섹션 하이라이팅

interface IToCItem {
  level: string;
  text: string | null;
  href: string;
  absoluteTop: number;
}

const levelIndentClassNameMap: { [key: string]: string } = {
  H1: "p-0",
  H2: "p-2",
  H3: "p-4",
};

const PostToC = () => {
  const isServerSide = typeof window === "undefined";

  const router = useRouter();
  const [scrollY, setScrollY] = useState(isServerSide ? 0 : window.scrollY);
  const [isSticky, setIsSticky] = useState<boolean>();

  const [postToCList, setPostToCList] = useState<IToCItem[]>([]);
  const isToCReady = postToCList.length !== 0;

  const [highlightToCItem, setHighlightToCItem] = useState<IToCItem>();
  const [lastHighlightToCItem, setLastHighlightToCItem] = useState<IToCItem>();

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
    const $postBody = document.getElementById("post-body");

    if ($postBody) {
      // step 1 : h1 ~ h3 태그까지 추출
      const hTagList = $postBody.querySelectorAll("h1, h2, h3"); // h1, h2, h3 정도만 ToC 로 활용

      // step 2 : ToC 리스트 만들기 (item = tagName, text, id)
      const postToCListTemp: IToCItem[] = [];

      hTagList.forEach((hTagItem) => {
        const { id: href, nodeName: level, textContent: text } = hTagItem;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const absoluteTop = hTagItem.getBoundingClientRect().top + scrollTop;

        postToCListTemp.push({
          level,
          text,
          href,
          absoluteTop: absoluteTop,
        });
      });

      if (postToCListTemp.length !== 0) {
        setPostToCList(postToCListTemp);
      }
    }
  }, []);

  useEffect(() => {
    const handleScrollForSticky = () => {
      const newIsSticky = window.scrollY >= 300 ? true : false;
      setIsSticky(newIsSticky);
      setScrollY(window.scrollY);
    };

    if (!isServerSide) {
      window.addEventListener("scroll", handleScrollForSticky);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollForSticky);
    };
  }, []);

  useEffect(() => {
    const handleScrollForHighlight = () => {
      if (postToCList.length !== 0) {
        const candidateHighlightToCList = postToCList.filter((postToCItem) => {
          const { absoluteTop } = postToCItem;

          return (
            scrollY <= absoluteTop &&
            absoluteTop < scrollY + document.documentElement.clientHeight
          );
        });

        if (candidateHighlightToCList.length !== 0) {
          setLastHighlightToCItem(candidateHighlightToCList.at(0));
        }

        const isToCArea =
          scrollY + document.documentElement.clientHeight >
          (postToCList.at(0)?.absoluteTop ?? 0);

        setHighlightToCItem(
          isToCArea
            ? candidateHighlightToCList?.at(0) ?? lastHighlightToCItem
            : undefined,
        );
      }
    };

    window.addEventListener("scroll", handleScrollForHighlight);

    return () => {
      window.addEventListener("scroll", handleScrollForHighlight);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  return (
    <aside
      className={`${isToCReady ? `opacity-100 transition-opacity duration-300` : `opacity-0`} ${isSticky ? `fixed top-[12rem]` : `absolute top-[30rem] mt-[12rem]`} right-[calc(50%_-_32rem_-_20rem_-_3rem)] max-pc:hidden`}
    >
      <div className="relative !w-[20rem] rounded-[0.8rem] border-[0.2rem] border-solid border-[var(--foreground)] px-[1.2rem] py-[0.8rem]">
        <div className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 items-center justify-center bg-[var(--background)] pl-[0.4rem] text-[3rem]">
          📌
        </div>
        {postToCList.map((postToCItem, index) => {
          const { level, text, href } = postToCItem;

          const isHighlight = href === highlightToCItem?.href;

          return (
            <div
              key={index}
              className={`${levelIndentClassNameMap[level]} ${isHighlight ? `font-semibold text-[var(--highlight)]` : ``} text-[var(--foreground) py-[0.4rem] text-[1.2rem]`}
            >
              <a href={`#${href}`} onClick={handleToCItemClick}>
                {text}
              </a>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default PostToC;
