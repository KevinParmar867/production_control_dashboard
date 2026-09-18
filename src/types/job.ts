export const JOB_STATUSES = [
  "Pending",
  "In Progress",
  "Delayed",
  "Completed",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export type MachineStatus = "Running" | "Idle" | "Maintenance" | "Down";

export interface Job {
  id: string;
  productName: string;
  customer: string;
  quantity: number;
  dueDate: string;
  status: JobStatus;
  assignedMachine: string;
  machineStatus: MachineStatus;
  notes: string;
  issues: string[];
  priority: "Low" | "Normal" | "High" | "Critical";
  startedAt: string | null;
  completedAt: string | null;
}

export type SortField = "dueDate" | "quantity";
export type SortDirection = "asc" | "desc";

export interface JobsQuery {
  search?: string;
  status?: JobStatus | "all";
  sortBy?: SortField;
  sortDir?: SortDirection;
}

export interface JobMetrics {
  totalJobs: number;
  delayedJobs: number;
  dueSoonJobs: number;
  completedJobs: number;
  inProgressJobs: number;
}
