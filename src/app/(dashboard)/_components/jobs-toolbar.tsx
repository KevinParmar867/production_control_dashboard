"use client";

import { RefreshCw, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_STATUSES, type JobStatus, type SortField } from "@/types/job";

interface JobsToolbarProps {
  search: string;
  status: JobStatus | "all";
  sortBy: SortField;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: JobStatus | "all") => void;
  onSortByChange: (value: SortField) => void;
  onClear: () => void;
  onRefresh: () => void;
}

export function JobsToolbar({
  search,
  status,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortByChange,
  onClear,
  onRefresh,
}: JobsToolbarProps) {
  const hasFilters =
    search.length > 0 || status !== "all" || sortBy !== "dueDate";

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="job-search">Search</Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="job-search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Product, customer, or job ID"
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="status-filter">Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                onStatusChange((value as JobStatus | "all") ?? "all")
              }
            >
              <SelectTrigger id="status-filter" className="w-full min-w-40">
                <SelectValue>
                  {status === "all" ? "All statuses" : status}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {JOB_STATUSES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sort-by">Sort by</Label>
            <Select
              value={sortBy}
              onValueChange={(value) =>
                onSortByChange((value as SortField) ?? "dueDate")
              }
            >
              <SelectTrigger id="sort-by" className="w-full min-w-40">
                <SelectValue>
                  {sortBy === "dueDate" ? "Due date" : "Quantity"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due date</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 lg:mb-0.5">
          <Button type="button" variant="outline" onClick={onRefresh}>
            <RefreshCw data-icon="inline-start" />
            Refresh
          </Button>
          {hasFilters && (
            <Button type="button" variant="outline" onClick={onClear}>
              <X data-icon="inline-start" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
