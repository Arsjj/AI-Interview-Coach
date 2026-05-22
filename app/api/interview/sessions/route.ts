import { db } from "@/lib/db";
import { interviewSessions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { topic, level, mode } = await req.json();

    if (!topic || !level || !mode) {
      return Response.json(
        { error: "topic, level and mode are required" },
        { status: 400 },
      );
    }

    const [session] = await db
      .insert(interviewSessions)
      .values({
        topic,
        level,
        mode,
      })
      .returning();

    return Response.json(session);
  } catch (error) {
    console.error("Create session error:", error);

    return Response.json(
      { error: "Failed to create interview session" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const sessions = await db
      .select()
      .from(interviewSessions)
      .orderBy(desc(interviewSessions.createdAt));
    return Response.json(sessions);
  } catch (error) {
    console.error("Get sessions error:", error);
    return Response.json({ error: "Failed to get sessions" }, { status: 500 });
  }
}
