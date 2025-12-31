import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-8">
        <div className="flex flex-col justify-center items-center text-center">
          <div>
            <p className="text-sm font-semibold">&copy; 2025 Elevate. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
