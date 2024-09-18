"use client";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";

// TODO: 특정 페이지 rule 에서만 노출되어야하면 수정 필요
// TODO: 초기 scrollHeight 와 scrollEvent 시작할 때 scrollHeight 의 차이가 있는 이유 디버깅

const INITIAL_PROGRESS = 0;

const ScrollProgress = () => {
  const isServerSide = typeof window === "undefined";

  const pathname = usePathname();
  const showScrollProgress =
    pathname.startsWith(`/blog`) && pathname.split(`/`).length > 3; // TODO: Post detail 인 경우에만 노출하도록 임시 구현

  const [progress, setProgress] = useState(INITIAL_PROGRESS);

  useEffect(() => {
    setProgress(INITIAL_PROGRESS);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } =
        document.documentElement;

      const scrollableTotalHeight = Math.round(scrollHeight - clientHeight); // 스크롤 가능한 높이 = 전체 컨텐츠 높이 - 현재 브라우저 높이
      const currentHeight = Math.round(scrollTop); // top 으로부터 가능한 스크롤 높이
      setProgress(currentHeight / scrollableTotalHeight);
    };

    handleScroll();

    if (!isServerSide) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showScrollProgress) {
    return null;
  }

  return (
    <div
      className={`absolute bottom-0 left-0 bg-[var(--foreground)]`}
      style={{
        height: "4px",
        width: `${typeof window !== "undefined" ? `${progress * window.innerWidth}px` : "0px"}`,
      }}
    />
  );
};

export default memo(ScrollProgress);
