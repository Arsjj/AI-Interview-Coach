'use client';

import { useAuth } from '@/hooks/useAuth';

export function SignInButton() {
  const {isLoading, handleSignIn} = useAuth();

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
