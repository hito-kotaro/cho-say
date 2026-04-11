"use client";

import { Response } from "@/lib/types";
import { formatDate } from "@/lib/format";

interface AttendanceTableProps {
  dates: string[];
  responses: Response[];
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
    <div className="-mx-3 sm:mx-0">
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-orange-50/50">
              <th className="sticky left-0 z-10 bg-orange-50 px-3 py-2.5 text-left text-xs font-semibold text-foreground sm:px-4 sm:py-3 sm:text-sm min-w-[4.5rem]">
                名前
              </th>
              {dates.map((date) => (
                <th
                  key={date}
                  className="px-2 py-2.5 text-center text-xs font-semibold text-foreground whitespace-nowrap sm:px-3 sm:py-3 sm:text-sm"
                >
                  {formatDate(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((resp) => (
              <tr key={resp.id} className="border-b border-border last:border-0">
                <td className="sticky left-0 z-10 bg-card px-3 py-2.5 text-xs font-medium text-foreground whitespace-nowrap sm:px-4 sm:py-3 sm:text-sm max-w-[6rem] truncate">
                  {resp.name}
                </td>
                {dates.map((date) => (
                  <td key={date} className="px-2 py-2.5 text-center sm:px-3 sm:py-3">
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
              <td className="sticky left-0 z-10 bg-orange-50 px-3 py-2.5 text-xs font-bold text-primary sm:px-4 sm:py-3 sm:text-sm">
                ○ 合計
              </td>
              {okCounts.map((count, i) => (
                <td
                  key={dates[i]}
                  className="px-2 py-2.5 text-center font-bold text-primary sm:px-3 sm:py-3"
                >
                  {count}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
