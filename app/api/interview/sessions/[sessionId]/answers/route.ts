import { db } from '@/lib/db';
import { interviewAnswers } from '@/lib/db/schema';

type Params = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function POST(req: Request, { params }: Params) {
  try {
    const { sessionId } = await params;

    const {
      question,
      answer,
      score,
      strengths,
      weaknesses,
      seniorAnswer,
      followUpQuestion,
    } = await req.json();

    console.log('sessionId:', sessionId);

    const [savedAnswer] = await db
      .insert(interviewAnswers)
      .values({
        sessionId,
        question,
        answer,
        score,
        strengths,
        weaknesses,
        seniorAnswer,
        followUpQuestion,
      })
      .returning();

    return Response.json(savedAnswer);
  } catch (error) {
    console.error('Save answer error:', error);

    return Response.json(
      { error: 'Failed to save answer' },
      { status: 500 },
    );
  }
}