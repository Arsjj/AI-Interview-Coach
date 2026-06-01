type Props = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({ value, disabled, onChange, onSubmit }: Props) {
  return (
    <form
      className="mt-3 flex shrink-0 flex-col gap-2 sm:mt-6 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-950 outline-none focus:border-blue-400 dark:border-white/10 dark:bg-slate-800 dark:text-white sm:p-3 sm:text-sm"
        value={value}
        placeholder="Ask for a question or write your answer..."
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        type="submit"
        className="w-full shrink-0 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50 sm:w-auto sm:py-3"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}
