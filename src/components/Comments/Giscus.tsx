"use client";

import { useTheme } from "next-themes";
import { memo, useEffect } from "react";

const Giscus = ({ className }: { className?: string }) => {
  const { theme: appTheme } = useTheme();

  useEffect(() => {
    const $container = document.getElementById("comments-giscus-container");

    const $script = document.createElement("script");
    $script.setAttribute("id", "comment-giscus");
    $script.setAttribute("src", "https://giscus.app/client.js");
    $script.setAttribute("data-repo", "youngminss/wiki-docs");
    $script.setAttribute("data-repo-id", "R_kgDOL45lkQ");
    $script.setAttribute("data-category", "Comments");
    $script.setAttribute("data-category-id", "DIC_kwDOL45lkc4ChZxk");
    $script.setAttribute("data-mapping", "pathname");
    $script.setAttribute("data-strict", "0");
    $script.setAttribute("data-reactions-enabled", "1");
    $script.setAttribute("data-emit-metadata", "0");
    $script.setAttribute("data-input-position", "bottom");
    $script.setAttribute("data-lang", "ko");
    $script.setAttribute("crossorigin", "anonymous");

    const giscusTheme =
      appTheme === "dark" ? "noborder_gray" : "light_high_contrast";
    $script.setAttribute("data-theme", giscusTheme);

    $container?.appendChild($script);
  }, [appTheme]);

  return (
    <div
      id="comments-giscus-container"
      className={`mt-[3.2rem] border-t border-solid border-[var(--foreground)] pt-[3.2rem] ${className}`}
    ></div>
  );
};

export default memo(Giscus);
