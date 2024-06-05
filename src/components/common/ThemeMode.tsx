"use client";

import { Check, Laptop2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ThemeMode = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme, systemTheme } = useTheme();

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
      <DropdownMenuItem onClick={() => setTheme(themeMode)}>
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {systemTheme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeModeItem
          key={`theme-mode-${theme}`}
          themeMode="light"
          label="Light"
          Icon={Sun}
        />
        <ThemeModeItem
          key={`theme-mode-${theme}`}
          themeMode="dark"
          label="Dark"
          Icon={Moon}
        />
        <ThemeModeItem
          key={`theme-mode-${theme}`}
          themeMode="system"
          label="System"
          Icon={Laptop2}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeMode;
