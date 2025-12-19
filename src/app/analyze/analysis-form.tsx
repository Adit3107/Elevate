'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition } from 'react';
import { explainVolleyballAdvantage, type ExplainVolleyballAdvantageOutput } from '@/ai/flows/explain-volleyball-advantage';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Bot, Lightbulb, XCircle } from 'lucide-react';

const formSchema = z.object({
  gameSituation: z.string().min(10, { message: 'Please provide more details about the game situation.' }),
  playDescription: z.string().min(10, { message: 'Please describe the play in more detail.' }),
  rulesContext: z.string().min(10, { message: 'Please provide some context on the relevant rules.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function AnalysisForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ExplainVolleyballAdvantageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameSituation: '',
      playDescription: '',
      rulesContext: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const response = await explainVolleyballAdvantage(data);
        setResult(response);
      } catch (e) {
        setError('An unexpected error occurred. Please try again.');
        console.error(e);
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Describe the Play</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="gameSituation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Situation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Team A is serving, score is 23-24. Team B needs one point to win the set. Player #7 from Team A is the server."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="playDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Play Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., The server hit a powerful jump float serve. The opponent's libero passed the ball tightly to the net. The setter and opposing middle blocker both jumped to contest the ball directly above the net."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rulesContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Rules</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A joust occurs when two opposing players make contact with the ball simultaneously over the net. The ball remains in play. A net touch is a fault."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Get AI Analysis
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isPending && (
         <div className="text-center p-8">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
            <p className="mt-4 text-muted-foreground">The AI is thinking...</p>
         </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-8">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Alert variant={result.advantageOccurred ? "default" : "destructive"} className="bg-secondary">
                    {result.advantageOccurred ? <Lightbulb className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <AlertTitle>
                        {result.advantageOccurred ? "Advantage Identified" : "No Clear Advantage Identified"}
                    </AlertTitle>
                </Alert>

                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                    <h3 className="font-semibold">Explanation:</h3>
                    <p>{result.advantageExplanation}</p>
                </div>
            </CardContent>
        </Card>
      )}
    </>
  );
}
