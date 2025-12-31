'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, IndianRupee } from 'lucide-react';
import VolleyballIcon from '@/components/icons/volleyball';
import QRCode from 'react-qr-code';
import { useToast } from '@/hooks/use-toast';

const fees = {
  men: 2000,
  women: 1500,
};

const formSchema = z.object({
  teamName: z.string().min(3, {
    message: 'Team Name must be at least 3 characters long.',
  }),
  captainName: z.string().min(3, {
    message: 'Captain Name must be at least 3 characters long.',
  }),
  contactNo: z.string().regex(/^\d{10}$/, {
    message: 'Please enter a valid 10-digit contact number.',
  }),
  altContactNo: z.string().regex(/^\d{10}$/, {
    message: 'Please enter a valid 10-digit alternate contact number.',
  }).optional().or(z.literal('')),
  category: z.enum(['men', 'women'], {
    required_error: 'Please select a category.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function VolleyballRegistrationPage() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<FormData | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: '',
      captainName: '',
      contactNo: '',
      altContactNo: '',
    },
  });

  function onSubmit(data: FormData) {
    setFormValues(data);
    setStep(2);
  }

  const upiId = 'your-upi-id@okhdfcbank'; // Replace with your actual UPI ID
  const upiName = 'Elevate Org'; // Replace with your name

  const fee = formValues?.category ? fees[formValues.category] : 0;
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
              : 'Scan the QR code to complete the payment and enter the transaction ID.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-6 rounded-lg border p-6">
                  <h3 className="text-lg font-medium leading-6 text-primary">
                    Team Information
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name (College Name)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your college name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="captainName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Captain Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the captain's name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter contact number"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="altContactNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter alternate contact number"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="men">Men</SelectItem>
                              <SelectItem value="women">Women</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border p-6">
                <h3 className="text-lg font-medium leading-6 text-primary">
                  Payment
                </h3>
                <div className="text-center">
                  <p className="text-muted-foreground">Registration Fee</p>
                  <p className="text-4xl font-bold flex items-center justify-center">
                    <IndianRupee className="h-8 w-8" />
                    {fee}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <QRCode value={upiUrl} size={200} />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan with any UPI app to pay.
                </p>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="transaction-id">Transaction ID</FormLabel>
                <Input
                  id="transaction-id"
                  placeholder="Enter the transaction ID from your UPI app"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    toast({
                      title: 'Registration Submitted!',
                      description:
                        'Your team registration has been submitted successfully.',
                    });
                  }}
                >
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
