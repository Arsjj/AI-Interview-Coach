// lib/ai/schemas/evaluation.ts
import { z } from 'zod';

export const evaluationSchema = z.object({
  score: z.coerce.number().transform((score) => {
    if (score < 1) return 1;
    if (score > 10) return 10;
    return score;
  }),

  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  seniorAnswer: z.string().default(''),
  followUpQuestion: z.string().default(''),
});

export type Evaluation = z.infer<typeof evaluationSchema>;