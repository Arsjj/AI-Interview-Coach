'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useCloseOnOutsideClick } from '@/hooks/useCloseOnOutsideClick';
import { menuLinks } from '@/constants';
import { User } from '@/types';
import { useAuth } from '@/hooks/useAuth';

type Props = {
    user: User;
};

export function Menu({ user }: Props) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useCloseOnOutsideClick(menuRef, handleMenuClose);
    const { handleSignOut } = useAuth();

    function handleMenuOpen() {
        setOpen((prev) => !prev);
    }

    function handleMenuClose() {
        setOpen(false);
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={handleMenuOpen}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-bold text-slate-700 dark:bg-white/10 dark:text-white"
            >
                {user.image ? (
                    <Image src={user.image} alt={user.name ?? 'User'} width={40} height={40} />
                ) : (
                    user.name?.[0] ?? user.email?.[0] ?? 'U'
                )}
            </button>
            {open && (
                <div className="absolute right-0 top-12 z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
                    <div className="p-6 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {user.email}
                        </p>

                        <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-3xl font-bold text-slate-700 dark:bg-white/10 dark:text-white">
                            {user.image ? (
                                <Image src={user.image} alt={user.name ?? 'User'} width={80} height={80} />
                            ) : (
                                user.name?.[0] ?? 'U'
                            )}
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Hi, {user.name ?? 'User'}!
                        </h3>
                    </div>
                    <UserMenuLinks onClose={handleMenuClose} />
                    <div className="border-t border-slate-200 dark:border-white/10">
                        <button
                            type="button"
                            onClick={handleSignOut}
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


function UserMenuLinks({ onClose }: { onClose: () => void }) {
    return (
        <div className="border-t border-slate-200 dark:border-white/10">
            {menuLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block px-5 py-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}