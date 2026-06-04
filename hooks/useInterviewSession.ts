// hooks/useInterviewSession.ts
import { useState } from "react";
import type { Evaluation } from "@/lib/ai/schemas/evaluation";
import { UIMessage } from "ai";
import { useInterviewSettings } from "@/components/providers/inteview-settings";


export function useInterviewSession() {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { mode, level, topic } = useInterviewSettings()

  const answeredCount = scores.length;

  const averageScore =
    scores.length === 0
      ? 0
      : scores.reduce((sum, score) => sum + score, 0) / scores.length;

      

  function getMessageText(message: UIMessage) {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");
  }



  function getCurrentQuestion(messages: UIMessage[]) {
    const questionMessageIndex = messages.findLastIndex(
      (message) => message.role === "assistant",
    );

    if (questionMessageIndex === -1) {
      return {
        question: "",
        questionMessageIndex: -1,
      };
    }

    return {
      question: getMessageText(messages[questionMessageIndex]),
      questionMessageIndex,
    };
  }




  async function evaluateAnswer(messages: UIMessage[]) {
    if (!sessionId) {
      console.warn("No active session. Start interview first.");
      return;
    }
    const { question, questionMessageIndex } = getCurrentQuestion(messages);
    if (questionMessageIndex === -1) return;

    const lastUserMessage = messages
      .slice(questionMessageIndex - 1)
      .filter((message) => message.role === "user")
      .at(-1);

    if (!lastUserMessage) {
      console.warn("No answer after the current question");
      return;
    }

    const lastAnswer = getMessageText(lastUserMessage);

    if (!lastAnswer.trim()) return;

    const res = await fetch("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        level,
        mode,
        question: question,
        answer: lastAnswer,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Evaluate API error:", errorText);
      return;
    }

    const data = await res.json();

    setEvaluation(data);
    setIsEvaluationOpen(true);
    setScores((prev) => [...prev, data.score]);

    await fetch(`/api/interview/sessions/${sessionId}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer: lastAnswer,
        score: data.score,
        strengths: data.strengths,
        weaknesses: data.weaknesses,
        seniorAnswer: data.seniorAnswer,
        followUpQuestion: data.followUpQuestion,
      }),
    });
  }




  function resetEvaluation() {
    setEvaluation(null);
    setIsEvaluationOpen(false);
    setScores([]);
  }




  async function createSession() {
    const res = await fetch("/api/interview/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        level,
        mode,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Create session error:", errorText);
      return null;
    }

    const session = await res.json();

    setSessionId(session.id);

    return session.id as string;
  }




  async function completeSession() {
    if (!sessionId) return;

    const res = await fetch(`/api/interview/sessions/${sessionId}/complete`, {
      method: "PATCH",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Complete session error:", errorText);
      return;
    }

    resetEvaluation();
  }

  return {
    evaluation,
    setEvaluation,

    isEvaluationOpen,
    setIsEvaluationOpen,
    evaluateAnswer,
    resetEvaluation,

    scores,
    answeredCount,
    averageScore,

    sessionId,
    setSessionId,
    createSession,
    completeSession,
  };
}
