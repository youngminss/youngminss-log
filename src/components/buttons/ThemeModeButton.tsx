"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ThemeModeButton = ({
  className = "",
  type = "toggle",
  onClick,
}: {
  className?: string;
  type: "toggle" | "dropdown";
  onClick?: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  const ThemeModeItem = ({
    themeMode,
    Icon,
    label,
  }: {
    themeMode: string;
    Icon: any;
    label: string;
  }) => {
    return (
      <DropdownMenuItem
        onClick={() => {
          setTheme(themeMode);

          if (onClick) {
            onClick();
          }
        }}
      >
        <div className="flex items-center gap-[0.8rem]">
          <Icon size={16} />
          <span>{label}</span>
        </div>
        {themeMode === theme && <Check className="ml-[1rem]" size={16} />}
      </DropdownMenuItem>
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (type === "toggle") {
    return (
      <div
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");

          if (onClick) {
            onClick();
          }
        }}
      >
        {theme === "dark" ? (
          <Moon size={40} className={className} />
        ) : (
          <Sun size={40} className={className} />
        )}
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className={`rounded-[0.4rem] bg-opacity-70 p-[0.8rem] ${className}`}
      >
        {theme === "dark" ? <Moon size={40} /> : <Sun size={40} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end">
        <ThemeModeItem themeMode="light" label="Light" Icon={Sun} />
        <ThemeModeItem themeMode="dark" label="Dark" Icon={Moon} />
        {/* <ThemeModeItem themeMode="system" label="System" Icon={Laptop2} /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeModeButton;
