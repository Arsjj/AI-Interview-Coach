import { INTERVIEW_MODES } from "@/constants";
import { InterviewMode } from "@/types";

type Props = {
    value: InterviewMode;
    onChange: (mode: InterviewMode) => void;
};

export function ModeSelector({ value, onChange }: Props) {
    return (
        <select
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-400 dark:border-white/10 dark:bg-slate-800 dark:text-white sm:py-3"
            value={value}
            onChange={(e) => onChange(e.target.value as InterviewMode)}
        >
            {INTERVIEW_MODES.map((level) => (
                <option key={level} value={level}>
                    {level[0].toUpperCase() + level.slice(1)}
                </option>
            ))}
        </select>
    );
}