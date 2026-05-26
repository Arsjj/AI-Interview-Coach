// app/api/interview/sessions/[sessionId]/answers/route.ts
import { saveInterviewAnswer } from '@/lib/services/interview-service';

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

    const savedAnswer = await saveInterviewAnswer({
      sessionId,
      question,
      answer,
      evaluation: {
        score,
        strengths,
        weaknesses,
        seniorAnswer,
        followUpQuestion,
      },
    });

    return Response.json(savedAnswer);
  } catch (error) {
    console.error('Save answer error:', error);

    return Response.json(
      { error: 'Failed to save answer' },
      { status: 500 },
    );
  }
}