'use client';
import { useAppTheme } from "../providers/theme";

export function ThemeToggleInner() {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-xl border border-slate-300 px-4 py-3 text-sm dark:border-white/10"
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}