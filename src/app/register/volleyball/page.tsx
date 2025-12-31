'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, IndianRupee } from 'lucide-react';
import VolleyballIcon from '@/components/icons/volleyball';
import QRCode from "react-qr-code";
import { useToast } from '@/hooks/use-toast';

const fees = {
  men: 2000,
  women: 1500,
};

type FormData = {
    teamName: string;
    captainName: string;
    contactNo: string;
    altContactNo: string;
    category: 'men' | 'women' | '';
};


export default function VolleyballRegistrationPage() {
    const [step, setStep] = useState(1);
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        teamName: '',
        captainName: '',
        contactNo: '',
        altContactNo: '',
        category: '',
    });

    const handleNext = () => {
        if (formData.teamName.length < 3) {
            toast({ variant: 'destructive', description: 'Team Name must be at least 3 characters long.' });
            return;
        }
        if (formData.captainName.length < 3) {
            toast({ variant: 'destructive', description: 'Captain Name must be at least 3 characters long.' });
            return;
        }
        if (!/^\d{10}$/.test(formData.contactNo)) {
            toast({ variant: 'destructive', description: 'Please enter a valid 10-digit contact number.' });
            return;
        }
        if (formData.altContactNo && !/^\d{10}$/.test(formData.altContactNo)) {
            toast({ variant: 'destructive', description: 'Please enter a valid 10-digit alternate contact number.' });
            return;
        }
        if (!formData.category) {
            toast({ variant: 'destructive', description: 'Please select a category.' });
            return;
        }
        setStep(2);
    };
    
    const upiId = 'your-upi-id@okhdfcbank'; // Replace with your actual UPI ID
    const upiName = 'Elevate Org'; // Replace with your name
    
    const fee = formData.category ? fees[formData.category] : 0;
    const upiUrl = `upi://pay?pa=${upiId}&pn=${upiName}&am=${fee}&cu=INR&tn=ElevateVolleyballRegistration`;

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
            {step === 1 
                ? 'Complete the form below to register your team. Player verification will be handled offline.'
                : 'Scan the QR code to complete the payment and enter the transaction ID.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
            {step === 1 && (
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    <div className="space-y-6 rounded-lg border p-6">
                        <h3 className="text-lg font-medium leading-6 text-primary">Team Information</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="team-name">Team Name (College Name)</Label>
                                <Input id="team-name" placeholder="Enter your college name" value={formData.teamName} onChange={(e) => setFormData({...formData, teamName: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="captain-name">Captain Name</Label>
                                <Input id="captain-name" placeholder="Enter the captain's name" value={formData.captainName} onChange={(e) => setFormData({...formData, captainName: e.target.value})} required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact-no">Contact Number</Label>
                                <Input id="contact-no" placeholder="Enter contact number" type="tel" value={formData.contactNo} onChange={(e) => setFormData({...formData, contactNo: e.target.value})} required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="alt-contact-no">Alternate Contact Number</Label>
                                <Input id="alt-contact-no" placeholder="Enter alternate contact number" type="tel" value={formData.altContactNo} onChange={(e) => setFormData({...formData, altContactNo: e.target.value})}/>
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={(value: 'men' | 'women') => setFormData({...formData, category: value})} value={formData.category}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="men">Men</SelectItem>
                                    <SelectItem value="women">Women</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                    <Button type="submit" size="lg">
                        Next
                    </Button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <div className="space-y-8">
                     <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border p-6">
                        <h3 className="text-lg font-medium leading-6 text-primary">Payment</h3>
                         <div className='text-center'>
                            <p className="text-muted-foreground">Registration Fee</p>
                            <p className="text-4xl font-bold flex items-center justify-center"><IndianRupee className="h-8 w-8" />{fee}</p>
                         </div>
                        <div className="p-4 bg-white rounded-lg">
                            <QRCode value={upiUrl} size={200} />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">Scan with any UPI app to pay.</p>
                     </div>

                    <div className="space-y-2">
                        <Label htmlFor="transaction-id">Transaction ID</Label>
                        <Input id="transaction-id" placeholder="Enter the transaction ID from your UPI app" />
                    </div>

                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <Button type="submit" size="lg">
                            Submit Registration
                        </Button>
                    </div>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
