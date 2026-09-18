import type {
  Job,
  JobMetrics,
  JobsQuery,
  JobStatus,
  SortDirection,
  SortField,
} from "@/types/job";

export function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDisplayDate(isoDate: string): string {
  return parseLocalDate(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function isDueToday(isoDate: string): boolean {
  return parseLocalDate(isoDate).getTime() === startOfToday().getTime();
}

export function isDueSoon(isoDate: string, withinDays = 3): boolean {
  const due = parseLocalDate(isoDate).getTime();
  const today = startOfToday().getTime();
  const horizon = today + withinDays * 24 * 60 * 60 * 1000;
  return due >= today && due <= horizon;
}

export function isOverdue(isoDate: string, status: JobStatus): boolean {
  if (status === "Completed") return false;
  return parseLocalDate(isoDate).getTime() < startOfToday().getTime();
}

export function computeMetrics(jobs: Job[]): JobMetrics {
  return {
    totalJobs: jobs.length,
    delayedJobs: jobs.filter((job) => job.status === "Delayed").length,
    dueSoonJobs: jobs.filter(
      (job) =>
        job.status !== "Completed" &&
        (isDueToday(job.dueDate) || isDueSoon(job.dueDate, 2))
    ).length,
    completedJobs: jobs.filter((job) => job.status === "Completed").length,
    inProgressJobs: jobs.filter((job) => job.status === "In Progress").length,
  };
}

export function filterAndSortJobs(jobs: Job[], query: JobsQuery): Job[] {
  const search = query.search?.trim().toLowerCase() ?? "";
  const status = query.status ?? "all";
  const sortBy: SortField = query.sortBy ?? "dueDate";
  const sortDir: SortDirection = query.sortDir ?? "asc";

  const filtered = jobs.filter((job) => {
    const matchesStatus = status === "all" || job.status === status;
    if (!matchesStatus) return false;

    if (!search) return true;

    return (
      job.id.toLowerCase().includes(search) ||
      job.productName.toLowerCase().includes(search) ||
      job.customer.toLowerCase().includes(search)
    );
  });

  return [...filtered].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "dueDate") {
      comparison =
        parseLocalDate(a.dueDate).getTime() -
        parseLocalDate(b.dueDate).getTime();
    } else {
      comparison = a.quantity - b.quantity;
    }

    return sortDir === "asc" ? comparison : -comparison;
  });
}
