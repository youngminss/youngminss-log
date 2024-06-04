"use client";

import { useTheme } from "next-themes";

const ThemeModeChanger = () => {
  const { setTheme } = useTheme();
  const themeModeList = ["light", "dark", "system"];

  return themeModeList.map((themeMode) => {
    return (
      <button
        key={`theme-mode-${themeMode}`}
        onClick={() => setTheme(themeMode)}
      >
        {themeMode}
      </button>
    );
  });
};

export default ThemeModeChanger;
