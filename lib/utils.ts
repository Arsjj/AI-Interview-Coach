import { DashboardStats } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardCards(stats: DashboardStats) {
    return [
        {
            label: 'Total interviews',
            value: stats.totalSessions,
        },
        {
            label: 'Completed',
            value: stats.completedSessions,
        },
        {
            label: 'Average score',
            value: stats.averageScore ?? '—',
        },
        {
            label: 'Best topic',
            value: stats.bestTopic
                ? `${stats.bestTopic.topic} (${stats.bestTopic.average})`
                : '—',
        },
        {
            label: 'Weakest topic',
            value: stats.weakestTopic
                ? `${stats.weakestTopic.topic} (${stats.weakestTopic.average})`
                : '—',
        },
        {
            label: 'Total answers',
            value: stats.totalAnswers,
        },
    ];
}