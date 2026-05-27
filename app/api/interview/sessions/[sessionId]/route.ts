import { success } from "@/lib/api/responses";
import { errorResponse } from "@/lib/auth/error-response";
import { requireSessionOwner } from "@/lib/auth/ownership";
import { deleteInterviewSession } from "@/lib/services/interview-service";

type Params = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { sessionId } = await params;
    const { session } = await requireSessionOwner(sessionId);

    const deletedSession = await deleteInterviewSession(session.id);
    return success(deletedSession);
  } catch (error) {
    console.error("Delete session error", error);
    return errorResponse(error);
  }
}
