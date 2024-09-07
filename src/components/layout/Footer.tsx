import { AUTHOR_NAME, GITHUB_PROFILE } from "@/utils/const";
import { Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-[2.8rem]">
      <div className="flex flex-col items-center gap-y-[0.8rem]">
        <Link href={GITHUB_PROFILE} target="_blank">
          <Github
            size={40}
            className="rounded-[0.4rem] bg-opacity-80 p-[0.8rem] transition-[transform] duration-100 will-change-transform active:scale-[0.9]"
          />
        </Link>

        <p className="font-pretendard text-[1.4rem] font-bold">
          Copyright 2024. {AUTHOR_NAME} all rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
