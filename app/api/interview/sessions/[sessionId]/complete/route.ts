import { completeInterviewSession } from '@/lib/services/interview-service';

type Params = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function PATCH(_: Request, { params }: Params) {
  try {
    const { sessionId } = await params;

    const session = await completeInterviewSession(sessionId);

    return Response.json(session);
  } catch (error) {
    console.error('Complete session error:', error);

    return Response.json(
      { error: 'Failed to complete session' },
      { status: 500 },
    );
  }
}