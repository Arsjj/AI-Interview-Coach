import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const interviewLevelEnum = pgEnum('interview_level', [
  'junior',
  'middle',
  'senior',
]);

export const interviewModeEnum = pgEnum('interview_mode', [
  'practice',
  'mock',
  'deep-dive',
]);

export const interviewStatusEnum = pgEnum('interview_status', [
  'active',
  'completed',
]);

export const interviewSessions = pgTable('interview_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: text('user_id'),

  topic: text('topic').notNull(),
  level: interviewLevelEnum('level').notNull(),
  mode: interviewModeEnum('mode').notNull(),

  status: interviewStatusEnum('status').notNull().default('active'),

  averageScore: integer('average_score').default(0),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const interviewAnswers = pgTable('interview_answers', {
  id: uuid('id').defaultRandom().primaryKey(),

  sessionId: uuid('session_id')
    .notNull()
    .references(() => interviewSessions.id, { onDelete: 'cascade' }),

  question: text('question').notNull(),
  answer: text('answer').notNull(),

  score: integer('score').notNull(),

  strengths: jsonb('strengths').$type<string[]>().notNull(),
  weaknesses: jsonb('weaknesses').$type<string[]>().notNull(),

  seniorAnswer: text('senior_answer').notNull(),
  followUpQuestion: text('follow_up_question').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});