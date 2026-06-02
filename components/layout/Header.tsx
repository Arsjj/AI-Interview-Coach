import Link from 'next/link';
import { auth } from '@/auth';
import { UserMenu } from '../auth/UserMenu';
import { SignInButton } from '../auth/SignButton';
import { ThemeToggle } from '../theme/ThemeToggle';
import { MobileMenu } from './MobileMenu';

export async function Header() {
    const session = await auth();

    return (
        <header className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 text-slate-950 dark:border-white/10 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-4">
            <div className="mx-auto flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="truncate text-base font-bold sm:text-lg"
                        >
                            AI Interview Coach
                        </Link>
                        <ThemeToggle />
                    </div>
                    <p className="mt-1 hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                        Practice frontend interviews with instant AI feedback
                    </p>
                </div>
                <div className="flex align-center">
                    {session?.user?.email ? (
                        <>
                            <div className='max-md:hidden'> <UserMenu user={session.user} /> </div>
                            <div className='md:hidden'><MobileMenu user={session.user}/></div>
                        </>
                    ) : (
                        <SignInButton />
                    )}
                </div>

            </div>
        </header>
    );
}
