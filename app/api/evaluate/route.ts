// app/api/evaluate/route.ts
import { generateText } from 'ai';
import { interviewModel } from '@/lib/ai/model';
import { evaluationSchema } from '@/lib/ai/schemas/evaluation';

function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error('No JSON found in model response');
  }

  return JSON.parse(match[0]);
}

export async function POST(req: Request) {
  try {
    const { topic, level, question, answer } = await req.json();

    const result = await generateText({
      model: interviewModel,
      prompt: `
Return ONLY valid JSON. No markdown. No explanation.

The JSON MUST have exactly these root fields:
{
  "score": 1,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "seniorAnswer": "string",
  "followUpQuestion": "string"
}

Rules:
- score must be from 1 to 10
- do not wrap result in "evaluation"
- do not add extra root keys

Topic: ${topic || 'React'}
Level: ${level || 'senior'}

Question:
${question || 'Unknown question'}

Candidate answer:
${answer}
`,
    });

    const parsed = extractJson(result.text);
    const evaluation = evaluationSchema.parse(parsed);

    return Response.json(evaluation);
  } catch (error) {
    console.error('Evaluate route error:', error);

    return Response.json(
      {
        error: 'Evaluation failed',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}