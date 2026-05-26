// app/api/interview/sessions/route.ts
import {
  createInterviewSession,
  getInterviewSessions,
} from '@/lib/services/interview-service';

export async function GET() {
  const sessions = await getInterviewSessions();
  return Response.json(sessions);
}

export async function POST(req: Request) {
  try {
    const { topic, level, mode } = await req.json();

    if (!topic || !level || !mode) {
      return Response.json(
        { error: 'topic, level and mode are required' },
        { status: 400 },
      );
    }

    const session = await createInterviewSession({
      topic,
      level,
      mode,
    });

    return Response.json(session);
  } catch (error) {
    console.error('Create session error:', error);

    return Response.json(
      { error: 'Failed to create interview session' },
      { status: 500 },
    );
  }
}