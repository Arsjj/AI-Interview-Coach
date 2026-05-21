import { INTERVIEW_TOPICS } from "@/constants/interview-topics";


type Props = {
  value: string;
  onChange: (topic: string) => void;
};

export function TopicSelector({ value, onChange }: Props) {
  return (
    <select
      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none focus:border-blue-400 dark:border-white/10 dark:bg-slate-800 dark:text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {INTERVIEW_TOPICS.map((topic) => (
        <option key={topic} value={topic}>
          {topic}
        </option>
      ))}
    </select>
  );
}
