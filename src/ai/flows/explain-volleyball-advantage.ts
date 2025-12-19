'use server';

/**
 * @fileOverview An AI agent that explains volleyball advantages.
 *
 * - explainVolleyballAdvantage - A function that explains why a specific volleyball play resulted in an advantage.
 * - ExplainVolleyballAdvantageInput - The input type for the explainVolleyballAdvantage function.
 * - ExplainVolleyballAdvantageOutput - The return type for the explainVolleyballAdvantage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainVolleyballAdvantageInputSchema = z.object({
  gameSituation: z
    .string()
    .describe(
      'Description of the game situation, including team scores, player positions, and recent plays.'
    ),
  playDescription: z
    .string()
    .describe('Detailed description of the specific volleyball play.'),
  rulesContext: z
    .string()
    .describe('Relevant volleyball rules that apply to the play.'),
});
export type ExplainVolleyballAdvantageInput = z.infer<
  typeof ExplainVolleyballAdvantageInputSchema
>;

const ExplainVolleyballAdvantageOutputSchema = z.object({
  advantageExplanation: z
    .string()
    .describe(
      'A clear and concise explanation of why the described play resulted in an advantage for one of the teams, understandable to novice viewers.'
    ),
  advantageOccurred: z
    .boolean()
    .describe('Whether an advantage occurred during the play.'),
});
export type ExplainVolleyballAdvantageOutput = z.infer<
  typeof ExplainVolleyballAdvantageOutputSchema
>;

export async function explainVolleyballAdvantage(
  input: ExplainVolleyballAdvantageInput
): Promise<ExplainVolleyballAdvantageOutput> {
  return explainVolleyballAdvantageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainVolleyballAdvantagePrompt',
  input: {schema: ExplainVolleyballAdvantageInputSchema},
  output: {schema: ExplainVolleyballAdvantageOutputSchema},
  prompt: `You are an expert volleyball analyst. Your task is to analyze a specific volleyball play and determine if an advantage occurred, and explain why in simple terms.

  Here is the game situation:
  {{gameSituation}}

  Here is the play description:
  {{playDescription}}

  Here are the relevant volleyball rules:
  {{rulesContext}}

  First, determine if an advantage occurred during the play. Set the advantageOccurred field appropriately.
  Then, provide a clear and concise explanation of why the described play resulted in an advantage for one of the teams, understandable to novice viewers. Focus on the key elements that led to the advantage.
  `,
});

const explainVolleyballAdvantageFlow = ai.defineFlow(
  {
    name: 'explainVolleyballAdvantageFlow',
    inputSchema: ExplainVolleyballAdvantageInputSchema,
    outputSchema: ExplainVolleyballAdvantageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
