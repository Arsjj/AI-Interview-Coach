// lib/ai/schemas/evaluation.ts
import { z } from "zod";

export const evaluationSchema = z.object({
  score: z.number().min(1).max(10),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  seniorAnswer: z.string(),

  followUpQuestion: z.string(),
});

export type Evaluation = z.infer<typeof evaluationSchema>;
