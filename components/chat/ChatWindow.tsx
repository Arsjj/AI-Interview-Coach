import { ChatWindowUI } from './ChatWindowUI';
import { auth } from '@/auth';

export async function ChatWindow() {
  const session = await auth();

  return <ChatWindowUI logged={session?.user?.email} />
}


