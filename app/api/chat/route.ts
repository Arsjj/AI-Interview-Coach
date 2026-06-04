import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { interviewModel } from '@/lib/ai/model';
import { getInterviewSystemPrompt } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  const {
    messages,
    topic,
    level,
    mode,
  }: {
    messages: UIMessage[];
    topic?: string;
    level?: string;
    mode?: string;
  } = await req.json();

  const result = streamText({
    model: interviewModel,
    system: getInterviewSystemPrompt(
      topic || 'React',
      level || 'senior',
      mode || 'practice',
    ),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}