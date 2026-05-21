type Props = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({ value, disabled, onChange, onSubmit }: Props) {
  return (
    <form
      className="mt-6 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="flex-1 rounded border p-3"
        value={value}
        placeholder="Ask for a question or write your answer..."
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        className="rounded bg-black px-5 py-3 text-white disabled:opacity-50"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}
