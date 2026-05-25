// app/interviews/page.tsx
import { db } from '@/lib/db';
import { interviewSessions } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export default async function InterviewsPage() {
  const sessions = await db
    .select()
    .from(interviewSessions)
    .orderBy(desc(interviewSessions.createdAt));

    console.log(sessions);
    

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Interview history</h1>

        <div className="mt-6 grid gap-4">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/interviews/${session.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{session.topic}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {session.level} · {session.mode}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">Avg score</p>
                  <p className="text-2xl font-bold">
                    {session.averageScore || '—'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}