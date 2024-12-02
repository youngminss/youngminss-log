"use client";

import { throttle } from "@/functions/browser";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

interface IToCItem {
  level: string; // h tag's level (by. element.nodeName) (ex. H1, H2, H3 ...)
  text: string | null; // h tag's text data (by. element.textContent)
  href: string; // h tag's id
  absoluteTop: number; // h tag's absolute top position inside contents
}

const SCROLL_FOR_TOC_STICKY = 300;
const LEVEL_INDENT_CLASS_NAME_MAP: { [key: string]: string } = {
  H2: "py-2",
  H3: "py-2 pl-2",
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
    // cc. 컨텐츠 본문 컴포넌트에 "post-body" 라는 이름의 id 값을 설정해놓았음
    const $postBody = document.getElementById("post-body");

    if ($postBody) {
      // step 1 : h2 ~ h3 태그까지 추출
      const hTagList = $postBody.querySelectorAll("h2, h3");

      // step 2 : ToC 리스트 만들기
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
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200);
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
          <div className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 -rotate-45 items-center justify-center pl-[0.4rem] text-[3rem] transition-none">
            🏷️
          </div>
        )}

        <div className="max-pc:max-h-[32rem] max-pc:overflow-y-scroll pc:max-h-[60rem]">
          {postToCList.map((postToCItem) => {
            const { level, text, href } = postToCItem;

            const isHighlight = text === highlightToCItem?.text;

            return (
              <div
                key={`toc-item-${text}`}
                className={`${LEVEL_INDENT_CLASS_NAME_MAP[level]} ${isHighlight ? `font-semibold text-[var(--highlight)]` : ``} text-[var(--foreground) py-[0.4rem] text-[1.2rem]`}
              >
                <Link
                  className="line-clamp-1 break-all"
                  href={`#${href}`}
                  onClick={handleToCItemClick}
                >
                  {text}
                </Link>
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
