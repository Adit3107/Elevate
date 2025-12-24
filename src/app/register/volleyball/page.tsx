'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus } from 'lucide-react';
import VolleyballIcon from '@/components/icons/volleyball';
import Link from 'next/link';

const PlayerDetailsForm = ({ playerNumber }: { playerNumber: number }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor={`player-name-${playerNumber}`}>Player Name</Label>
      <Input
        id={`player-name-${playerNumber}`}
        placeholder="Enter player's full name"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor={`college-id-${playerNumber}`}>
        College ID (Photo/PDF)
      </Label>
      <Input id={`college-id-${playerNumber}`} type="file" />
    </div>
    <div className="space-y-2">
      <Label htmlFor={`govt-id-${playerNumber}`}>
        Government ID (Photo/PDF)
      </Label>
      <Input id={`govt-id-${playerNumber}`} type="file" />
    </div>
    <div className="space-y-2">
      <Label htmlFor={`bonafide-${playerNumber}`}>
        Bonafide/Fee Receipt (Photo/PDF)
      </Label>
      <Input id={`bonafide-${playerNumber}`} type="file" />
    </div>
  </div>
);

export default function VolleyballRegistrationPage() {
  const playerCount = 12;

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
       <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/register">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sport Selection
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="text-center">
          <VolleyballIcon className="w-16 h-16 mx-auto text-primary" />
          <CardTitle className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl mt-4">
            Volleyball Tournament Registration
          </CardTitle>
          <CardDescription className="mt-2 text-lg">
            Complete the form below to register your team. A maximum of 12 players are allowed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="space-y-6 rounded-lg border p-6">
                 <h3 className="text-lg font-medium leading-6 text-primary">Team Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="college-name">College Name</Label>
                        <Input id="college-name" placeholder="Enter your college name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="captain-name">Captain Name</Label>
                        <Input id="captain-name" placeholder="Enter the captain's name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact-no">Contact No.</Label>
                        <Input id="contact-no" type="tel" placeholder="Enter primary contact number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alt-contact-no">Alternate Contact No.</Label>
                        <Input id="alt-contact-no" type="tel" placeholder="Enter alternate contact number" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                 <h3 className="text-lg font-medium leading-6 text-primary flex items-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Player Details
                 </h3>
                <Accordion type="multiple" className="w-full">
                {[...Array(playerCount)].map((_, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger className="text-base">
                      Player {index + 1}
                    </AccordionTrigger>
                    <AccordionContent>
                      <PlayerDetailsForm playerNumber={index + 1} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Submit Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
