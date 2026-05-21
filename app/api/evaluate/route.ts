// app/api/evaluate/route.ts
import { generateText, Output } from "ai";
import { evaluationModel } from "@/lib/ai/model";
import { evaluationSchema } from "@/lib/ai/schemas/evaluation";

export async function POST(req: Request) {
  try {
    const { topic, question, answer } = await req.json();

    if (!answer) {
      return Response.json({ error: "Answer is required" }, { status: 400 });
    }

    const { output } = await generateText({
      model: evaluationModel,
      output: Output.object({
        schema: evaluationSchema,
      }),
      prompt: `
You are a strict senior frontend interviewer.

Evaluate this answer.

Topic: ${topic || "React"}

Question:
${question || "Unknown question"}

Candidate answer:
${answer}

Return a realistic evaluation.
`,
    });

    return Response.json(output);
  } catch (error) {
    console.error("Evaluate route error:", error);

    return Response.json(
      {
        error: "Evaluation failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
