'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import VolleyballIcon from '@/components/icons/volleyball';
import Link from 'next/link';

export default function VolleyballRegistrationPage() {
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
            Complete the form below to register your team. Player verification will be handled offline.
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
