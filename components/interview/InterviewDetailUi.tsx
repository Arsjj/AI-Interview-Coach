'use client'

import type { InferSelectModel } from 'drizzle-orm';
import {
    interviewAnswers,
    interviewSessions,
} from '@/lib/db/schema';

type InterviewAnswer = InferSelectModel<typeof interviewAnswers>;
type InterviewSession = InferSelectModel<typeof interviewSessions>;

type InterviewDetailUiProps = {
    answers: InterviewAnswer[];
    session: InterviewSession;
};

import { useRouter } from "next/navigation"
import { DeleteSessionButton } from "./DeleteSessionButton"
import Link from "next/link"

function InterviewDetailUi({ answers, session }: InterviewDetailUiProps) {
    const router = useRouter()
    return (
        <main className="min-h-screen bg-slate-100 p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/interviews"
                    className="text-sm text-blue-500 hover:underline"
                >
                    ← Back to history
                </Link>

                <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
                    <h1 className="text-3xl font-bold">{session.topic}</h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {session.level} · {session.mode} · {session.status}
                    </p>

                    <p className="mt-4 text-2xl font-bold">
                        Avg score: {session.averageScore || '—'}
                    </p>
                </header>

                <section className="mt-6 space-y-4">
                    {answers.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
                            No answers saved yet.
                        </div>
                    ) : (
                        answers.map((item, index) => (
                            <article
                                key={item.id}
                                className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">
                                        Question {index + 1}
                                    </h2>

                                    <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-300">
                                        {item.score}/10
                                    </span>
                                </div>

                                <div className="mt-5">
                                    <h3 className="font-semibold">Question</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                        {item.question}
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <h3 className="font-semibold">Your answer</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                        {item.answer}
                                    </p>
                                </div>

                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    <div>
                                        <h3 className="font-semibold">Strengths</h3>
                                        <ul className="mt-2 space-y-2">
                                            {item.strengths.map((strength) => (
                                                <li
                                                    key={strength}
                                                    className="rounded-xl bg-emerald-500/10 p-3 text-sm"
                                                >
                                                    {strength}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">Weaknesses</h3>
                                        <ul className="mt-2 space-y-2">
                                            {item.weaknesses.map((weakness) => (
                                                <li
                                                    key={weakness}
                                                    className="rounded-xl bg-red-500/10 p-3 text-sm"
                                                >
                                                    {weakness}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <h3 className="font-semibold">Senior answer</h3>
                                    <p className="mt-2 rounded-2xl bg-slate-100 p-4 text-sm leading-6 dark:bg-white/5">
                                        {item.seniorAnswer}
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <h3 className="font-semibold">Follow-up question</h3>
                                    <p className="mt-2 rounded-2xl bg-violet-500/10 p-4 text-sm leading-6">
                                        {item.followUpQuestion}
                                    </p>
                                </div>
                            </article>
                        ))
                    )}
                </section>
                <DeleteSessionButton
                    sessionId={session.id}
                    onDeleted={() => router.push('/interviews')}
                />
            </div>
        </main>
    )
}

export default InterviewDetailUi