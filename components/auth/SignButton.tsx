'use client';

import { signIn } from 'next-auth/react';

export function SignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn('google')}
    >
      Sign in with Google
    </button>
  );
}