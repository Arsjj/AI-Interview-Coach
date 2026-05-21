import { convertToModelMessages, streamText, UIMessage, stepCountIs } from "ai";

import { interviewModel } from "@/lib/ai/model";
import { generateQuestionTool } from "@/lib/ai/tools/generateQuestion";

export async function POST(req: Request) {
  const { messages, topic }: { messages: UIMessage[]; topic?: string } =
    await req.json();

  const result = streamText({
    model: interviewModel,

    system: `
You are a senior interview coach.

If the user wants to start an interview, call generateQuestion.
After the tool returns a question, show that question to the user.
Do not only call the tool. Always continue with a final assistant message.
`,

    messages: await convertToModelMessages(messages),

    tools: {
      generateQuestion: generateQuestionTool,
    },

    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}
