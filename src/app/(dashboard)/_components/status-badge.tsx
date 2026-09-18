import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { JobStatus, MachineStatus } from "@/types/job";

const statusStyles: Record<JobStatus, string> = {
  Pending: "border-slate-300 bg-slate-100 text-slate-700",
  "In Progress": "border-sky-300 bg-sky-50 text-sky-800",
  Delayed: "border-red-300 bg-red-50 text-red-700",
  Completed: "border-emerald-300 bg-emerald-50 text-emerald-800",
};

const machineStyles: Record<MachineStatus, string> = {
  Running: "border-emerald-300 bg-emerald-50 text-emerald-800",
  Idle: "border-slate-300 bg-slate-100 text-slate-700",
  Maintenance: "border-amber-300 bg-amber-50 text-amber-800",
  Down: "border-red-300 bg-red-50 text-red-700",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-md font-medium", statusStyles[status])}
    >
      {status}
    </Badge>
  );
}

export function MachineStatusBadge({ status }: { status: MachineStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-md font-medium", machineStyles[status])}
    >
      {status}
    </Badge>
  );
}
