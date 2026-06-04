import { InferSelectModel } from 'drizzle-orm';
import { interviewAnswers, interviewSessions } from '@/lib/db/schema';
import { INTERVIEW_LEVELS, INTERVIEW_MODES, INTERVIEW_TOPICS } from '@/constants/interview-topics';

export type InterviewAnswer = InferSelectModel<typeof interviewAnswers>;
export type InterviewSession = InferSelectModel<typeof interviewSessions>;

export type InterviewTopic = (typeof INTERVIEW_TOPICS)[number];
export type InterviewLevel = (typeof INTERVIEW_LEVELS)[number];
export type InterviewMode = (typeof INTERVIEW_MODES)[number];

export type User = {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
};