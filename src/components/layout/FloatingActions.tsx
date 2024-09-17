"use client";

import { Grip, ListChecksIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollToTopButton from "../buttons/ScrollToTopButton";
import ThemeModeButton from "../buttons/ThemeModeButton";
import PostToC from "../post/PostToC";

const pathnameRegexForPostToCVisualization =
  /^\/blog\/[^\/]+\/[^\/]+(\/[^\/]*)*$/;

const FloatingActions = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [isPostTocOn, setIsPostTocOn] = useState(false);
  const isPostToCVisible = pathnameRegexForPostToCVisualization.test(pathname);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }

    if (isPostTocOn) {
      setIsPostTocOn(false);
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-[2rem] right-[2rem]">
      <ScrollToTopButton
        className={`absolute bottom-0 right-[4.8rem] z-[3] cursor-pointer border-[0.15rem] border-solid border-[var(--foreground)] bg-[var(--background)] transition-[transform] duration-100 active:scale-[0.9]`}
      />

      <Grip
        size={40}
        className="absolute bottom-0 right-0 z-[3] cursor-pointer rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem]"
        onClick={() => {
          setOpen((prev) => !prev);
          setIsPostTocOn(false);
        }}
      />

      <ThemeModeButton
        type="toggle"
        className={`absolute bottom-0 right-0 z-[2] rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem] transition-[transform] duration-100 will-change-transform ${open ? `-translate-y-[4.8rem]` : `translate-y-0`} cursor-pointer active:scale-[0.9]`}
      />

      {isPostToCVisible && (
        <>
          <ListChecksIcon
            className={`round absolute bottom-0 right-0 z-[1] rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem] transition-[transform] duration-100 will-change-transform pc:hidden ${open ? `-translate-y-[9.6rem]` : `translate-y-0`} cursor-pointer active:scale-[0.9]`}
            size={40}
            onClick={() => setIsPostTocOn((prev) => !prev)}
          />

          <PostToC
            className={`rounded- fixed right-0 top-[10rem] rounded-[0.8rem] bg-[var(--background)] transition-[transform] duration-300 will-change-transform pc:!hidden ${isPostTocOn ? `-translate-x-[2rem]` : `translate-x-full`}`}
            isPinVisible={false}
            onCloseButtonClick={() => setIsPostTocOn(false)}
          />
        </>
      )}
    </div>
  );
};

export default FloatingActions;
