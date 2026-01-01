'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const resultSchema = z.object({
  matchNo: z.string().min(1, 'Match number is required'),
  teamA: z.string().min(2, 'Team A name is required'),
  teamB: z.string().min(2, 'Team B name is required'),
  winner: z.string().min(2, 'Winner name is required'),
  score: z.string().min(3, 'Score is required'),
  type: z.enum(['league', 'semi', 'final'], {
    required_error: 'Please select a match type.',
  }),
});

type ResultFormData = z.infer<typeof resultSchema>;

export default function ManageResultsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<ResultFormData[]>([]);
  const { toast } = useToast();

  const form = useForm<ResultFormData>({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      matchNo: '',
      teamA: '',
      teamB: '',
      winner: '',
      score: '',
    },
  });

  function onSubmit(data: ResultFormData) {
    setResults((prevResults) => [...prevResults, data]);
    toast({
      title: 'Result Added',
      description: `Result for Match #${data.matchNo} has been saved.`,
    });
    form.reset();
    setIsOpen(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Results</CardTitle>
          <CardDescription>
            Input and update match results as they happen.
          </CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Result
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Result</DialogTitle>
              <DialogDescription>
                Enter the details for the completed match.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="matchNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Match No.</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teamA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team A</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Team A name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teamB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team B</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Team B name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="winner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Winner</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter winner's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Score</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Match Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select match type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="league">League</SelectItem>
                          <SelectItem value="semi">Semi-Final</SelectItem>
                          <SelectItem value="final">Final</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save Result</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>No results have been added yet.</p>
            <p className="text-sm">Click "Add Result" to get started.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Match No.</TableHead>
                <TableHead>Team A</TableHead>
                <TableHead>Team B</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.matchNo}</TableCell>
                  <TableCell>{result.teamA}</TableCell>
                  <TableCell>{result.teamB}</TableCell>
                  <TableCell className="font-medium">{result.winner}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell className="capitalize">{result.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
