import { Factory } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/80 bg-white/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-6 sm:py-3.5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Factory className="size-3.5 shrink-0" aria-hidden />
          <span>Production Control Dashboard · Plant floor operations</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {year} Internal ops tool · Mock data for demo use
        </p>
      </div>
    </footer>
  );
}
