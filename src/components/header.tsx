import { Factory } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2.5 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white sm:size-10">
          <Factory className="size-4 sm:size-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium tracking-wide text-muted-foreground uppercase sm:text-xs">
            Plant floor ops
          </p>
          <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-xl">
            <span className="sm:hidden">Production Control</span>
            <span className="hidden sm:inline">
              Production Control Dashboard
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
}
