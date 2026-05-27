'use client';

import { signIn } from 'next-auth/react';

export function SignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn('google')}
      className="rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-blue-400"
    >
      Sign in with Google
    </button>
  );
}