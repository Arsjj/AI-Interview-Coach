import { INTERVIEW_LEVELS, InterviewLevel } from "@/constants/interview-topics";

type Props = {
    value: InterviewLevel;
    onChange: (level: InterviewLevel) => void;
};

export function LevelSelector({ value, onChange }: Props) {
    return (
        <select
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none focus:border-blue-400 dark:border-white/10 dark:bg-slate-800 dark:text-white"
            value={value}
            onChange={(e) => onChange(e.target.value as InterviewLevel)}
        >
            {INTERVIEW_LEVELS.map((level) => (
                <option key={level} value={level}>
                    {level[0].toUpperCase() + level.slice(1)}
                </option>
            ))}
        </select>
    );
}