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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const interviewSettings = (
        <>
            <ModeSelector value={mode} onChange={setMode} />
            <LevelSelector value={level} onChange={setLevel} />
            <TopicSelector value={topic} onChange={setTopic} />
        </>
    );

    return (
        <main className="flex min-h-0 flex-1 flex-col px-3 py-3 text-slate-950 dark:text-white sm:px-4 sm:py-6 md:py-8">
            <section className="chat-window animate-chat-appear mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-slate-900/80 sm:rounded-3xl sm:p-4 sm:shadow-2xl md:p-6">
                {logged && (
                    <>
                        <header className="mb-4 flex shrink-0 items-center justify-between sm:hidden">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold">Session</p>
                                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                    {topic} · {level} · {mode}
                                </p>
                            </div>

                            <button
                                type="button"
                                aria-label="Open session menu"
                                aria-expanded={mobileMenuOpen}
                                onClick={() => setMobileMenuOpen(true)}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                    aria-hidden
                                >
                                    <path d="M4 5h16M4 12h16M4 19h16" />
                                </svg>
                            </button>
                        </header>

                        <MobileHeaderMenu
                            open={mobileMenuOpen}
                            onClose={() => setMobileMenuOpen(false)}
                        >
                            <SessionStats
                                answeredCount={answeredCount}
                                averageScore={averageScore}
                            />
                            <div className="grid gap-3">
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                    Interview settings
                                </p>
                                {interviewSettings}
                            </div>
                        </MobileHeaderMenu>

                        <header className="mb-6 hidden shrink-0 sm:flex sm:items-start sm:justify-between">
                            <SessionStats
                                answeredCount={answeredCount}
                                averageScore={averageScore}
                            />

                            <InterviewSettings>
                                {interviewSettings}
                            </InterviewSettings>
                        </header>
                    </>
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

type MobileHeaderMenuProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

function MobileHeaderMenu({ open, onClose, children }: MobileHeaderMenuProps) {
    useEffect(() => {
        if (!open) return;

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    return (
        <>
            <div
                onClick={onClose}
                aria-hidden
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity sm:hidden ${
                    open ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
            />

            <aside
                aria-hidden={!open}
                className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 dark:border-white/10 dark:bg-slate-950 sm:hidden ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-slate-200 p-4 dark:border-white/10">
                    <h2 className="text-lg font-bold">Session menu</h2>
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-white/10"
                    >
                        Close
                    </button>
                </div>

                <div className="hide-scrollbar flex-1 space-y-5 overflow-y-auto p-4 pb-safe">
                    {children}
                </div>
            </aside>
        </>
    );
}

type Props = {
    children: React.ReactNode;
};

export function InterviewSettings({ children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full sm:w-auto">
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
