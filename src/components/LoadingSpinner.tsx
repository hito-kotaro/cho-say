"use client";

export default function LoadingSpinner({ message = "読み込み中..." }: { message?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </div>
      <p className="text-sm font-medium text-muted animate-pulse">{message}</p>
    </div>
  );
}
