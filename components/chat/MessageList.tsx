import type { UIMessage } from 'ai';
import { MessageItem } from './MessageItem';

type Props = {
  messages: UIMessage[];
};

export function MessageList({ messages }: Props) {
  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center text-center text-sm text-slate-500 dark:text-slate-400">
        Choose a topic and type “Start interview”.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}