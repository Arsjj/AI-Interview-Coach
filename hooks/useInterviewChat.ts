import { InterviewLevel, InterviewMode, InterviewTopic } from "@/types";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

type Params = {
  topic: InterviewTopic;
  level: InterviewLevel;
  mode: InterviewMode
};

export function useInterviewChat({ topic, level, mode }: Params) {
  const [input, setInput] = useState("");
  const chat = useChat();
  const isLoading = chat.status === "submitted" || chat.status === "streaming";

  function startInterview() {
    chat.sendMessage({
      text: `Ask me one ${level} ${topic} ${mode} interview question. Only ask the question, do not evaluate yet.`,
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
          mode
        },
      },
    );
    setInput("");
  }

  return {
    input,
    messages: chat.messages,
    status: chat.status,
    isLoading,
    setInput,
    handleSubmit,
    startInterview,
    setMessages: chat.setMessages,
  };
}
