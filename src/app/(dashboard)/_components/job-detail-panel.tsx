"use client";

import { AlertCircle, Factory } from "lucide-react";
import { useState } from "react";

import {
  MachineStatusBadge,
  StatusBadge,
} from "@/app/(dashboard)/_components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatDisplayDate } from "@/lib/jobs";
import { JOB_STATUSES, type Job, type JobStatus } from "@/types/job";

interface JobDetailPanelProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (jobId: string, status: JobStatus) => void;
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{children}</dd>
    </div>
  );
}

export function JobDetailPanel({
  job,
  open,
  onOpenChange,
  onStatusUpdate,
}: JobDetailPanelProps) {
  const [draftStatus, setDraftStatus] = useState<JobStatus>(
    job?.status ?? "Pending"
  );

  const dirty = Boolean(job && draftStatus !== job.status);

  function handleSave() {
    if (!job || !dirty) return;
    onStatusUpdate(job.id, draftStatus);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 sm:max-w-lg"
        showCloseButton
      >
        {job ? (
          <>
            <SheetHeader className="border-b border-border">
              <SheetTitle className="font-mono text-base">{job.id}</SheetTitle>
              <SheetDescription>{job.productName}</SheetDescription>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <StatusBadge status={job.status} />
                <Badge variant="outline" className="rounded-md">
                  {job.priority} priority
                </Badge>
              </div>
            </SheetHeader>

            <div className="flex-1 space-y-5 overflow-y-auto p-4">
              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Job details
                </h3>
                <dl className="space-y-2.5">
                  <DetailRow label="Customer">{job.customer}</DetailRow>
                  <DetailRow label="Quantity">
                    {job.quantity.toLocaleString()} units
                  </DetailRow>
                  <DetailRow label="Due date">
                    {formatDisplayDate(job.dueDate)}
                  </DetailRow>
                  <DetailRow label="Started">
                    {job.startedAt ? formatDisplayDate(job.startedAt) : "—"}
                  </DetailRow>
                  <DetailRow label="Completed">
                    {job.completedAt
                      ? formatDisplayDate(job.completedAt)
                      : "—"}
                  </DetailRow>
                </dl>
              </section>

              <Separator />

              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Machine assigned
                </h3>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
                  <div className="flex size-9 items-center justify-center rounded-md bg-background">
                    <Factory className="size-4 text-slate-700" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-medium">
                      {job.assignedMachine}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Floor assignment
                    </p>
                  </div>
                  <MachineStatusBadge status={job.machineStatus} />
                </div>
              </section>

              <Separator />

              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Notes
                </h3>
                <p className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm leading-relaxed text-foreground">
                  {job.notes}
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Issues
                </h3>
                {job.issues.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No open issues for this job.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {job.issues.map((issue) => (
                      <li
                        key={issue}
                        className="flex gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                      >
                        <AlertCircle
                          className="mt-0.5 size-4 shrink-0"
                          aria-hidden
                        />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <Separator />

              <section className="space-y-2">
                <Label htmlFor="status-update">Update status</Label>
                <Select
                  value={draftStatus}
                  onValueChange={(value) =>
                    setDraftStatus((value as JobStatus) ?? job.status)
                  }
                >
                  <SelectTrigger id="status-update" className="w-full">
                    <SelectValue>{draftStatus}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>
            </div>

            <SheetFooter className="border-t border-border">
              <Button
                type="button"
                onClick={handleSave}
                disabled={!dirty}
                className="w-full"
              >
                Save status
              </Button>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
