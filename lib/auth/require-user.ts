import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function requireUser() {
  const session = await auth();

   if (!session?.user?.email) {
    redirect('/');
  }

  return {
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
  };
}