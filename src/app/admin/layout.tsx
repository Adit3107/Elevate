'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Bell,
  GalleryVertical,
  LayoutDashboard,
  Medal,
  PanelLeft,
  PanelLeftClose,
  PanelRightClose,
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 sm:flex',
            isCollapsed ? 'w-16' : 'w-64'
          )}
        >
          <div className={cn('flex items-center border-b', isCollapsed ? 'h-[65px] justify-center' : 'h-[65px] justify-between px-6')}>
              <Link
                href="/admin"
                className={cn(
                  'group flex items-center gap-2 rounded-full text-lg font-semibold text-foreground',
                  isCollapsed ? 'justify-center' : ''
                )}
              >
                <LayoutDashboard className="h-6 w-6 text-primary transition-all group-hover:scale-110" />
                <span className={cn(isCollapsed ? 'hidden' : '')}>
                  Admin Panel
                </span>
              </Link>
          </div>
           <nav className="flex flex-col items-start gap-4 px-4 sm:py-5">
            <Button onClick={() => setIsCollapsed(!isCollapsed)} variant="ghost" size="icon" className={cn('absolute right-4 top-4 hidden sm:flex', isCollapsed ? '' : 'hidden' )}>
              <PanelRightClose className="h-5 w-5" />
            </Button>
            <Button onClick={() => setIsCollapsed(!isCollapsed)} variant="ghost" size="icon" className={cn('absolute right-4 top-4 hidden sm:flex', isCollapsed ? 'hidden' : '' )}>
              <PanelLeftClose className="h-5 w-5" />
            </Button>
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === '/admin'
                  ? pathname === href
                  : pathname.startsWith(href);
              return (
                <Tooltip key={href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link href={href} className="w-full">
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn(
                          'w-full',
                          isCollapsed ? 'justify-center' : 'justify-start'
                        )}
                        aria-label={label}
                      >
                        <Icon className={cn(isCollapsed ? '' : 'mr-2', 'h-4 w-4')} />
                        <span
                          className={cn(
                            isCollapsed ? 'hidden' : 'inline-block'
                          )}
                        >
                          {label}
                        </span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">{label}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </aside>
        <div
          className={cn(
            'flex w-full flex-col sm:gap-4 sm:py-4 transition-all duration-300',
            isCollapsed ? 'sm:pl-16' : 'sm:pl-64'
          )}
        >
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}