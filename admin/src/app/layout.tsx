import { ClerkProvider } from '@clerk/nextjs';
import '@/app/globals.css';
import { Toaster } from '@shared/components/ui/toaster';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    {children}
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
