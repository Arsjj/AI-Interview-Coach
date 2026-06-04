import { ForbiddenError } from './auth-errors';
import { requireUser } from './require-user';
import { getInterviewSession } from '@/lib/services/interview-service';

export async function requireSessionOwner(sessionId: string) {
  const user = await requireUser();
  const session = await getInterviewSession(sessionId);

  if (!session || session.userId !== user.email) {
    throw new ForbiddenError();
  }

  return { user, session };
}