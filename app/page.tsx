import { auth } from "@/auth";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default async function Home() {
  const session = await auth();

  return <ChatWindow logged={session?.user?.email} />
}


