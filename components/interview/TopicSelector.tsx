import { INTERVIEW_TOPICS, InterviewTopic } from "@/constants/interview-topics";

type Props = {
  value: string;
  onChange: (topic: InterviewTopic) => void;
};

export function TopicSelector({ value, onChange }: Props) {
  return (
    <select
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none focus:border-blue-400 dark:border-white/10 dark:bg-slate-800 dark:text-white sm:py-3"
      value={value}
      onChange={(e) => onChange(e.target.value as InterviewTopic)}
    >
      {INTERVIEW_TOPICS.map((topic) => (
        <option key={topic} value={topic}>
          {topic}
        </option>
      ))}
    </select>
  );
}
