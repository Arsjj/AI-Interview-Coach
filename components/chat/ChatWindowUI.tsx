'use client';

import { useEffect, useRef, useState } from 'react';
import { TopicSelector } from '@/components/interview/TopicSelector';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { EvaluationDrawer } from '../interview/EvaluationDialog';
import { LevelSelector } from '../interview/LevelSelector';
import { useInterviewSession } from '@/hooks/useInterviewSession';
import { useInterviewChat } from '@/hooks/useInterviewChat';
import { SessionStats } from '../interview/SessionStates';
import { ModeSelector } from '../interview/ModeSelector';

const actionButtonClass =
    'rounded-xl border border-slate-300 px-3 py-2.5 text-sm dark:border-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3';

export function ChatWindowUI({ logged }: { logged: string | null | undefined }) {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const {
        topic,
        setTopic,
        level,
        setLevel,
        evaluation,
        isEvaluationOpen,
        setIsEvaluationOpen,
        evaluateAnswer,
        resetEvaluation,
        answeredCount,
        averageScore,
        mode,
        setMode,
        sessionId,
        createSession,
        completeSession
    } = useInterviewSession();

    const {
        input,
        setInput,
        messages,
        setMessages,
        isLoading,
        handleSubmit,
        startInterview,
    } = useInterviewChat({ topic, level });

    const hasActiveSession = Boolean(sessionId);

    function resetInterview() {
        setMessages([]);
        resetEvaluation();
    }

    function scrollToBottom() {
        messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
        });
    }

    async function handleStartInterview() {
        let activeSessionId = sessionId;

        if (!activeSessionId) {
            activeSessionId = await createSession();
        }
        if (!activeSessionId) return;

        startInterview();
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <main className="flex min-h-0 flex-1 flex-col px-3 py-3 text-slate-950 dark:text-white sm:px-4 sm:py-6 md:py-8">
            <section className="chat-window animate-chat-appear mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-slate-900/80 sm:rounded-3xl sm:p-4 sm:shadow-2xl md:p-6">
                {logged && (
                    <header className="mb-4 flex shrink-0 flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                        <SessionStats
                            answeredCount={answeredCount}
                            averageScore={averageScore}
                        />

                        <InterviewSettings>
                            <ModeSelector value={mode} onChange={setMode} />
                            <LevelSelector value={level} onChange={setLevel} />
                            <TopicSelector value={topic} onChange={setTopic} />
                        </InterviewSettings>
                    </header>
                )}

                <div
                    ref={messagesContainerRef}
                    className="hide-scrollbar min-h-0 flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-950/70 sm:rounded-2xl sm:p-4"
                >
                    <MessageList messages={messages} />
                </div>

                <ChatInput
                    value={input}
                    disabled={isLoading}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                />

                {logged && (
                    <>
                        <div className="grid shrink-0 grid-cols-2 gap-2 pt-3 sm:flex sm:flex-wrap sm:pt-4">
                            <button
                                type="button"
                                onClick={() => evaluateAnswer(messages)}
                                disabled={!hasActiveSession || isLoading}
                                className={actionButtonClass}
                            >
                                Evaluate
                            </button>
                            <button
                                type="button"
                                onClick={resetInterview}
                                disabled={!hasActiveSession || isLoading}
                                className={actionButtonClass}
                            >
                                New interview
                            </button>
                            <button
                                type="button"
                                onClick={completeSession}
                                disabled={!hasActiveSession || isLoading}
                                className={actionButtonClass}
                            >
                                Finish
                            </button>
                            <button
                                type="button"
                                onClick={handleStartInterview}
                                className="col-span-2 rounded-xl bg-blue-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-400 sm:col-span-1 sm:px-4 sm:py-3"
                            >
                                Start interview
                            </button>
                        </div>
                        {evaluation && (
                            <EvaluationDrawer
                                open={isEvaluationOpen}
                                evaluation={evaluation}
                                onClose={() => setIsEvaluationOpen(false)}
                            />
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

type Props = {
    children: React.ReactNode;
};

export function InterviewSettings({ children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm dark:border-white/10 sm:py-3"
            >
                Interview settings
            </button>

            {open && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900 sm:left-auto sm:right-0 sm:w-96">
                    <div className="grid gap-3">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
