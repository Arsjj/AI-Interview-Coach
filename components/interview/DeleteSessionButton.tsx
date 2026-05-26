// components/interview/DeleteSessionButton.tsx
'use client';

import { useRouter } from 'next/navigation';

type Props = {
  sessionId: string;
  onDeleted?: () => void;
};
export function DeleteSessionButton({
  sessionId,
  onDeleted
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm('Delete this interview session?');

    if (!confirmed) return;

    const res = await fetch(`/api/interview/sessions/${sessionId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Delete session error:', errorText);
      return;
    }

    if (onDeleted) {
      onDeleted();
    } else {
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
    >
      Delete
    </button>
  );
}