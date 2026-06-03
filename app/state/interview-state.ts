import {
  InterviewLevel,
  InterviewMode,
  InterviewTopic,
} from "@/constants/interview-topics";

let topic: InterviewTopic = "React";
let level: InterviewLevel = "senior";
let mode: InterviewMode = "practice";

export const interviewState = {
  getSettings: () => {
    return { topic, mode, level };
  },

  setTopic: (value: InterviewTopic) => {
    topic = value;
  },

  setLevel: (value: InterviewLevel) => {
    level = value;
  },

  setMode: (value: InterviewMode) => {
    mode = value;
  },
};
