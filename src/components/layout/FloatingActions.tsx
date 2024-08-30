"use client";

import { Grip } from "lucide-react";
import { useState } from "react";
import ScrollToTopButton from "../buttons/ScrollToTopButton";
import ThemeMode from "../buttons/ThemeModeButton";
const FloatingActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[2.8rem] right-[6.8rem] transition-all">
      <Grip
        size={40}
        className="absolute bottom-0 z-[3] cursor-pointer rounded-[0.4rem] border-[0.15rem] border-solid border-[--foreground] bg-[var(--background)] p-[0.8rem] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        onClick={() => setOpen(!open)}
      />

      <ScrollToTopButton
        className={`absolute z-[2] cursor-pointer border-[0.15rem] border-solid border-[var(--foreground)] duration-200 hover:bg-[var(--foreground)] hover:text-[var(--background)] ${open ? "bottom-[4.8rem] bg-[var(--background)] pc:bg-transparent" : "bottom-0"}`}
        onClick={() => setOpen(!open)}
      />

      <ThemeMode
        className={`absolute z-[1] cursor-pointer border-[0.15rem] border-solid border-[var(--foreground)] duration-200 hover:bg-[var(--foreground)] hover:text-[var(--background)] ${open ? "bottom-[9.6rem] bg-[var(--background)] pc:bg-transparent" : "bottom-0"}`}
        onClick={() => setOpen(!open)}
      />
    </div>
  );
};

export default FloatingActions;
