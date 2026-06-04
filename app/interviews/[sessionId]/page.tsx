import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { InterviewDetails } from '@/components/interview/InterviewDetails';
import { getInterviewAnswers, getInterviewSession } from '@/lib/services/interview-service';

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

  const session = await getInterviewSession(sessionId);

  if (!session || session.userId !== userSession.user.email) {
    redirect('/api/auth/signin');
  }
  const answers = await getInterviewAnswers(sessionId)

  return (
    <InterviewDetails answers={answers} session={session} />
  );
}

