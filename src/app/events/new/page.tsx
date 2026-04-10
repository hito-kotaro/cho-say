"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // date -> time mapping (e.g. "2026-04-15" -> "19:00")
  const [selectedDates, setSelectedDates] = useState<Map<string, string>>(new Map());
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function toggleDate(dateStr: string) {
    setSelectedDates((prev) => {
      const next = new Map(prev);
      if (next.has(dateStr)) {
        next.delete(dateStr);
      } else {
        next.set(dateStr, "19:00"); // デフォルト開始時間
      }
      return next;
    });
  }

  function updateTime(dateStr: string, time: string) {
    setSelectedDates((prev) => {
      const next = new Map(prev);
      next.set(dateStr, time);
      return next;
    });
  }

  function getCalendarDays() {
    const { year, month } = calendarMonth;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay(); // 0=Sun
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }

  function formatDate(day: number) {
    const { year, month } = calendarMonth;
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  }

  function isPast(day: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { year, month } = calendarMonth;
    return new Date(year, month, day) < today;
  }

  function prevMonth() {
    setCalendarMonth((prev) => {
      const d = new Date(prev.year, prev.month - 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  function nextMonth() {
    setCalendarMonth((prev) => {
      const d = new Date(prev.year, prev.month + 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validDates = Array.from(selectedDates.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, time]) => `${date} ${time}`);
    if (!title.trim()) {
      setError("イベント名を入力してください");
      return;
    }
    if (validDates.length === 0) {
      setError("候補日を1つ以上選択してください");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          dates: validDates,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "イベントの作成に失敗しました");
      }

      const event = await res.json();
      router.push(`/events/${event.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "イベントの作成に失敗しました"
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Link
            href="/"
            className="text-xl font-extrabold text-primary hover:opacity-80 transition-opacity"
          >
            cho-say
          </Link>
          <span className="text-muted">/</span>
          <span className="font-medium text-foreground">イベント作成</span>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-foreground">
            🎉 新しいイベントを作成
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* イベント名 */}
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                イベント名 <span className="text-danger">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例: 忘年会2026"
                className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* 説明 */}
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                説明{" "}
                <span className="text-sm font-normal text-muted">
                  (任意)
                </span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="例: 今年もお疲れさまでした！みんなで飲みましょう"
                rows={3}
                className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            {/* 候補日カレンダー */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                候補日 <span className="text-danger">*</span>
              </label>
              <p className="mb-3 text-sm text-muted">
                日付をクリックして選択 / 解除できます
              </p>

              {/* カレンダー */}
              <div className="rounded-lg border border-border bg-card p-4">
                {/* 月ナビゲーション */}
                <div className="mb-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="rounded-lg px-3 py-1 text-sm font-medium text-muted hover:bg-background hover:text-foreground transition-colors"
                  >
                    ‹ 前月
                  </button>
                  <span className="text-sm font-bold text-foreground">
                    {calendarMonth.year}年{calendarMonth.month + 1}月
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="rounded-lg px-3 py-1 text-sm font-medium text-muted hover:bg-background hover:text-foreground transition-colors"
                  >
                    翌月 ›
                  </button>
                </div>

                {/* 曜日ヘッダー */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {["日", "月", "火", "水", "木", "金", "土"].map((dow, i) => (
                    <div
                      key={dow}
                      className={`text-center text-xs font-medium py-1 ${
                        i === 0
                          ? "text-red-400"
                          : i === 6
                            ? "text-blue-400"
                            : "text-muted"
                      }`}
                    >
                      {dow}
                    </div>
                  ))}
                </div>

                {/* 日付グリッド */}
                <div className="grid grid-cols-7 gap-1">
                  {getCalendarDays().map((day, i) => {
                    if (day === null) {
                      return <div key={`empty-${i}`} />;
                    }
                    const dateStr = formatDate(day);
                    const selected = selectedDates.has(dateStr);
                    const past = isPast(day);
                    const dow = (new Date(calendarMonth.year, calendarMonth.month, day)).getDay();

                    return (
                      <button
                        key={dateStr}
                        type="button"
                        disabled={past}
                        onClick={() => toggleDate(dateStr)}
                        className={`
                          aspect-square rounded-lg text-sm font-medium transition-all
                          ${past
                            ? "text-muted/30 cursor-not-allowed"
                            : selected
                              ? "bg-primary text-white shadow-sm scale-105"
                              : dow === 0
                                ? "text-red-500 hover:bg-red-50"
                                : dow === 6
                                  ? "text-blue-500 hover:bg-blue-50"
                                  : "text-foreground hover:bg-background"
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 選択された日付一覧 + 開始時間 */}
              {selectedDates.size > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-semibold text-foreground">選択中の候補日（開始時間を設定）</p>
                  {Array.from(selectedDates.entries())
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([d, time]) => {
                      const date = new Date(d + "T00:00:00");
                      const label = `${date.getMonth() + 1}/${date.getDate()}(${["日", "月", "火", "水", "木", "金", "土"][date.getDay()]})`;
                      return (
                        <div
                          key={d}
                          className="flex items-center gap-3 rounded-lg bg-primary/5 px-3 py-2"
                        >
                          <span className="text-sm font-medium text-primary min-w-[5rem]">
                            {label}
                          </span>
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => updateTime(d, e.target.value)}
                            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <button
                            type="button"
                            onClick={() => toggleDate(d)}
                            className="ml-auto text-muted hover:text-danger transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary py-3.5 text-lg font-bold text-white shadow-md hover:bg-primary-hover hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "作成中..." : "イベントを作成する"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
