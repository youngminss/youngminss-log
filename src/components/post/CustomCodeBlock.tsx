"use client";

import { Check, Copy } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";

const CustomCodeBlock = ({
  className = "",
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      setIsLoading(true);
      await navigator.clipboard.writeText(code);
      setIsLoading(false);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  };

  return (
    <div className="relative">
      <button
        disabled={isCopied || isLoading}
        aria-label={isCopied ? "Copied!" : "Copy code"}
        onClick={handleClickCopy}
        className="absolute right-[1rem] top-[1rem] z-[100] flex h-fit w-fit items-center gap-x-[0.4rem] rounded-[0.4rem] bg-black px-[0.8rem] py-[0.4rem] !text-[rgb(220,220,213)]"
      >
        <span className="relative h-[1.4rem] w-[1.4rem]">
          {isCopied ? <Check size="100%" /> : <Copy size="100%" />}
        </span>
        <span className="text-[1.2rem]">{isCopied ? "Copied !" : "Copy"}</span>
      </button>
      <pre ref={preRef} {...props} className={className}>
        {children}
      </pre>
    </div>
  );
};

export default CustomCodeBlock;
