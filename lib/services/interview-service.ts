import { avg, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { interviewAnswers, interviewSessions } from "@/lib/db/schema";
import type { Evaluation } from "@/lib/ai/schemas/evaluation";

export async function createInterviewSession(data: {
  topic: string;
  level: "junior" | "middle" | "senior";
  mode: "practice" | "mock" | "deep-dive";
  userId: string;
}) {
  const [session] = await db.insert(interviewSessions).values(data).returning();
  return session;
}

export async function getInterviewSession(sessionId: string) {
  const [session] = await db
    .select()
    .from(interviewSessions)
    .where(eq(interviewSessions.id, sessionId));

  return session ?? null;
}

export async function getInterviewSessions(userId: string) {
  return db
    .select()
    .from(interviewSessions)
    .where(eq(interviewSessions.userId, userId))
    .orderBy(desc(interviewSessions.createdAt));
}

export async function completeInterviewSession(sessionId: string) {
  const [session] = await db
    .update(interviewSessions)
    .set({
      status: "completed",
      updatedAt: new Date(),
    })
    .where(eq(interviewSessions.id, sessionId))
    .returning();

  return session;
}

export async function deleteInterviewSession(sessionId: string) {
  const [deletedSession] = await db
    .delete(interviewSessions)
    .where(eq(interviewSessions.id, sessionId))
    .returning();

  return deletedSession ?? null;
}

export async function updateSessionAverageScore(sessionId: string) {
  const [result] = await db
    .select({
      averageScore: avg(interviewAnswers.score),
    })
    .from(interviewAnswers)
    .where(eq(interviewAnswers.sessionId, sessionId));

  const averageScore = result?.averageScore
    ? Math.round(Number(result.averageScore))
    : 0;

  await db
    .update(interviewSessions)
    .set({
      averageScore,
      updatedAt: new Date(),
    })
    .where(eq(interviewSessions.id, sessionId));

  return averageScore;
}




export async function getInterviewAnswers(sessionId: string) {
  return db
    .select()
    .from(interviewAnswers)
    .where(eq(interviewAnswers.sessionId, sessionId));
}

export async function saveInterviewAnswer(data: {
  sessionId: string;
  question: string;
  answer: string;
  evaluation: Evaluation;
}) {
  const [savedAnswer] = await db
    .insert(interviewAnswers)
    .values({
      sessionId: data.sessionId,
      question: data.question,
      answer: data.answer,
      score: data.evaluation.score,
      strengths: data.evaluation.strengths,
      weaknesses: data.evaluation.weaknesses,
      seniorAnswer: data.evaluation.seniorAnswer,
      followUpQuestion: data.evaluation.followUpQuestion,
    })
    .returning();
  await updateSessionAverageScore(data.sessionId);

  return savedAnswer;
}

export async function getInterviewDashboardStats(userId: string) {
  const sessions = await getInterviewSessions(userId);

  const sessionIds = sessions.map((session) => session.id);

  const answers =
    sessionIds.length === 0
      ? []
      : await db
          .select()
          .from(interviewAnswers)
          .where(inArray(interviewAnswers.sessionId, sessionIds));

  const totalAnswers = answers.length;

  const totalSessions = sessions.length;

  const completedSessions = sessions.filter(
    (session) => session.status === "completed",
  ).length;

  const scoredSessions = sessions.filter(
    (session) => session.averageScore !== null,
  );

  const averageScore =
    scoredSessions.length === 0
      ? 0
      : Math.round(
          scoredSessions.reduce(
            (sum, session) => sum + (session.averageScore || 0),
            0,
          ) / scoredSessions.length,
        );

  const topicScores = new Map<string, number[]>();

  for (const session of scoredSessions) {
    const scores = topicScores.get(session.topic) ?? [];
    scores.push(session.averageScore || 0);
    topicScores.set(session.topic, scores);
  }

  const topicAverages = [...topicScores.entries()].map(([topic, scores]) => ({
    topic,
    average: Math.round(
      scores.reduce((sum, score) => sum + score, 0) / scores.length,
    ),
  }));

  const bestTopic = topicAverages.sort((a, b) => b.average - a.average)[0];
  const weakestTopic = topicAverages.sort((a, b) => a.average - b.average)[0];

  return {
    totalSessions,
    completedSessions,
    averageScore,
    bestTopic,
    weakestTopic,
    totalAnswers,
  };
}
