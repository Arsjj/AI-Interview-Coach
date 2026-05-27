import { notFound, redirect } from 'next/navigation';
import { getInterviewAnswers, getInterviewSessionById } from '@/lib/services/interview-service';
import InterviewDetailUi from '@/components/interview/InterviewDetailUi';
import { auth } from '@/auth';

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default async function InterviewDetailPage({ params }: Props) {
  const userSession = await auth();
  const { sessionId } = await params;
  if (!userSession?.user?.email) {
    redirect('/api/auth/signin');
  }

  const session = await getInterviewSessionById(sessionId);

  if (!session || session.userId !== userSession.user.email) {
    redirect('/api/auth/signin');
  }
  const answers = await getInterviewAnswers(sessionId)

  return (
    <InterviewDetailUi answers={answers} session={session} />
  );
}

