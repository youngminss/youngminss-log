import { rgbDataURL } from "@/functions/image";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

const Avatars = ({
  className = "",
  src = "/images/profile.webp",
  alt = "youngmin's profile",
  href,
  target,
}: {
  className?: string;
  src?: string;
  alt?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
}) => {
  const containerClassName = `relative aspect-square overflow-clip rounded-full ${className}`;

  const avatars = (
    <Image
      alt={alt}
      src={src}
      fill
      style={{
        objectFit: "cover",
      }}
      placeholder="blur"
      blurDataURL={rgbDataURL(233, 233, 233)}
    />
  );

  if (!href) {
    return <div className={containerClassName}>{avatars}</div>;
  }

  return (
    <Link href={href} target={target} className={containerClassName}>
      {avatars}
    </Link>
  );
};

export default Avatars;
