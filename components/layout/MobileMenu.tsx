'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { X } from "lucide-react";;
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { SessionStats } from "../interview/SessionStates";
import { ModeSelector } from "../interview/ModeSelector";
import { LevelSelector } from "../interview/LevelSelector";
import { TopicSelector } from "../interview/TopicSelector";
import { useInterviewSettings } from "../providers/inteview-settings";
import { User } from "@/types";

export const MobileMenu = ({ user }: User) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { mode, level, topic, setMode, setLevel, setTopic } = useInterviewSettings()


    const {
        answeredCount,
        averageScore,

    } = useInterviewSession();

    return (
        <>
            <header className="flex shrink-0 items-center justify-between md:hidden">
                <div className='flex gap-2'>
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-bold text-slate-700 dark:bg-white/10 dark:text-white">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name ?? 'User'}
                                width={40}
                                height={40}
                            />
                        ) : (
                            user.name?.[0] ?? user.email?.[0] ?? 'U'
                        )}
                    </div>
                    <button
                        type="button"
                        aria-label="Open session menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(true)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            aria-hidden
                        >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </div>
            </header>

            <MobileHeaderMenu
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            >
                <SessionStats
                    answeredCount={answeredCount}
                    averageScore={averageScore}
                />
                <div className="grid gap-3">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        Interview settings
                    </p>
                    <ModeSelector value={mode} onChange={setMode} />
                    <LevelSelector value={level} onChange={setLevel} />
                    <TopicSelector value={topic} onChange={setTopic} />
                </div>
            </MobileHeaderMenu>
        </>
    )
}

type MobileHeaderMenuProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export function MobileHeaderMenu({ open, onClose, children }: MobileHeaderMenuProps) {
    useEffect(() => {
        if (!open) return;

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    return (
        <>
            <div
                onClick={onClose}
                aria-hidden
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
            />
            <aside
                aria-hidden={!open}
                className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 dark:border-white/10 dark:bg-slate-950 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-slate-200 p-4 dark:border-white/10">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-white/10"
                    >
                        <X />
                    </button>
                </div>
                <div className="hide-scrollbar flex-1 space-y-5 overflow-y-auto p-4 pb-safe">
                    {children}
                    <div className="border-t border-slate-200 dark:border-white/10">
                        <Link
                            href="/profile"
                            onClick={onClose}
                            className="block px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                            Profile
                        </Link>

                        <Link
                            href="/dashboard"
                            onClick={onClose}
                            className="block px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/interviews"
                            onClick={onClose}
                            className="block px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                            Interview History
                        </Link>
                        <div className="border-t border-slate-200 dark:border-white/10">
                            <button
                                type="button"
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full px-5 py-4 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

type InterviewSettingsProps = {
    children: React.ReactNode;
};

export function InterviewSettings({ children }: InterviewSettingsProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full sm:w-auto">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm dark:border-white/10 sm:py-3"
            >
                Interview settings
            </button>

            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900 sm:left-auto sm:right-0 sm:w-96">
                    <div className="grid gap-3">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}


