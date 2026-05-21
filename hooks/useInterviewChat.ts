import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { InterviewLevel } from "@/constants/interview-topics";

type Params = {
  topic: string;
  level: InterviewLevel;
};

export function useInterviewChat({ topic, level }: Params) {
  const [input, setInput] = useState("");

  const chat = useChat();

  const isLoading = chat.status === "submitted" || chat.status === "streaming";

  function startInterview() {
    chat.sendMessage({
      text: `Ask me one ${level} ${topic} interview question. Only ask the question, do not evaluate yet.`,
    });
  }

  function handleSubmit() {
    if (!input.trim()) return;

    chat.sendMessage(
      {
        text: input,
      },
      {
        body: {
          topic,
          level,
        },
      },
    );
    setInput("");
  }

  return {
    input,
    setInput,
    messages: chat.messages,
    setMessages: chat.setMessages,
    status: chat.status,
    isLoading,
    handleSubmit,
    startInterview,
  };
}
