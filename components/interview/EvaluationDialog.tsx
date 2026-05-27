import { Evaluation } from "@/lib/validations/interview";

type Props = {
  open: boolean;
  evaluation: Evaluation,
  onClose: () => void;
};

export function EvaluationDrawer({ open, evaluation, onClose }: Props) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl transform border-l border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-300 dark:border-white/10 dark:bg-slate-950 ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Evaluation</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-3 py-2 text-sm dark:border-white/10"
          >
            Close
          </button>
        </div>

        {evaluation ? (
          <div className="space-y-6">
            <div className="rounded-2xl bg-blue-500/10 p-5">
              <p className="text-sm text-slate-500 dark:text-slate-400">Score</p>
              <h3 className="mt-2 text-4xl font-bold">
                {evaluation.score}/10
              </h3>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold">Strengths</h4>
              <ul className="space-y-2">
                {evaluation.strengths.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-emerald-500/10 p-3 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold">Weaknesses</h4>
              <ul className="space-y-2">
                {evaluation.weaknesses.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-red-500/10 p-3 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold">Senior Answer</h4>
              <div className="rounded-2xl bg-slate-100 p-4 text-sm leading-6 dark:bg-white/5">
                {evaluation.seniorAnswer}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold">Follow-up Question</h4>
              <div className="rounded-2xl bg-violet-500/10 p-4 text-sm">
                {evaluation.followUpQuestion}
              </div>
            </div>
          </div>
        ) : (
          <p>No evaluation yet.</p>
        )}
      </aside>
    </>
  );
}
