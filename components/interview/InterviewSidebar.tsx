'use client';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function InterviewSidebar({ open, onClose, children }: Props) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-dvh w-80 border-r border-slate-200 bg-white p-4 transition-transform duration-300 dark:border-white/10 dark:bg-slate-950 lg:static lg:z-auto lg:h-full lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {children}
      </aside>
    </>
  );
}