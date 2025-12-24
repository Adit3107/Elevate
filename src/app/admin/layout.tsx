'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  GalleryVertical,
  LayoutDashboard,
  Medal,
  Swords,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/teams', label: 'Teams', icon: Users },
  { href: '/admin/fixtures', label: 'Fixtures', icon: Swords },
  { href: '/admin/results', label: 'Results', icon: Medal },
  { href: '/admin/announcements', label: 'Announcements', icon: Bell },
  { href: '/admin/gallery', label: 'Gallery', icon: GalleryVertical },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-start gap-4 px-4 sm:py-5">
          <Link
            href="/admin"
            className="group flex h-9 w-full shrink-0 items-center justify-start gap-2 rounded-full bg-primary px-3 text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
          >
            <LayoutDashboard className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="">Admin Panel</span>
          </Link>
          <TooltipProvider>
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === '/admin' ? pathname === href : pathname.startsWith(href);
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Link href={href} className="w-full">
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex w-full flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
