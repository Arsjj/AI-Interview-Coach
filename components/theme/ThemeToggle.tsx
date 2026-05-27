'use client'
import dynamic from 'next/dynamic';

export const ThemeToggle = dynamic(
    () => import('./ThemeToggleInner').then((mod) => mod.ThemeToggleInner),
    {
        ssr: false,
    },
);