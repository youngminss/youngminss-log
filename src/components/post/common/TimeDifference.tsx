"use client";

import { timeDifference } from "@/functions/date";

const TimeDifference = ({
  className = "",
  createdAt,
}: {
  className?: string;
  createdAt: string;
}) => {
  return (
    <span className={`pt-[1.2rem] ${className}`}>
      {timeDifference(createdAt)}
    </span>
  );
};

export default TimeDifference;
