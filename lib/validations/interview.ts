// lib/validations/interview.ts
import { z } from 'zod';

export const createInterviewSessionSchema = z.object({
  topic: z.string().min(1),
  level: z.enum(['junior', 'middle', 'senior']),
  mode: z.enum(['practice', 'mock', 'deep-dive']),
});

export const saveInterviewAnswerSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  score: z.number().min(1).max(10),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  seniorAnswer: z.string(),
  followUpQuestion: z.string(),
});