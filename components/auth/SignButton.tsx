'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);

    await signIn('google', {
      callbackUrl: '/',
      redirect: true,
    });
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isLoading}
      className="rounded-xl bg-blue-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
    >
      {isLoading ? (
        'Signing in...'
      ) : (
        <>
          <span className="sm:hidden">Sign in</span>
          <span className="hidden sm:inline">Sign in with Google</span>
        </>
      )}
    </button>
  );
}
