// types/interview.ts
import type { Evaluation } from '@/lib/ai/schemas/evaluation';
import { InterviewLevel } from '@/constants/interview-topics';


export type InterviewSession = {
  topic: string;
  level: InterviewLevel;
  currentQuestion: string;
  evaluation: Evaluation | null;
  isEvaluationOpen: boolean;
};