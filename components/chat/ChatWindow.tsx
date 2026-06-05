import { auth } from '@/auth';
import { ChatWindowUI } from './ChatWindowUI';

export async function ChatWindow() {
  const session = await auth();

  return <ChatWindowUI logged={session?.user?.email} />
}


