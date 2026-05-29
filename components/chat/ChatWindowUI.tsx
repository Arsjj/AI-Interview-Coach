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

    } = useInterviewChat({ topic, level })
    const hasActiveSession = Boolean(sessionId)

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
        <main className="flex-1 min-h-0 px-4 py-8 text-slate-950 dark:bg-slate-950 dark:text-white">
            <section className="chat-window animate-chat-appear h-full min-h-0 mx-auto flex max-w-4xl flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900/80">
                {logged &&
                    <header className="mb-6 flex justify-between gap-4">
                        <SessionStats
                            answeredCount={answeredCount}
                            averageScore={averageScore}
                        />


                        <div className="flex h-fit gap-3">
                            <ModeSelector value={mode} onChange={setMode} />
                            <LevelSelector value={level} onChange={setLevel} />
                            <TopicSelector value={topic} onChange={setTopic} />
                        </div>
                    </header>
                }

                <div
                    ref={messagesContainerRef}
                    className="hide-scrollbar h-full overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/70">
                    <MessageList messages={messages} />
                </div>

                <ChatInput
                    value={input}
                    disabled={isLoading}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                />
                {logged &&
                    <>
                        <div className='flex gap-2 pt-4'>
                            <button
                                type="button"
                                onClick={() => evaluateAnswer(messages)}
                                disabled={!hasActiveSession || isLoading}
                                className="w-fit rounded-xl border border-slate-300 px-4 py-3 text-sm dark:border-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Evaluate last answer
                            </button>
                            <button
                                type="button"
                                onClick={resetInterview}
                                disabled={!hasActiveSession || isLoading}
                                className="rounded-xl border border-slate-300 hover:-bg- px-4 py-3 text-sm dark:border-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                New interview
                            </button>
                            <button
                                type="button"
                                onClick={completeSession}
                                disabled={!hasActiveSession || isLoading}
                                className="rounded-xl border border-slate-300 px-4 py-3 text-sm dark:border-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Finish interview
                            </button>
                            <button
                                type="button"
                                onClick={handleStartInterview}
                                className="rounded-xl px-4 py-3 text-sm dark:border-white/10 cursor-pointer"

                            >
                                Start interview
                            </button>
                        </div>
                        {
                            evaluation &&
                            <EvaluationDrawer
                                open={isEvaluationOpen}
                                evaluation={evaluation}
                                onClose={() => setIsEvaluationOpen(false)}
                            />
                        }
                    </>
                }
            </section>
        </main>
    );
}


