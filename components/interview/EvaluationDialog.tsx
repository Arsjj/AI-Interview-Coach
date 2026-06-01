import { Evaluation } from "@/lib/validations/interview";

type Props = {
  open: boolean;
  evaluation: Evaluation | null,
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
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-full flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 dark:border-white/10 dark:bg-slate-950 sm:max-w-xl ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 p-4 dark:border-white/10 sm:p-6">
          <h2 className="text-lg font-bold sm:text-xl">Evaluation</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-3 py-2 text-sm dark:border-white/10"
          >
            Close
          </button>
        </div>

        <div className="hide-scrollbar flex-1 overflow-y-auto p-4 pb-safe sm:p-6">
          {evaluation ? (
            <div className="space-y-5 sm:space-y-6">
              <div className="rounded-2xl bg-blue-500/10 p-4 sm:p-5">
                <p className="text-sm text-slate-500 dark:text-slate-400">Score</p>
                <h3 className="mt-2 text-3xl font-bold sm:text-4xl">
                  {evaluation.score}/10
                </h3>
              </div>

              <div>
                <h4 className="mb-3 text-base font-semibold sm:text-lg">Strengths</h4>
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
                <h4 className="mb-3 text-base font-semibold sm:text-lg">Weaknesses</h4>
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
                <h4 className="mb-3 text-base font-semibold sm:text-lg">Senior Answer</h4>
                <div className="rounded-2xl bg-slate-100 p-4 text-sm leading-6 dark:bg-white/5">
                  {evaluation.seniorAnswer}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-base font-semibold sm:text-lg">Follow-up Question</h4>
                <div className="rounded-2xl bg-violet-500/10 p-4 text-sm">
                  {evaluation.followUpQuestion}
                </div>
              </div>
            </div>
          ) : (
            <p>No evaluation yet.</p>
          )}
        </div>
      </aside>
    </>
  );
}
