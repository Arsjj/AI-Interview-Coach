// app/api/interview/sessions/route.ts
import { auth } from '@/auth';
import {
  createInterviewSession,
  getInterviewSessions,
} from '@/lib/services/interview-service';

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sessions = await getInterviewSessions(session.user.email);

  return Response.json(sessions);
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const { topic, level, mode } = await req.json();

    const interviewSession = await createInterviewSession({
      topic,
      level,
      mode,
      userId: session.user.email,
    });

    return Response.json(interviewSession);
  } catch (error) {
    console.error('Create session error:', error);

    return Response.json(
      { error: 'Failed to create interview session' },
      { status: 500 },
    );
  }
}

// export async function GET() {
//   const sessions = await getInterviewSessions();
//   return Response.json(sessions);
// }

// export async function POST(req: Request) {
//   try {
//     const { topic, level, mode } = await req.json();

//     if (!topic || !level || !mode) {
//       return Response.json(
//         { error: 'topic, level and mode are required' },
//         { status: 400 },
//       );
//     }

//     const session = await createInterviewSession({
//       topic,
//       level,
//       mode,
//     });

//     return Response.json(session);
//   } catch (error) {
//     console.error('Create session error:', error);

//     return Response.json(
//       { error: 'Failed to create interview session' },
//       { status: 500 },
//     );
//   }
// }