import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-8">
        <div className="flex flex-col justify-center items-center text-center">
          <div>
            <p className="text-sm font-semibold">&copy; {new Date().getFullYear()} Elevate. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-1">A project for demonstrating modern web development capabilities.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
