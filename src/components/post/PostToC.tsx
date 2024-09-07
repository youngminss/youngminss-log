"use client";

import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

interface IToCItem {
  level: string;
  text: string | null;
  href: string;
  absoluteTop: number;
}

const SCROLL_FOR_TOC_STICKY = 300;
const LEVEL_INDENT_CLASS_NAME_MAP: { [key: string]: string } = {
  H1: "p-0",
  H2: "p-2",
  H3: "p-4",
};

const PostToC = ({
  className,
  isPinVisible = true,
  onCloseButtonClick: handleCloseButtonClick,
}: {
  className?: string;
  isPinVisible?: boolean;
  onCloseButtonClick?: () => void;
}) => {
  const isServerSide = typeof window === "undefined";

  const router = useRouter();

  const [scrollY, setScrollY] = useState(isServerSide ? 0 : window.scrollY);
  const [isSticky, setIsSticky] = useState<boolean>();
  const [isPostToCEnd, setIsPostToCEnd] = useState<boolean>();

  const [postToCList, setPostToCList] = useState<IToCItem[]>([]);
  const isToCReady = postToCList.length !== 0;

  const [highlightToCItem, setHighlightToCItem] = useState<IToCItem>();
  const [lastHighlightToCItem, setLastHighlightToCItem] = useState<IToCItem>();

  const handleToCItemClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    const decodedHashId = decodeURIComponent(event.currentTarget.hash);
    const scrollTargetId = decodedHashId.replace(/.*\#/, "");
    const $scrollTarget = document.getElementById(scrollTargetId);
    const $header = document.getElementById("blog-header");

    if ($scrollTarget) {
      // 1. change url hash
      router.push(decodedHashId, { scroll: false });

      // 2. smooth scroll target section
      window.scrollTo({
        top: $scrollTarget.offsetTop - ($header?.offsetHeight ?? 0),
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
  }, [isServerSide]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    if (!isServerSide) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isServerSide]);

  useEffect(() => {
    const handleToCSticky = () => {
      setIsSticky(window.scrollY >= SCROLL_FOR_TOC_STICKY);
    };

    const handleToCHighlight = () => {
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

    const handlePostToCEnd = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const $commentsSection = document.getElementById(
        "comments-giscus-container",
      );

      if ($commentsSection) {
        const commentsSectionAbsoluteTop =
          $commentsSection?.getBoundingClientRect().top + scrollTop;
        const offset = document.documentElement.clientHeight / 2;

        const isPostToCEnd =
          scrollY + document.documentElement.clientHeight >
          commentsSectionAbsoluteTop + offset;

        setIsPostToCEnd(isPostToCEnd);
      }
    };

    handleToCSticky();
    handleToCHighlight();
    handlePostToCEnd();
  }, [isToCReady, scrollY]);

  return (
    <aside
      className={`${className ?? `transition-opacity duration-300 ${isToCReady && !isPostToCEnd ? `opacity-100` : `opacity-0`} ${isSticky ? `fixed top-[12rem]` : `absolute top-[30rem] mt-[12rem]`} right-[calc(50%_-_32rem_-_20rem_-_3rem)] max-pc:hidden`}`}
    >
      <div className="relative !w-[20rem] rounded-[0.8rem] border-[0.2rem] border-solid border-[var(--foreground)] px-[1.2rem] py-[0.8rem]">
        {isPinVisible && (
          <div className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 items-center justify-center bg-[var(--background)] pl-[0.4rem] text-[3rem] transition-none">
            📌
          </div>
        )}

        <div className="scroll max-pc:max-h-[32rem] max-pc:overflow-y-scroll pc:max-h-[60rem]">
          {[...postToCList, ...postToCList].map((postToCItem, index) => {
            const { level, text, href } = postToCItem;

            const isHighlight = href === highlightToCItem?.href;

            return (
              <div
                key={index}
                className={`${LEVEL_INDENT_CLASS_NAME_MAP[level]} ${isHighlight ? `font-semibold text-[var(--highlight)]` : ``} text-[var(--foreground) py-[0.4rem] text-[1.2rem]`}
              >
                <a href={`#${href}`} onClick={handleToCItemClick}>
                  {text}
                </a>
              </div>
            );
          })}
        </div>

        {handleCloseButtonClick && (
          <CircleX
            className="mx-auto mt-[0.4rem] translate-x-[0.4rem]"
            onClick={handleCloseButtonClick}
          />
        )}
      </div>
    </aside>
  );
};

export default PostToC;
