import { ArrowUp } from "lucide-react";
import { useCallback } from "react";

const ScrollToTopButton = ({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const handleScrollToTopClick = () => {
    handleScrollToTop();

    if (onClick) {
      onClick();
    }
  };

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <ArrowUp
      size={40}
      className={`rounded-[0.4rem] bg-opacity-70 p-[0.8rem] ${className}`}
      onClick={handleScrollToTopClick}
    />
  );
};

export default ScrollToTopButton;
