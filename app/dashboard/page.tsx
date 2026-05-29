// app/dashboard/page.tsx
import Link from 'next/link';
import { getInterviewDashboardStats } from '@/lib/services/interview-service';
import { requireUser } from '@/lib/auth/require-user';

export default async function DashboardPage() {
    const user = await requireUser()
    const stats = await getInterviewDashboardStats(user.email);

    return (
        <main className="h-screen bg-slate-100 p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
            <div className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Your interview practice progress.
                        </p>
                    </div>

                    <Link
                        href="/interviews"
                        className="rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-blue-400"
                    >
                        View history
                    </Link>
                </div>

                <section className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Total interviews
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {stats.totalSessions}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Completed
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {stats.completedSessions}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Average score
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {stats.averageScore || '—'}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Best topic
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                            {stats.bestTopic
                                ? `${stats.bestTopic.topic} (${stats.bestTopic.average})`
                                : '—'}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Weakest topic
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                            {stats.weakestTopic
                                ? `${stats.weakestTopic.topic} (${stats.weakestTopic.average})`
                                : '—'}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Total answers
                        </p>
                        <p className="mt-2 text-3xl font-bold">
                            {stats.totalAnswers}
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}