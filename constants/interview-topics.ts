export const INTERVIEW_TOPICS = [
  'React',
  'JavaScript',
  'TypeScript',
  'Browser',
  'System Design',
] as const;
export const INTERVIEW_LEVELS = ['junior', 'middle', 'senior'] as const;
export const INTERVIEW_MODES = ['practice', 'mock', 'deep-dive'] as const;

export type InterviewTopic = (typeof INTERVIEW_TOPICS)[number];
export type InterviewLevel = (typeof INTERVIEW_LEVELS)[number];
export type InterviewMode = (typeof INTERVIEW_MODES)[number];