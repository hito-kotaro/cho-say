"use client";

import { Response } from "@/lib/types";

interface AttendanceTableProps {
  dates: string[];
  responses: Response[];
}

function formatDate(dateStr: string): string {
  // dateStr can be "2026-04-15" or "2026-04-15 19:00"
  const [datePart, timePart] = dateStr.split(" ");
  const d = new Date(datePart + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[d.getDay()];
  const base = `${month}/${day}(${weekday})`;
  return timePart ? `${base} ${timePart}` : base;
}

function AvailabilityBadge({ value }: { value: "ok" | "maybe" | "ng" }) {
  const config = {
    ok: { label: "○", bg: "bg-green-100", text: "text-green-700" },
    maybe: { label: "△", bg: "bg-yellow-100", text: "text-yellow-700" },
    ng: { label: "×", bg: "bg-red-100", text: "text-red-600" },
  };
  const c = config[value];
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${c.bg} ${c.text} font-bold text-sm`}
    >
      {c.label}
    </span>
  );
}

export default function AttendanceTable({
  dates,
  responses,
}: AttendanceTableProps) {
  const okCounts = dates.map(
    (date) => responses.filter((r) => r.availability[date] === "ok").length
  );

  if (responses.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-muted">
        まだ回答がありません
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-orange-50/50">
            <th className="sticky left-0 z-10 bg-orange-50 px-4 py-3 text-left font-semibold text-foreground">
              名前
            </th>
            {dates.map((date) => (
              <th
                key={date}
                className="px-3 py-3 text-center font-semibold text-foreground whitespace-nowrap"
              >
                {formatDate(date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((resp) => (
            <tr key={resp.id} className="border-b border-border last:border-0">
              <td className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-foreground whitespace-nowrap">
                {resp.name}
              </td>
              {dates.map((date) => (
                <td key={date} className="px-3 py-3 text-center">
                  {resp.availability[date] ? (
                    <AvailabilityBadge value={resp.availability[date]} />
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-orange-50/50">
            <td className="sticky left-0 z-10 bg-orange-50 px-4 py-3 font-bold text-primary">
              ○ 合計
            </td>
            {okCounts.map((count, i) => (
              <td
                key={dates[i]}
                className="px-3 py-3 text-center font-bold text-primary"
              >
                {count}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
