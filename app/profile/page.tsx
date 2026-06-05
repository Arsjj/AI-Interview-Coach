import Image from 'next/image';
import { requireUser } from '@/lib/auth/require-user';
import { getInterviewDashboardStats } from '@/lib/services/interview-service';

export default async function ProfilePage() {
  const user = await requireUser();
  const stats = await getInterviewDashboardStats(user.email);

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-auto bg-slate-100 p-4 text-slate-950 dark:bg-slate-950 dark:text-white sm:p-6">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-bold sm:text-3xl">Profile</h1>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-4">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name ?? 'User'}
                width={64}
                height={64}
                className="h-14 w-14 shrink-0 rounded-full sm:h-16 sm:w-16"
              />
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold sm:text-xl">
                {user.name ?? 'User'}
              </h2>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
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
