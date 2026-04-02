import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center px-6 shrink-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-foreground">
          <Bell className="w-3.5 h-3.5 text-background" />
        </div>
        <span className="text-sm font-semibold tracking-tight">notifyme</span>
      </div>
    </header>
  );
}
