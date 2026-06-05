'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes'
import { MoonStar, SunMedium } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const isDark = theme === 'dark';
    const [mounted, setMounted] = useState(false)

    const handleThemChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true)
        })
        return () => cancelAnimationFrame(frame)
    }, [])

    if (!mounted) {
        return <div className="w-9 h-9" />
    }

    return (
        <button
            onClick={handleThemChange}
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