'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { DeleteSessionButton } from "./DeleteSessionButton"
import { InterviewAnswer, InterviewSession } from "@/types";

type Props = {
    answers: InterviewAnswer[];
    session: InterviewSession;
};

function InterviewDetailUi({ answers, session }: Props) {
    const router = useRouter()
    return (
        <main className="flex min-h-0 flex-1 flex-col overflow-auto bg-slate-100 p-4 text-slate-950 dark:bg-slate-950 dark:text-white sm:p-6">
            <div className="mx-auto w-full max-w-4xl">
                <Link
                    href="/interviews"
                    className="text-sm text-blue-500 hover:underline"
                >
                    ← Back to history
                </Link>

                <header className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:mt-6 sm:rounded-3xl sm:p-6">
                    <h1 className="text-2xl font-bold sm:text-3xl">{session.topic}</h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {session.level} · {session.mode} · {session.status}
                    </p>

                    <p className="mt-4 text-xl font-bold sm:text-2xl">
                        Avg score: {session.averageScore || '—'}
                    </p>
                </header>

                <section className="mt-4 space-y-4 sm:mt-6">
                    {answers.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 sm:p-6">
                            No answers saved yet.
                        </div>
                    ) : (
                        answers.map((item, index) => (
                            <article
                                key={item.id}
                                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:rounded-3xl sm:p-6"
                            >
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <h2 className="text-lg font-bold sm:text-xl">
                                        Question {index + 1}
                                    </h2>

                                    <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-300 sm:px-4 sm:py-2">
                                        {item.score}/10
                                    </span>
                                </div>

                                <div className="mt-4 sm:mt-5">
                                    <h3 className="font-semibold">Question</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                        {item.question}
                                    </p>
                                </div>

                                <div className="mt-4 sm:mt-5">
                                    <h3 className="font-semibold">Your answer</h3>
                                    <p className="mt-2 break-words text-sm leading-6 text-slate-700 dark:text-slate-300">
                                        {item.answer}
                                    </p>
                                </div>

                                <div className="mt-4 grid gap-4 sm:mt-5 md:grid-cols-2">
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

                                <div className="mt-4 sm:mt-5">
                                    <h3 className="font-semibold">Senior answer</h3>
                                    <p className="mt-2 rounded-2xl bg-slate-100 p-4 text-sm leading-6 dark:bg-white/5">
                                        {item.seniorAnswer}
                                    </p>
                                </div>

                                <div className="mt-4 sm:mt-5">
                                    <h3 className="font-semibold">Follow-up question</h3>
                                    <p className="mt-2 rounded-2xl bg-violet-500/10 p-4 text-sm leading-6">
                                        {item.followUpQuestion}
                                    </p>
                                </div>
                            </article>
                        ))
                    )}
                </section>
                <div className="mt-4 pb-safe sm:mt-6">
                    <DeleteSessionButton
                        sessionId={session.id}
                        onDeleted={() => router.push('/interviews')}
                    />
                </div>
            </div>
        </main>
    )
}

export default InterviewDetailUi
