import { db } from "@/lib/db";
import { interviewAnswers, interviewSessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

    console.log("sessionId:", sessionId);

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
    console.error("Save answer error:", error);

    return Response.json({ error: "Failed to save answer" }, { status: 500 });
  }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { sessionId } = await params;
    const session = await db
      .select()
      .from(interviewAnswers)
      .where(eq(interviewSessions.id, sessionId));

    if (!session) {
      return Response.json({ error: "Session not found" }, { status: 404 });
    }

    const answers = await db
      .select()
      .from(interviewAnswers)
      .where(eq(interviewAnswers.sessionId, sessionId));

    return Response.json({
      session,
      answers,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to get session" }, { status: 500 });
  }
}
