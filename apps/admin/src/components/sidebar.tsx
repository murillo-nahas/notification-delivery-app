import { LayoutDashboard, UserCircle } from 'lucide-react';

const navItems = [
  {
    label: 'Home',
    icon: LayoutDashboard,
    href: '/home',
  },
  {
    label: 'Account details',
    icon: UserCircle,
    href: '/account',
  },
];

export default function Sidebar() {
  return (
    <aside className="w-56 border-r border-border bg-background flex flex-col py-4 shrink-0">
      <nav className="flex flex-col gap-0.5 px-3">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
