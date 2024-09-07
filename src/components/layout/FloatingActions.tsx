"use client";

import { Grip } from "lucide-react";
import { useState } from "react";
import ScrollToTopButton from "../buttons/ScrollToTopButton";
import ThemeModeButton from "../buttons/ThemeModeButton";

const FloatingActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[2rem] right-[2rem]">
      <ScrollToTopButton
        className={`absolute bottom-0 right-[4.8rem] z-[3] cursor-pointer border-[0.15rem] border-solid border-[var(--foreground)] bg-[var(--background)] transition-[transform] duration-100 active:scale-[0.9]`}
      />

      <ThemeModeButton
        type="toggle"
        className={`absolute bottom-0 right-0 z-[2] rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem] transition-[transform] duration-100 will-change-transform ${open ? `-translate-y-[4.8rem]` : `translate-y-0`} cursor-pointer active:scale-[0.9]`}
      />

      <Grip
        size={40}
        className="absolute bottom-0 right-0 z-[3] cursor-pointer rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem]"
        onClick={() => setOpen(!open)}
      />
    </div>
  );
};

export default FloatingActions;
