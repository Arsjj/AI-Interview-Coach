type Props = {
  answeredCount: number;
  averageScore: number;
};

export function SessionStats({ answeredCount, averageScore }: Props) {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:max-w-56 sm:gap-3">
      <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5 sm:rounded-2xl sm:p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Evaluated
        </p>
        <p className="mt-1 text-xl font-bold sm:text-2xl">{answeredCount}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5 sm:rounded-2xl sm:p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Avg score
        </p>
        <p className="mt-1 text-xl font-bold sm:text-2xl">
          {averageScore ? averageScore.toFixed(1) : '—'}
        </p>
      </div>
    </div>
  );
}
