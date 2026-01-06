'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function FixturesPage() {
    const [selectedCategory, setSelectedCategory] = useState<'men' | 'women'>('men');

    return (
        <div className="container mx-auto max-w-5xl py-12 px-4">
            <div className="flex flex-col items-center text-center mb-8">
                <Calendar className="h-16 w-16 text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">
                    Tournament Fixtures
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                    Match schedules and fixtures will be announced soon.
                </p>
            </div>

            <div className="flex justify-center gap-3 mb-8">
                <Button
                    variant={selectedCategory === 'men' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('men')}
                    className="rounded-full px-8"
                    size="lg"
                >
                    Men's
                </Button>
                <Button
                    variant={selectedCategory === 'women' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('women')}
                    className="rounded-full px-8"
                    size="lg"
                >
                    Women's
                </Button>
            </div>

            <Card className="border-2 border-dashed">
                <CardContent className="py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <Calendar className="h-20 w-20 text-muted-foreground/50" />
                        <h2 className="text-2xl font-semibold text-muted-foreground">
                            Fixtures Will Be Added Soon
                        </h2>
                        <p className="text-muted-foreground max-w-md">
                            The {selectedCategory === 'men' ? "Men's" : "Women's"} category fixtures will be published here once finalized. Check back later!
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
