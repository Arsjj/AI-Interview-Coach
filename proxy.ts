// proxy.ts
export { auth as proxy } from '@/auth';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/interviews/:path*',
    '/api/interview/:path*',
  ],
};