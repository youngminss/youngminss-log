"use client";

import { useTheme } from "next-themes";
import { memo, useEffect, useRef } from "react";

const Giscus = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme: appTheme } = useTheme();
  const giscusTheme =
    appTheme === "dark" ? "noborder_gray" : "light_high_contrast";

  useEffect(() => {
    if (!containerRef.current || containerRef.current.hasChildNodes()) {
      return;
    }

    const $script = document.createElement("script");
    $script.src = "https://giscus.app/client.js";
    $script.id = "comment-giscus";
    $script.crossOrigin = "anonymous";
    $script.async = true;
    $script.setAttribute("data-repo", "youngminss/youngminss-blog");
    $script.setAttribute("data-repo-id", "R_kgDOL45lkQ");
    $script.setAttribute("data-category", "Comments");
    $script.setAttribute("data-category-id", "DIC_kwDOL45lkc4ChZxk");
    $script.setAttribute("data-mapping", "pathname");
    $script.setAttribute("data-strict", "0");
    $script.setAttribute("data-reactions-enabled", "1");
    $script.setAttribute("data-emit-metadata", "0");
    $script.setAttribute("data-input-position", "bottom");
    $script.setAttribute("data-lang", "ko");
    $script.setAttribute("data-theme", giscusTheme);

    containerRef.current.appendChild($script);
  }, [giscusTheme]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );

    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      "https://giscus.app",
    );
  }, [giscusTheme]);

  return (
    <div
      ref={containerRef}
      id="comments-giscus-container"
      className={`mt-[3.2rem] border-t border-solid border-[var(--foreground)] pt-[3.2rem] ${className}`}
    />
  );
};

export default memo(Giscus);
