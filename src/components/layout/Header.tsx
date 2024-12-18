import Link from "next/link";
import ScrollProgress from "./ScrollProgress";

const Header = () => {
  return (
    <header
      id="blog-header"
      className="custom-blur sticky top-0 z-[999] backdrop-blur max-pc:px-[2rem]"
    >
      <div className="mx-auto flex h-[6.4rem] w-full max-w-[120rem] items-center">
        <span className="font-pretendard text-[3.2rem] font-black">
          <Link href="/">youngminss-log</Link>
        </span>

        <ScrollProgress />
      </div>
    </header>
  );
};

export default Header;
