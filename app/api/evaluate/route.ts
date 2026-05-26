// app/api/evaluate/route.ts
import { generateText } from "ai";
import { interviewModel } from "@/lib/ai/model";
import { evaluationSchema } from "@/lib/ai/schemas/evaluation";

function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON found in model response");
  }

  return JSON.parse(match[0]);
}

export async function POST(req: Request) {
  try {
    const { topic, level, question, answer } = await req.json();

    const result = await generateText({
      model: interviewModel,
      prompt: `
      You are an API that returns JSON only.

       Return ONLY this JSON object. No markdown. No explanation. No text before or after.
       {
         "score": 1,
         "strengths": [],
        "weaknesses": [],
        "seniorAnswer": "",
        "followUpQuestion": ""
      }

      Evaluate this answer:

      Topic: ${topic || "React"}
      Level: ${level || "senior"}

      Question:
      ${question || "Unknown question"}

      Candidate answer:
      ${answer}
      `,
    });

    const evaluation = safeParseEvaluation(result.text);

    return Response.json(evaluation);
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

function safeParseEvaluation(text: string) {
  const match = text.match(/\{[\s\S]*\}/);

  if (!match) {
    return {
      score: 1,
      strengths: [],
      weaknesses: ["The model did not return valid JSON."],
      seniorAnswer: text || "No evaluation returned.",
      followUpQuestion: "Can you explain your answer again with more detail?",
    };
  }

  return evaluationSchema.parse(JSON.parse(match[0]));
}
