import Link from 'next/link';
import { DeleteSessionButton } from '@/components/interview/DeleteSessionButton';
import { getInterviewSessions } from '@/lib/services/interview-service';
import { requireUser } from '@/lib/auth/require-user';

export default async function InterviewsPage() {
  const user = await requireUser()
  const sessions = await getInterviewSessions(user.email);

  return (
    <main className="hide-scrollbar flex min-h-0 flex-1 flex-col overflow-auto bg-slate-100 p-4 text-slate-950 dark:bg-slate-950 dark:text-white sm:p-6">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-2xl font-bold sm:text-3xl">Interview history</h1>

        <div className="mt-6 grid gap-3 sm:gap-4">
          {sessions.map((session) => (
            <div key={session.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:hover:bg-slate-800 sm:p-5"
            >
              <Link href={`/interviews/${session.id}`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold sm:text-xl">{session.topic}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {session.level} · {session.mode}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <p className="text-sm text-slate-500 sm:hidden">Avg score</p>
                    <div>
                      <p className="hidden text-sm text-slate-500 sm:block">Avg score</p>
                      <p className="text-xl font-bold sm:text-2xl">
                        {session.averageScore || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mt-3 sm:mt-4">
                <DeleteSessionButton sessionId={session.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
