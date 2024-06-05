import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center">
      <h1>
        <Link href="/">영민하다</Link>
      </h1>

      <nav className="ml-auto">
        <ul className="flex items-center gap-x-[1.2rem]">
          <Link href="/">Home</Link>
          <Link href="/posts">Post</Link>
          <Link href="/about">About</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
