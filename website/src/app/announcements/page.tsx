import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';
import { announcements } from '@/data/announcements';

export default function AnnouncementsPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <div className="flex flex-col items-center text-center mb-12">
                <Megaphone className="h-16 w-16 text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl uppercase">
                    Announcements
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                    Stay updated with the latest news and updates about Elevate 2026.
                </p>
            </div>

            <div className="space-y-6">
                {announcements.map((announcement) => (
                    <Card key={announcement.id} className="hover:shadow-lg transition-shadow bg-card border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Megaphone className="w-6 h-6 text-accent" />
                                <span className="text-xl font-semibold">{announcement.title}</span>
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">{announcement.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">{announcement.content}</p>
                            {announcement.fullDescription && (
                                <p className="text-foreground">{announcement.fullDescription}</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
