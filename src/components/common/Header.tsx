import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center">
      <div>
        <h1>영민하다</h1>
      </div>

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
