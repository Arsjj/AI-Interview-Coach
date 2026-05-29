'use client';

import { MoonStar, SunMedium } from "lucide-react";
import { useAppTheme } from "../providers/theme-provider";


export function ThemeToggle() {
    const { isDark, toggleTheme } = useAppTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 p-2 transition hover:scale-110 dark:border-white/10"
        >
            {isDark ? (
                <SunMedium
                    size={18}
                    className="text-cyan-300"
                />
            ) : (
                <MoonStar
                    size={18}
                    className="text-slate-700"
                />
            )}
        </button>
    );
}