import { rgbDataURL } from "@/functions/image";
import Image from "next/image";
import Link from "next/link";

const Avatars = ({
  className = "",
  src = "/images/profile.webp",
  alt = "youngmin's profile",
  href,
}: {
  className?: string;
  src?: string;
  alt?: string;
  href?: string;
}) => {
  const containerClassName = `relative aspect-square overflow-clip rounded-full ${className}`;

  const avatars = (
    <Image
      alt={alt}
      src={src}
      layout="fill"
      objectFit="cover"
      placeholder="blur"
      blurDataURL={rgbDataURL(233, 233, 233)}
    />
  );

  if (!href) {
    return <div className={containerClassName}>{avatars}</div>;
  }

  return (
    <Link href={href} className={containerClassName}>
      {avatars}
    </Link>
  );
};

export default Avatars;
