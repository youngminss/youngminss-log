"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeartInteractionProfileImage() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const N = 15; // 클릭 시 증가하는 퍼센티지
  const M = 2; // 감소하는 퍼센티지
  const decreaseInterval = 500; // 감소 간격 (밀리초)

  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setFillPercentage((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - M;
      });
    }, decreaseInterval);

    return () => clearInterval(interval);
  }, [fillPercentage, isCompleted]);

  const handleClick = () => {
    if (isCompleted) return;

    setFillPercentage((prev) => {
      const newPercentage = prev + N;
      if (newPercentage >= 100) {
        setIsCompleted(true);
        return 100;
      }
      return newPercentage;
    });
  };

  return (
    <div className="relative" onClick={handleClick}>
      {/* 프로필 이미지 */}
      <div
        className={`relative h-[12rem] w-[12rem] overflow-clip rounded-full ${
          !isCompleted
            ? "cursor-pointer transition-shadow hover:shadow-lg hover:shadow-primary/30"
            : ""
        }`}
      >
        <Image
          src="/images/profile.webp"
          alt="프로필 이미지"
          width={192}
          height={192}
          className="h-full w-full select-none object-cover"
          priority
        />

        {/* 클릭 가능함을 나타내는 표시 (완료되지 않았을 때만) */}
        {!isCompleted && (
          <div className="absolute inset-0 z-[10] flex items-center justify-center bg-gray-500/30 opacity-0 transition-opacity hover:opacity-100">
            <Heart className="h-[2rem] w-[2rem] fill-current text-red-600" />
          </div>
        )}

        {/* 원형 프로그레스 바 */}
        {!isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-full w-full" fill="currentColor">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                stroke="gray"
                strokeWidth="4%"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                stroke="currentColor"
                strokeWidth="4%"
                fill="none"
                strokeDasharray="301.44%"
                strokeDashoffset={`${301.44 - (301.44 * fillPercentage) / 100}%`}
                className="text-[var(--foreground)] transition-all"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 완료 후 하트 애니메이션 */}
      {isCompleted && (
        <div className="animate-fade-in absolute left-[calc(50%-1rem)] top-[-2.4rem] animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-[2rem] w-[2rem]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
