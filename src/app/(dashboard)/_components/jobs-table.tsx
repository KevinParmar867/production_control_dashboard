"use client";

import { ArrowDown, ArrowUp, Inbox } from "lucide-react";

import { StatusBadge } from "@/app/(dashboard)/_components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatDisplayDate,
  isDueToday,
  isOverdue,
} from "@/lib/jobs";
import { cn } from "@/lib/utils";
import type { Job, SortDirection, SortField } from "@/types/job";

interface JobsTableProps {
  jobs: Job[];
  selectedJobId: string | null;
  sortBy: SortField;
  sortDir: SortDirection;
  onSelectJob: (jobId: string) => void;
  onToggleSort: (field: SortField) => void;
}

function SortIcon({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  if (!active) return null;
  return direction === "asc" ? (
    <ArrowUp className="size-3.5" aria-hidden />
  ) : (
    <ArrowDown className="size-3.5" aria-hidden />
  );
}

function DueDateCell({ job }: { job: Job }) {
  const overdue = isOverdue(job.dueDate, job.status);
  const dueToday = isDueToday(job.dueDate);

  return (
    <div className="flex flex-col">
      <span
        className={cn(
          "tabular-nums",
          overdue && "font-medium text-red-700",
          dueToday &&
            !overdue &&
            job.status !== "Completed" &&
            "font-medium text-amber-800"
        )}
      >
        {formatDisplayDate(job.dueDate)}
      </span>
      {overdue && <span className="text-[11px] text-red-600">Overdue</span>}
      {dueToday && !overdue && job.status !== "Completed" && (
        <span className="text-[11px] text-amber-700">Due today</span>
      )}
    </div>
  );
}

export function JobsTable({
  jobs,
  selectedJobId,
  sortBy,
  sortDir,
  onSelectJob,
  onToggleSort,
}: JobsTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card px-6 py-14 text-center">
        <Inbox className="size-8 text-muted-foreground" aria-hidden />
        <p className="text-sm font-medium text-foreground">No jobs match</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Try a different search term or clear the status filter to see more
          work orders.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Job ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="hidden md:table-cell">Customer</TableHead>
            <TableHead className="hidden sm:table-cell">
              <button
                type="button"
                className="inline-flex items-center gap-1 font-medium hover:text-foreground"
                onClick={() => onToggleSort("quantity")}
              >
                Qty
                <SortIcon active={sortBy === "quantity"} direction={sortDir} />
              </button>
            </TableHead>
            <TableHead>
              <button
                type="button"
                className="inline-flex items-center gap-1 font-medium hover:text-foreground"
                onClick={() => onToggleSort("dueDate")}
              >
                Due date
                <SortIcon active={sortBy === "dueDate"} direction={sortDir} />
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Machine</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => {
            const selected = selectedJobId === job.id;
            return (
              <TableRow
                key={job.id}
                data-state={selected ? "selected" : undefined}
                className={cn(
                  "cursor-pointer",
                  selected && "bg-muted/70",
                  job.status === "Delayed" && "bg-red-50/40"
                )}
                onClick={() => onSelectJob(job.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectJob(job.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open details for ${job.id}`}
              >
                <TableCell className="font-mono text-xs font-medium">
                  {job.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{job.productName}</span>
                    <span className="text-xs text-muted-foreground md:hidden">
                      {job.customer}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {job.customer}
                </TableCell>
                <TableCell className="hidden tabular-nums sm:table-cell">
                  {job.quantity.toLocaleString()}
                </TableCell>
                <TableCell>
                  <DueDateCell job={job} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={job.status} />
                </TableCell>
                <TableCell className="hidden font-mono text-xs lg:table-cell">
                  {job.assignedMachine}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
