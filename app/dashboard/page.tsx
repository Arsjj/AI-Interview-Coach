import Link from 'next/link';
import { getInterviewDashboardStats } from '@/lib/services/interview-service';
import { requireUser } from '@/lib/auth/require-user';

export default async function DashboardPage() {
    const user = await requireUser()
    const stats = await getInterviewDashboardStats(user.email);

    return (
        <main className="flex min-h-0 flex-1 flex-col overflow-auto bg-slate-100 p-4 text-slate-950 dark:bg-slate-950 dark:text-white sm:p-6">
            <div className="mx-auto w-full max-w-5xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Your interview practice progress.
                        </p>
                    </div>

                    <Link
                        href="/interviews"
                        className="w-full rounded-xl bg-blue-500 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-400 sm:w-auto"
                    >
                        View history
                    </Link>
                </div>

                <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:p-5">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Total interviews
                        </p>
                        <p className="mt-2 text-2xl font-bold sm:text-3xl">
                            {stats.totalSessions}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:p-5">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Completed
                        </p>
                        <p className="mt-2 text-2xl font-bold sm:text-3xl">
                            {stats.completedSessions}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:p-5">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Average score
                        </p>
                        <p className="mt-2 text-2xl font-bold sm:text-3xl">
                            {stats.averageScore || '—'}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:p-5">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Best topic
                        </p>
                        <p className="mt-2 text-lg font-bold sm:text-2xl">
                            {stats.bestTopic
                                ? `${stats.bestTopic.topic} (${stats.bestTopic.average})`
                                : '—'}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:p-5">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Weakest topic
                        </p>
                        <p className="mt-2 text-lg font-bold sm:text-2xl">
                            {stats.weakestTopic
                                ? `${stats.weakestTopic.topic} (${stats.weakestTopic.average})`
                                : '—'}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:p-5">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Total answers
                        </p>
                        <p className="mt-2 text-2xl font-bold sm:text-3xl">
                            {stats.totalAnswers}
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
