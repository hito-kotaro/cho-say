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
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm hover:shadow-md transition-shadow sm:p-4">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-foreground sm:text-base line-clamp-2">{shop.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5 sm:mt-1.5 sm:gap-2">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-medium text-orange-800 sm:px-2.5 sm:text-xs">
              {shop.genre}
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800 sm:px-2.5 sm:text-xs">
              {shop.budget}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted truncate sm:mt-1.5 sm:text-sm">{shop.address}</p>
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
          className={`mt-2 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors min-h-[44px] sm:mt-3 ${
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
