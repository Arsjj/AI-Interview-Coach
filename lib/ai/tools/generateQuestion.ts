import { tool } from 'ai';
import { z } from 'zod';

export const generateQuestionTool = tool({
  description: 'Generate an interview question for a given topic',

  inputSchema: z.object({
    topic: z.string(),
    level: z.enum(['junior', 'middle', 'senior']),
  }),

  execute: async ({ topic, level }) => {
    const questions = {
      React: {
        senior: 'Explain React Fiber architecture and scheduling.',
        middle: 'What is useEffect and when does it run?',
        junior: 'What is React?',
      },

      TypeScript: {
        senior: 'Explain covariance, contravariance, and bivariance in TypeScript.',
        middle: 'Difference between interface and type?',
        junior: 'What is TypeScript?',
      },
    };

    return {
      question:
        questions[topic as keyof typeof questions]?.[
          level as 'junior' | 'middle' | 'senior'
        ] || `Ask a ${level} ${topic} interview question`,
    };
  },
});