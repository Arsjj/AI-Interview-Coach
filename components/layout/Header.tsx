// components/layout/Header.tsx
import Link from 'next/link';
import { auth } from '@/auth';

import { SignOutButton } from '@/components/auth/SignOutButton';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { SignInButton } from '../auth/SignButton';
import { UserMenu } from '../auth/UserMenu';

export async function Header() {
    const session = await auth();

    return (
        <header className="border-b border-slate-200 bg-white px-6 py-4 text-slate-950 dark:border-white/10 dark:bg-slate-950 dark:text-white">
            <div className="mx-auto flex px-2 items-center justify-between">
                <Link href="/" className="text-lg font-bold">
                    AI Interview Coach
                </Link>
                {session?.user?.email ? (
                    <UserMenu user={session.user} />
                ) : (
                    <SignInButton />
                )}
            </div>
            {/* <div className='absolute right-2 top-2'>
                <ThemeToggle />
            </div> */}
        </header>
    );
}