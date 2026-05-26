import { notFound } from 'next/navigation';
import { getInterviewAnswers, getInterviewSessionById } from '@/lib/services/interview-service';
import InterviewDetailUi from '@/components/interview/InterviewDetailUi';

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default async function InterviewDetailPage({ params }: Props) {
  const { sessionId } = await params;
  const session = await getInterviewSessionById(sessionId)
  if (!session) return notFound()
  const answers = await getInterviewAnswers(sessionId)

  return (
    <InterviewDetailUi answers={answers} session={session} />
  );
}

