import { interviewState } from "@/app/state/interview-state";
import { InterviewLevel, InterviewMode, InterviewTopic } from "@/constants/interview-topics";
import { useState } from "react";

export function useInterviewSettings() {
  const [topic, setTopic] = useState<InterviewTopic>("React");
  const [level, setLevel] = useState<InterviewLevel>("senior");
  const [mode, setMode] = useState<InterviewMode>("practice");

  const handleTopicChange = (value: InterviewTopic) => {
    interviewState.setTopic(value);
    setTopic(value);
  };

  const handleModeChange = (value: InterviewMode) => {
    interviewState.setMode(value);
    setMode(value);
  };

  const handleLevelChange = (value: InterviewLevel) => {
    interviewState.setLevel(value);
    setLevel(value);
  };

  return {
    mode,
    topic,
    level,
    handleTopicChange,
    handleModeChange,
    handleLevelChange,
  };
}
