import { deleteInterviewSession } from "@/lib/services/interview-service";

type Params = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { sessionId } = await params;

    const deletedSession = await deleteInterviewSession(sessionId);
    return Response.json(deletedSession);
  } catch (error) {
    console.error("Delete session error", error);

    return Response.json(
      { error: "Failed to delete session" },
      { status: 5000 },
    );
  }
}
