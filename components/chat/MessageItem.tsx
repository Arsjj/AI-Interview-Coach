import type { UIMessage } from 'ai';

type Props = {
  message: UIMessage;
};

export function MessageItem({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl border px-4 py-3 text-sm leading-6 ${
          isUser
            ? 'border-blue-200 bg-blue-50 text-slate-950 dark:border-blue-400/20 dark:bg-blue-500/15 dark:text-white'
            : 'border-slate-200 bg-white text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-white'
        }`}
      >
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {isUser ? 'You' : 'AI Coach'}
        </p>

        {message.parts.map((part, index) =>
          part.type === 'text' ? (
            <div key={index} className="whitespace-pre-wrap">
              {part.text}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}