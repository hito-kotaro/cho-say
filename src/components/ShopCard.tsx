"use client";

import type { Shop } from "@/lib/types";

interface ShopCardProps {
  shop: Shop;
  voteCount?: number;
  actionLabel?: string;
  onAction?: () => void;
  disabled?: boolean;
}

export default function ShopCard({
  shop,
  voteCount,
  actionLabel,
  onAction,
  disabled,
}: ShopCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-foreground truncate">{shop.name}</h3>
          <div className="mt-1.5 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
              {shop.genre}
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              {shop.budget}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-muted truncate">{shop.address}</p>
        </div>
        {voteCount !== undefined && voteCount > 0 && (
          <div className="flex flex-col items-center shrink-0">
            <span className="text-lg font-bold text-primary">{voteCount}</span>
            <span className="text-xs text-muted">票</span>
          </div>
        )}
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          disabled={disabled}
          className={`mt-3 w-full rounded-lg py-2 text-sm font-semibold transition-colors ${
            disabled
              ? "border border-border bg-card text-muted cursor-not-allowed"
              : "border border-primary/30 text-primary hover:bg-primary-light"
          }`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
