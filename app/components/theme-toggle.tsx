"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("nextai-theme") as Theme | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
    const timer = window.setTimeout(() => setTheme(initial), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("nextai-theme", next);
  }

  const isDark = theme === "dark";
  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}
      aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`} aria-pressed={isDark}
      title={`Modo ${isDark ? "oscuro" : "claro"}`}>
      <span aria-hidden="true">{isDark ? "☀" : "◐"}</span>
      {isDark ? "Claro" : "Oscuro"}
    </button>
  );
}
