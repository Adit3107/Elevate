
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Megaphone } from 'lucide-react';
import { getAnnouncements } from '@/../../shared/actions/announcements';
import { getRelativeTimeString } from '@/lib/date-utils';


export default async function Home() {
  const result = await getAnnouncements();
  const announcements = result.success && result.data ? result.data.slice(0, 1) : []; // Show only first 1

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[70vh] sm:h-[60vh] md:h-[75vh] text-primary-foreground">
        <div className="absolute inset-0">
          {/* Mobile Image */}
          <Image
            src="/Gemini_Generated_Image_d0bectd0bectd0be.png"
            alt="Elevate 2026 Hero"
            fill
            className="object-cover object-top sm:hidden"
            priority
            quality={100}
          />
          {/* Desktop Image */}
          <Image
            src="/Gemini_Generated_Image_awg926awg926awg9.jpg"
            alt="Elevate 2026 Hero"
            fill
            className="object-cover object-top hidden sm:block"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-5xl sm:text-7xl md:text-9xl font-bold text-white uppercase tracking-wider">
            ELEVATE 2026
          </h1>
          <div className="w-1/3 h-1 bg-primary mt-2 mb-4"></div>
          <p className="font-body text-lg sm:text-xl md:text-2xl text-gray-300 tracking-wider font-semibold mt-2">
            Rise Above All
          </p>
          <p className="font-body text-base sm:text-lg md:text-xl text-gray-400 tracking-wide mt-2">
            12 Feb - 16 Feb 2026
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">Register Your Team</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/fixtures">View Fixtures</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 px-4 sm:px-6 lg:px-8 border-y-2 border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-headline font-bold text-center sm:text-5xl text-white uppercase tracking-wider">Compete Across Three Sports</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="text-center bg-card border-border hover:border-primary hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <Image
                  src="/icons8-volleyball-90.png"
                  alt="Volleyball"
                  width={64}
                  height={64}
                  className="mx-auto"
                />
                <CardTitle className="mt-4 text-2xl font-headline uppercase text-white">Volleyball</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Spike your way to victory in the classic court challenge.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-border hover:border-primary hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <Image
                  src="/icons8-basketball-90.png"
                  alt="Basketball"
                  width={64}
                  height={64}
                  className="mx-auto"
                />
                <CardTitle className="mt-4 text-2xl font-headline uppercase text-white">Basketball</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dribble, shoot, and score in this fast-paced test of teamwork.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-border hover:border-primary hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <Image
                  src="/icons8-carrom-90.png"
                  alt="Carrom"
                  width={64}
                  height={64}
                  className="mx-auto"
                />
                <CardTitle className="mt-4 text-2xl font-headline uppercase text-white">Carrom</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Test your precision and strategy in the classic tabletop game.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section className="bg-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-headline font-bold sm:text-5xl text-white uppercase text-center tracking-wider">What's New</h2>
          <div className="mt-12 max-w-2xl mx-auto">
            {announcements.map((ann: any) => (
              <Card key={ann.id} className="hover:shadow-lg transition-shadow bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Megaphone className="w-6 h-6 text-accent" />
                    <span className="text-xl font-semibold">{ann.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{ann.content}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    {getRelativeTimeString(ann.createdAt)}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/announcements">
                View All Announcements <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


    </div>
  );
}
