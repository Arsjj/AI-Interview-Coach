import { ChatWindowUI } from './ChatWindowUI';
import { auth } from '@/auth';

export async function ChatWindow() {
  const session = await auth();
  console.log(session);
  

  return <ChatWindowUI logged={session?.user?.email} />
}


