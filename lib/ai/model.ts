import { groq } from '@ai-sdk/groq';

export const interviewModel = groq('llama-3.1-8b-instant');
export const evaluationModel = groq('openai/gpt-oss-120b');