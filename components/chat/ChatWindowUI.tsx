'use client';

import { useEffect, useRef } from 'react';
import { TopicSelector } from '@/components/interview/TopicSelector';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { EvaluationDrawer } from '../interview/EvaluationDialog';
import { LevelSelector } from '../interview/LevelSelector';
import { useInterviewSession } from '@/hooks/useInterviewSession';
import { useInterviewChat } from '@/hooks/useInterviewChat';
import { SessionStats } from '../interview/SessionStates';
import { ModeSelector } from '../interview/ModeSelector';
import { useInterviewSettings } from '../providers/inteview-settings';
import { useAsyncLock } from '@/hooks/useAsyncLock';


const actionButtonClass =
    'rounded-xl cursor-pointer border border-slate-300 px-2 py-2 text-sm max-sm:text-[12px] dark:border-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3';

export function ChatWindowUI({ logged }: { logged: string | null | undefined }) {
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { mode, level, topic, setMode, setLevel, setTopic } = useInterviewSettings()
    const {
        evaluation,
        isEvaluationOpen,
        setIsEvaluationOpen,
        evaluateAnswer,
        answeredCount,
        averageScore,
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

    } = useInterviewChat({ topic, level, mode });
    const startInterviewLock = useAsyncLock();

    const hasActiveSession = Boolean(sessionId);

    function resetInterview() {
        setMessages([]);
        completeSession();
    }

    async function handleStartInterview() {
        await startInterviewLock.run(async () => {
            let activeSessionId = sessionId;

            if (!activeSessionId) {
                activeSessionId = await createSession();
            }
            if (!activeSessionId) return;
            startInterview();
        })
    }

    function scrollToBottom() {
        messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
        });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <main className="flex min-h-0 flex-1 flex-col text-slate-950 dark:text-white sm:px-4 sm:py-6 md:py-8">
            <section className="chat-window animate-chat-appear mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-slate-900/80 sm:rounded-3xl sm:p-4 sm:shadow-2xl md:p-6">
                {logged && (
                    <>
                        <header className="mb-6 max-md:hidden shrink-0 md:flex md:items-start md:justify-between">
                            <SessionStats
                                answeredCount={answeredCount}
                                averageScore={averageScore}
                            />
                            <div className='flex gap-2 w-full max-w-md'>
                                <ModeSelector value={mode} onChange={setMode} />
                                <LevelSelector value={level} onChange={setLevel} />
                                <TopicSelector value={topic} onChange={setTopic} />
                            </div>
                        </header>
                    </>
                )}

                <div
                    ref={messagesContainerRef}
                    className="hide-scrollbar flex-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-slate-950/70 sm:rounded-2xl sm:p-4"
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
                        <div className=" gap-2 pt-3 flex sm:pt-4">
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
                                disabled={isLoading}
                                className={`${actionButtonClass} col-span-2 rounded-xl cursor-pointer md:bg-blue-500 px-3 py-2.5 text-sm font-medium md:text-white sm:hover:bg-blue-400 sm:col-span-1 sm:px-4 sm:py-3`}
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
