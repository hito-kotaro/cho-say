"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AttendanceTable from "@/components/AttendanceTable";
import ShopCard from "@/components/ShopCard";
import type {
  Event,
  Response as EventResponse,
  ShopVote,
  Shop,
  Area,
} from "@/lib/types";

type Tab = "attendance" | "shops";

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [responses, setResponses] = useState<EventResponse[]>([]);
  const [shopVotes, setShopVotes] = useState<ShopVote[]>([]);
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("attendance");

  const fetchEvent = useCallback(async () => {
    try {
      const res = await fetch(`/api/events/${id}`);
      if (!res.ok) throw new Error("イベントが見つかりません");
      const data = await res.json();
      setEvent(data.event);
      setResponses(data.responses);
      setShopVotes(data.shopVotes);
      setAllShops(data.shops);
      setAreas(data.areas);
    } catch {
      setError("イベントの読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-lg text-muted">読み込み中...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg text-danger">{error || "イベントが見つかりません"}</p>
        <Link href="/" className="text-primary hover:underline">
          トップに戻る
        </Link>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "attendance", label: "出欠表", emoji: "📅" },
    { key: "shops", label: "お店投票", emoji: "🏮" },
  ];

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Link
            href="/"
            className="text-xl font-extrabold text-primary hover:opacity-80 transition-opacity"
          >
            cho-say
          </Link>
        </div>
      </header>

      {/* Event Info */}
      <div className="border-b border-border bg-card px-3 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-xl font-bold text-foreground sm:text-3xl">
            🍺 {event.title}
          </h1>
          {event.description && (
            <p className="mt-2 text-muted">{event.description}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-orange-800">
              📅 {event.dates.length}つの候補日
            </span>
          </div>
          <ShareSection />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card px-4">
        <div className="mx-auto flex max-w-3xl gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 border-b-2 px-2 py-3 text-center text-sm font-semibold transition-colors min-h-[44px] sm:px-3 sm:text-base ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <main className="flex-1 px-3 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-3xl">
          {activeTab === "attendance" && (
            <AttendanceSection
              eventId={id}
              dates={event.dates}
              responses={responses}
              onUpdate={fetchEvent}
            />
          )}
          {activeTab === "shops" && (
            <ShopVoteSection
              eventId={id}
              areas={areas}
              allShops={allShops}
              shopVotes={shopVotes}
              onUpdate={fetchEvent}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* ===== Share Section ===== */
function ShareSection() {
  const [copied, setCopied] = useState(false);

  function copyUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="text"
        readOnly
        value={typeof window !== "undefined" ? window.location.href : ""}
        className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted"
        onClick={(e) => (e.target as HTMLInputElement).select()}
      />
      <button
        onClick={copyUrl}
        className="shrink-0 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-80 transition-opacity min-h-[44px]"
      >
        {copied ? "コピー済み!" : "URLをコピー"}
      </button>
    </div>
  );
}

/* ===== Attendance Section ===== */
function AttendanceSection({
  eventId,
  dates,
  responses,
  onUpdate,
}: {
  eventId: string;
  dates: string[];
  responses: EventResponse[];
  onUpdate: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState<
    Record<string, "ok" | "maybe" | "ng">
  >(() => {
    const init: Record<string, "ok" | "maybe" | "ng"> = {};
    dates.forEach((d) => (init[d] = "ok"));
    return init;
  });
  const [submitting, setSubmitting] = useState(false);

  function formatDate(dateStr: string): string {
    const [datePart, timePart] = dateStr.split(" ");
    const d = new Date(datePart + "T00:00:00");
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[d.getDay()];
    const base = `${month}/${day}(${weekday})`;
    return timePart ? `${base} ${timePart}` : base;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), availability }),
      });
      if (!res.ok) throw new Error();
      setName("");
      setShowForm(false);
      onUpdate();
    } catch {
      alert("回答の送信に失敗しました");
    } finally {
      setSubmitting(false);
    }
  }

  const options: { value: "ok" | "maybe" | "ng"; label: string; color: string }[] = [
    { value: "ok", label: "○", color: "bg-green-100 text-green-700 border-green-300" },
    { value: "maybe", label: "△", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
    { value: "ng", label: "×", color: "bg-red-100 text-red-600 border-red-300" },
  ];

  return (
    <div className="space-y-4">
      <AttendanceTable dates={dates} responses={responses} />

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-xl border-2 border-dashed border-primary/30 py-4 font-semibold text-primary hover:border-primary hover:bg-primary-light transition-colors min-h-[48px]"
        >
          📝 回答する
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-card p-3 shadow-sm space-y-4 sm:p-5"
        >
          <h3 className="font-bold text-foreground">出欠を回答する</h3>
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 田中太郎"
              className="w-full rounded-lg border border-border px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-3">
            {dates.map((date) => (
              <div key={date} className="flex items-center gap-2 sm:gap-3">
                <span className="w-auto min-w-[5rem] shrink-0 text-xs font-medium text-foreground sm:w-24 sm:text-sm">
                  {formatDate(date)}
                </span>
                <div className="flex gap-1.5">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setAvailability((prev) => ({
                          ...prev,
                          [date]: opt.value,
                        }))
                      }
                      className={`h-11 w-11 rounded-full border-2 text-sm font-bold transition-all sm:h-9 sm:w-9 ${
                        availability[date] === opt.value
                          ? `${opt.color} scale-110 shadow-sm`
                          : "border-border bg-card text-muted hover:border-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="flex-1 rounded-lg bg-primary py-3 font-bold text-white hover:bg-primary-hover transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {submitting ? "送信中..." : "回答を送信"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-border px-4 py-3 font-medium text-muted hover:text-foreground transition-colors min-h-[44px]"
            >
              キャンセル
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ===== Shop Vote Section ===== */
function ShopVoteSection({
  eventId,
  areas,
  allShops,
  shopVotes,
  onUpdate,
}: {
  eventId: string;
  areas: Area[];
  allShops: Shop[];
  shopVotes: ShopVote[];
  onUpdate: () => void;
}) {
  const [votingShopId, setVotingShopId] = useState<string | null>(null);

  const voteMap = new Map<string, number>();
  for (const v of shopVotes) {
    voteMap.set(v.shopId, v.count);
  }

  async function vote(shopId: string) {
    setVotingShopId(shopId);
    try {
      const res = await fetch(`/api/events/${eventId}/shops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId }),
      });
      if (!res.ok) throw new Error();
      onUpdate();
    } catch {
      alert("投票に失敗しました");
    } finally {
      setVotingShopId(null);
    }
  }

  const rankedShops = [...allShops].sort((a, b) => {
    const aVotes = voteMap.get(a.id) ?? 0;
    const bVotes = voteMap.get(b.id) ?? 0;
    return bVotes - aVotes;
  });

  const hasAnyVotes = shopVotes.length > 0;

  return (
    <div className="space-y-6">
      {/* Ranking section */}
      {hasAnyVotes && (
        <div>
          <h3 className="mb-3 text-lg font-bold text-foreground">🏆 投票ランキング</h3>
          <div className="space-y-2">
            {rankedShops
              .filter((s) => (voteMap.get(s.id) ?? 0) > 0)
              .map((shop, idx) => {
                const count = voteMap.get(shop.id) ?? 0;
                return (
                  <div
                    key={shop.id}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm sm:gap-3 sm:p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-foreground">{shop.name}</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                          {shop.genre}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          {shop.budget}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-bold text-primary">{count}</span>
                      <span className="text-xs text-muted">票</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Area-grouped shop list */}
      {areas.map((area) => {
        const areaShops = allShops.filter((s) => s.area === area.id);
        if (areaShops.length === 0) return null;

        return (
          <div key={area.id}>
            <h3 className="mb-3 text-lg font-bold text-foreground">
              📍 {area.name}エリア
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {areaShops.map((shop) => {
                const count = voteMap.get(shop.id) ?? 0;
                return (
                  <ShopCard
                    key={shop.id}
                    shop={shop}
                    voteCount={count}
                    actionLabel="👍 投票"
                    onAction={() => vote(shop.id)}
                    disabled={votingShopId === shop.id}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
