import { useState } from "react";
import { signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);

    await signIn("google", {
      callbackUrl: "/",
      redirect: true,
    });
  }

  async function handleSignOut() {
    signOut({ callbackUrl: '/' })
  }

  return {
    isLoading,
    handleSignIn,
    handleSignOut
  }
};
