import { GITHUB_PROFILE } from "@/utils/const";
import { Book, Github } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="custom-blur sticky top-0 z-[999] flex h-[6.4rem] w-full items-center backdrop-blur max-pc:px-[2rem]">
      <h1 className="font-pretendard text-[3.2rem] font-black">
        <Link href="/">영민하다</Link>
      </h1>

      <nav className="ml-auto font-pretendard font-medium">
        <ul className="flex items-center gap-x-[1.2rem]">
          <li>
            <Link href="/posts">
              <Book
                size={40}
                className="rounded-[0.4rem] bg-opacity-80 p-[0.8rem] hover:bg-[--foreground] hover:text-[--background]"
              />
            </Link>
          </li>
          <li>
            <Link href={GITHUB_PROFILE} target="_blank">
              <Github
                size={40}
                className="rounded-[0.4rem] bg-opacity-80 p-[0.8rem] hover:bg-[--foreground] hover:text-[--background]"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
