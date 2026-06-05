'use client'
import { ArrowUp } from 'lucide-react';

type Props = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({ value, disabled, onChange, onSubmit }: Props) {

  return (
    <>
      <div className="max-md:hidden">
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
            className="w-full shrink-0 rounded-xl cursor-pointer bg-black px-5 py-2.5 text-sm font-medium text-white hover:opacity-70 dark:hover:opacity-80 disabled:opacity-50 sm:w-auto sm:py-3"
            disabled={disabled}
          >
            Send
          </button>
        </form>
      </div>
      <div className='md:hidden'>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
          className="relative">
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-2 dark:border-white/10 dark:bg-slate-900">
            <input
              value={value}
              className="flex-1 rounded-xl border-slate-300 bg-white px-3 py-2.5 text-base text-slate-950 outline-none focus:border-blue-400 border-0 dark:bg-slate-800 dark:text-white sm:p-3 sm:text-sm"
              placeholder="Ask for a question or write your answer..."
              onChange={(e) => onChange(e.target.value)}
            />
            <button
              type="submit"
              disabled={disabled}
              className="flex h-10 w-10 p-2.5 shrink-0 items-center justify-center rounded-full bg-black dark:bg-blue-500 text-white"
            >
              <ArrowUp />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
