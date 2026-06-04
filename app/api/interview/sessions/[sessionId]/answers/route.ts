import { created } from "@/lib/api/responses";
import { errorResponse } from "@/lib/auth/error-response";
import { requireSessionOwner } from "@/lib/auth/ownership";
import { saveInterviewAnswer } from "@/lib/services/interview-service";
import { saveInterviewAnswerSchema } from "@/lib/validations/interview";

type Params = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function POST(req: Request, { params }: Params) {
  try {
    const { sessionId } = await params;
    await requireSessionOwner(sessionId);
    const body = saveInterviewAnswerSchema.parse(await req.json());

    const {
      question,
      answer,
      score,
      strengths,
      weaknesses,
      seniorAnswer,
      followUpQuestion,
    } = body;

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

    return created(savedAnswer);
  } catch (error) {
    console.error("Save answer error:", error);
    return errorResponse(error);
  }
}
