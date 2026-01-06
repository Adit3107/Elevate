'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const navLinks = [
  { href: '/teams', label: 'Teams' },
  { href: '/fixtures', label: 'Fixtures' },
  { href: '/results', label: 'Results' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/register', label: 'Register Team' },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full py-2 pl-4 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-bold sm:inline-block font-headline uppercase tracking-wider">
              Elevate
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-foreground relative",
                    isActive ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {link.label}
                  {isActive && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-ring" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background">
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2 mb-6"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-bold font-headline uppercase tracking-wider text-2xl">Elevate</span>
            </Link>
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground text-foreground/60"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <SignedOut>
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild variant="outline">
              <Link href="/profile">Profile</Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
