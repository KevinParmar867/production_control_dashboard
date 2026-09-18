"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { JobDetailPanel } from "@/app/(dashboard)/_components/job-detail-panel";
import { JobsTable } from "@/app/(dashboard)/_components/jobs-table";
import { JobsToolbar } from "@/app/(dashboard)/_components/jobs-toolbar";
import { SummaryCards } from "@/app/(dashboard)/_components/summary-cards";
import { Pagination } from "@/components/pagination";
import { getHardcodedJobs } from "@/data/jobs";
import { computeMetrics, filterAndSortJobs } from "@/lib/jobs";
import type {
  Job,
  JobStatus,
  SortDirection,
  SortField,
} from "@/types/job";

const PAGE_SIZE = 5;

export default function DashboardPage() {
  // Called hardcoded data
  const [jobs, setJobs] = useState<Job[]>(() => getHardcodedJobs());

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortField>("dueDate");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const metrics = useMemo(() => computeMetrics(jobs), [jobs]);

  const filteredJobs = useMemo(
    () =>
      filterAndSortJobs(jobs, {
        search,
        status,
        sortBy,
        sortDir,
      }),
    [jobs, search, status, sortBy, sortDir]
  );

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [filteredJobs, currentPage]);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? null;

  function handleSelectJob(jobId: string) {
    setSelectedJobId(jobId);
    setPanelOpen(true);
  }

  function handleToggleSort(field: SortField) {
    if (sortBy === field) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir(field === "dueDate" ? "asc" : "desc");
    }
    setPage(1);
  }

  function handleClearFilters() {
    setSearch("");
    setStatus("all");
    setSortBy("dueDate");
    setSortDir("asc");
    setPage(1);
  }

  function handleRefresh() {
    // Called hardcoded data
    setJobs(getHardcodedJobs());
    setPage(1);
  }

  function handleStatusUpdate(jobId: string, nextStatus: JobStatus) {
    const today = new Date().toISOString().slice(0, 10);
    const job = jobs.find((item) => item.id === jobId);

    setJobs((current) =>
      current.map((item) => {
        if (item.id !== jobId) return item;

        return {
          ...item,
          status: nextStatus,
          startedAt:
            nextStatus === "In Progress" && !item.startedAt
              ? today
              : item.startedAt,
          completedAt: nextStatus === "Completed" ? today : null,
        };
      })
    );

    setPanelOpen(false);
    setSelectedJobId(null);

    toast.success("Status updated", {
      description: `${jobId}${job ? ` · ${job.productName}` : ""} is now ${nextStatus}.`,
    });
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6">
        <SummaryCards metrics={metrics} />

        <JobsToolbar
          search={search}
          status={status}
          sortBy={sortBy}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onSortByChange={(field) => {
            setSortBy(field);
            setSortDir(field === "dueDate" ? "asc" : "desc");
            setPage(1);
          }}
          onClear={handleClearFilters}
          onRefresh={handleRefresh}
        />

        <JobsTable
          jobs={paginatedJobs}
          selectedJobId={selectedJobId}
          sortBy={sortBy}
          sortDir={sortDir}
          onSelectJob={handleSelectJob}
          onToggleSort={handleToggleSort}
        />

        <Pagination
          page={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={filteredJobs.length}
          onPageChange={setPage}
        />
      </main>

      <JobDetailPanel
        key={selectedJob?.id ?? "none"}
        job={selectedJob}
        open={panelOpen}
        onOpenChange={(open) => {
          setPanelOpen(open);
          if (!open) {
            setSelectedJobId(null);
          }
        }}
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  );
}
