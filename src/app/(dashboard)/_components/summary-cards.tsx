import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { JobMetrics } from "@/types/job";

interface SummaryCardsProps {
  metrics: JobMetrics;
}

const cards = [
  {
    key: "totalJobs" as const,
    label: "Total jobs",
    hint: "Active work orders",
    icon: ClipboardList,
    accent: "text-slate-700 bg-slate-100",
  },
  {
    key: "delayedJobs" as const,
    label: "Delayed",
    hint: "Needs attention",
    icon: AlertTriangle,
    accent: "text-red-700 bg-red-50",
  },
  {
    key: "dueSoonJobs" as const,
    label: "Due today / soon",
    hint: "Next 48 hours",
    icon: Clock3,
    accent: "text-amber-800 bg-amber-50",
  },
  {
    key: "completedJobs" as const,
    label: "Completed",
    hint: "Closed orders",
    icon: CheckCircle2,
    accent: "text-emerald-800 bg-emerald-50",
  },
];

export function SummaryCards({ metrics }: SummaryCardsProps) {
  return (
    <section
      aria-label="Production summary"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <div
              className={cn(
                "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md",
                card.accent
              )}
            >
              <Icon className="size-4" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {card.label}
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                {metrics[card.key]}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{card.hint}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
