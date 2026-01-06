import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t-2 border-primary">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-lg font-headline uppercase tracking-wider">Elevate 2026</p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">&copy; 2026 Elevate Tournament. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
