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
      className="rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  );
}