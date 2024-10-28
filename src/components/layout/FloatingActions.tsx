"use client";

import { copyToClipboard } from "@/functions/browser";
import { GripIcon, LinkIcon, ListChecksIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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

      <GripIcon
        size={40}
        className="absolute bottom-0 right-0 z-[3] cursor-pointer rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem]"
        onClick={() => {
          setOpen((prev) => !prev);
          setIsPostTocOn(false);
        }}
      />

      <LinkIcon
        size={40}
        className={`absolute bottom-0 right-0 z-[2] cursor-pointer rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem] transition-[transform] duration-100 will-change-transform active:scale-[0.9] ${open ? `-translate-y-[4.8rem]` : `translate-y-0`}`}
        onClick={async () => {
          const currentUrl = window.location.href;
          const isCopyDone = await copyToClipboard(currentUrl);

          if (isCopyDone) {
            toast.success("URL 복사되었습니다.");
          } else {
            toast.error("URL 복사에 실패했습니다.");
          }
        }}
      />

      <ThemeModeButton
        type="toggle"
        className={`absolute bottom-0 right-0 z-[2] cursor-pointer rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem] transition-[transform] duration-100 will-change-transform active:scale-[0.9] ${open ? `-translate-y-[9.6rem]` : `translate-y-0`}`}
      />

      {isPostToCVisible && (
        <>
          <ListChecksIcon
            className={`round absolute bottom-0 right-0 z-[2] cursor-pointer rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem] transition-[transform] duration-100 will-change-transform active:scale-[0.9] pc:hidden ${open ? `-translate-y-[14.4rem]` : `translate-y-0`}`}
            size={40}
            onClick={() => setIsPostTocOn((prev) => !prev)}
          />

          <PostToC
            className={`fixed right-0 top-[10rem] rounded-[0.8rem] bg-[var(--background)] transition-[transform] duration-300 will-change-transform pc:!hidden ${isPostTocOn ? `-translate-x-[2rem]` : `translate-x-full`}`}
            onCloseButtonClick={() => setIsPostTocOn(false)}
          />
        </>
      )}
    </div>
  );
};

export default FloatingActions;
