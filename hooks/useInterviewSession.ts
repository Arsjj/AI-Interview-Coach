// hooks/useInterviewSession.ts
import { useState } from "react";
import { InterviewLevel, InterviewMode } from "@/constants/interview-topics";
import type { Evaluation } from "@/lib/ai/schemas/evaluation";
import { UIMessage } from "ai";

export function useInterviewSession() {
  const [topic, setTopic] = useState("React");
  const [level, setLevel] = useState<InterviewLevel>("senior");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [mode, setMode] = useState<InterviewMode>("practice");

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
  }

  function resetEvaluation() {
    setEvaluation(null);
    setIsEvaluationOpen(false);
    setScores([]);
  }

  return {
    topic,
    setTopic,

    level,
    setLevel,

    evaluation,
    setEvaluation,

    isEvaluationOpen,
    setIsEvaluationOpen,
    evaluateAnswer,
    resetEvaluation,

    scores,
    answeredCount,
    averageScore,

    mode,
    setMode
  };
}
