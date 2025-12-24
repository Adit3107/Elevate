import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm font-semibold">&copy; {new Date().getFullYear()} Elevate. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-1">A project for demonstrating modern web development capabilities.</p>
          </div>
          <div className="text-center md:text-right max-w-md">
            <p className="text-xs font-bold uppercase tracking-wider">Disclaimer</p>
            <p className="text-xs text-muted-foreground mt-1">
              Uploaded documents (Aadhaar, College ID) are collected solely for verification purposes for the Elevate tournament and will be securely deleted after the event concludes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
