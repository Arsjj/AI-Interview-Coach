// app/profile/page.tsx
import { requireUser } from '@/lib/auth/require-user';
import { getInterviewDashboardStats } from '@/lib/services/interview-service';
import Image from 'next/image';

export default async function ProfilePage() {
  const user = await requireUser();
  const stats = await getInterviewDashboardStats(user.email);

  return (
    <main className="h-screen overflow-auto bg-slate-100 p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Profile</h1>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name ?? 'User'}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}

            <div>
              <h2 className="text-xl font-bold">
                {user.name ?? 'User'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/5">
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-2xl font-bold">{stats.totalSessions}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/5">
              <p className="text-sm text-slate-500">Completed</p>
              <p className="text-2xl font-bold">{stats.completedSessions}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/5">
              <p className="text-sm text-slate-500">Avg score</p>
              <p className="text-2xl font-bold">
                {stats.averageScore || '—'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}