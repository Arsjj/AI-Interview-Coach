// components/interview/SessionStats.tsx
type Props = {
  answeredCount: number;
  averageScore: number;
};

export function SessionStats({ answeredCount, averageScore }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Evaluated
        </p>
        <p className="mt-1 text-2xl font-bold">{answeredCount}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Avg score
        </p>
        <p className="mt-1 text-2xl font-bold">
          {averageScore ? averageScore.toFixed(1) : '—'}
        </p>
      </div>
    </div>
  );
}