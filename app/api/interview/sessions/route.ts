import { created, success } from "@/lib/api/responses";
import { errorResponse } from "@/lib/auth/error-response";
import { requireUser } from "@/lib/auth/require-user";
import {
  createInterviewSession,
  getInterviewSessions,
} from "@/lib/services/interview-service";

export async function GET() {
  const user = await requireUser();
  const sessions = await getInterviewSessions(user.email);

  return success(sessions);
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const { topic, level, mode } = await req.json();

    const interviewSession = await createInterviewSession({
      topic,
      level,
      mode,
      userId: user.email,
    });

    return created(interviewSession);
  } catch (error) {
    console.error("Create session error:", error);
    return errorResponse(error);
  }
}
