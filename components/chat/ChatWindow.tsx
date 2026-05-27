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

export function ChatWindow() {
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
    setSessionId,
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

  function resetInterview() {
    setMessages([]);
    resetEvaluation();
  }

  function scrollToBottom() {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth',
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
    <main>
      <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900/80">
          <header className="mb-6 flex items-center justify-between gap-4">
            <SessionStats
              answeredCount={answeredCount}
              averageScore={averageScore}
            />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                AI Interview Coach
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Practice frontend interviews with instant AI feedback.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <ModeSelector value={mode} onChange={setMode} />
              <LevelSelector value={level} onChange={setLevel} />
              <TopicSelector value={topic} onChange={setTopic} />
            </div>
          </header>

          <div
            ref={messagesContainerRef}
            className="h-140 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/70">
            <MessageList messages={messages} />
          </div>

          <ChatInput
            value={input}
            disabled={isLoading}
            onChange={setInput}
            onSubmit={handleSubmit}
          />
          <div className='flex gap-2 pt-4'>
            <button
              type="button"
              onClick={() => evaluateAnswer(messages)}
              className="w-fit rounded-xl border border-slate-300 px-4 py-3 text-sm dark:border-white/10"
            >
              Evaluate last answer
            </button>
            <button
              type="button"
              onClick={resetInterview}
              className="rounded-xl border border-slate-300 hover:-bg- px-4 py-3 text-sm dark:border-white/10"
            >
              New interview
            </button>
            <button
              type="button"
              onClick={completeSession}
              disabled={!sessionId}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm dark:border-white/10"
            >
              Finish interview
            </button>
            <button
              type="button"
              onClick={handleStartInterview}
              className="rounded-xl px-4 py-3 text-sm dark:border-white/10"

            >
              Start interview
            </button>
          </div>
          <EvaluationDrawer
            open={isEvaluationOpen}
            evaluation={evaluation}
            onClose={() => setIsEvaluationOpen(false)}
          />
        </section>
      </div>
    </main>
  );
}


