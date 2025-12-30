import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Megaphone, Trophy } from 'lucide-react';
import VolleyballIcon from '@/components/icons/volleyball';
import BasketballIcon from '@/components/icons/basketball';
import CarromIcon from '@/components/icons/carrom';


export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  const announcements = [
    { id: 1, title: 'Registration Now Open!', content: 'Team registration for Elevate 2024 is officially open. Register your team now!', date: '2 days ago' },
    { id: 2, title: 'Fixture Schedule Released', content: 'The first round of fixtures has been announced. Check the fixtures page for details.', date: '1 day ago' },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] text-primary-foreground">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <div className="flex items-center gap-4 mb-4">
             <Trophy className="w-20 h-20 text-white" />
            <div className="w-px h-16 bg-gray-400" />
            <div>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase">Elevate</h1>
              <p className="font-headline text-xl md:text-2xl text-gray-200 tracking-wide">Rise Above All</p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            The official hub for the premier inter-college sports tournament.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/register">Register Your Team</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground bg-black/20 hover:bg-primary-foreground/10">
              <Link href="/fixtures">View Fixtures</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl text-primary">Compete Across Three Sports</h2>
             <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <VolleyballIcon className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Volleyball</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Spike your way to victory in the classic court challenge.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <BasketballIcon className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Basketball</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dribble, shoot, and score in this fast-paced test of teamwork.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CarromIcon className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="mt-4">Carrom</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Test your precision and strategy in the classic tabletop game.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section className="bg-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-primary">What's New</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {announcements.map((ann) => (
              <Card key={ann.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-6 h-6 text-accent" />
                    {ann.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{ann.content}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">{ann.date}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-center sm:text-4xl text-primary">From the Gallery</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative aspect-square group overflow-hidden rounded-lg">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-primary-foreground font-semibold">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
           <div className="text-center mt-8">
              <Button asChild>
                <Link href="/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
