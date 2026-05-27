// components/auth/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="rounded-xl border border-slate-300 px-4 py-3 text-sm dark:border-white/10"
    >
      Sign out
    </button>
  );
}