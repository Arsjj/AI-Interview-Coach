// components/auth/UserMenu.tsx
'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Props = {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
};

export function UserMenu({ user }: Props) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-bold text-slate-700 dark:bg-white/10 dark:text-white"
            >
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
            </button>

            {open && (
                <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
                    <div className="p-6 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {user.email}
                        </p>

                        <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-3xl font-bold text-slate-700 dark:bg-white/10 dark:text-white">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name ?? 'User'}
                                    width={80}
                                    height={80}
                                />
                            ) : (
                                user.name?.[0] ?? 'U'
                            )}
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Hi, {user.name ?? 'User'}!
                        </h3>
                    </div>

                    <div className="border-t border-slate-200 dark:border-white/10">
                        <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="block px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                            Profile
                        </Link>

                        <Link
                            href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="block px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/interviews"
                            onClick={() => setOpen(false)}
                            className="block px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                            Interview History
                        </Link>
                    </div>

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
            )}
        </div>
    );
}