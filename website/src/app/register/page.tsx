import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';

const sports = [
  {
    name: 'Volleyball',
    iconSrc: '/icons8-volleyball-90.png',
    description: 'Register your team for the volleyball tournament.',
    link: '/register/volleyball',
  },
  {
    name: 'Basketball',
    iconSrc: '/icons8-basketball-90.png',
    description: 'Register your team for the basketball tournament.',
    link: '/register/basketball',
  },
  {
    name: 'Carrom',
    iconSrc: '/icons8-carrom-90.png',
    description: 'Register for the carrom tournament.',
    link: '/register/carrom',
  },
];

export default function RegisterPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <Trophy className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">
          Register Your Team
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Select the sport you want to compete in to begin the registration process.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {sports.map((sport) => (
          <Card key={sport.name} className="flex flex-col">
            <CardHeader className="items-center text-center">
              <Image
                src={sport.iconSrc}
                alt={sport.name}
                width={48}
                height={48}
              />
              <CardTitle className="mt-4">{sport.name}</CardTitle>
              <CardDescription>{sport.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end justify-center">
              <Button asChild className="w-full">
                <Link href={sport.link}>
                  Register <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
