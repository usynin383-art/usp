"use client";

import { useState, useEffect } from "react";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(true); // По дефолту дашборд пусть будет темным

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--color-border-main)] bg-[var(--color-bg-panel)] px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-up opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-status-up"></span>
        </div>
        <span className="text-lg font-bold tracking-tight">USP Monitor</span>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border-main)] bg-[var(--color-bg-panel)] text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </header>
  );
};
