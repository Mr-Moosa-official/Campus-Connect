'use server';

/**
 * @fileOverview A personalized event recommendation AI agent.
 *
 * - getPersonalizedEventRecommendations - A function that returns a list of recommended events.
 * - PersonalizedEventRecommendationsInput - The input type for the getPersonalizedEventRecommendations function.
 * - PersonalizedEventRecommendationsOutput - The return type for the getPersonalizedEventRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedEventRecommendationsInputSchema = z.object({
  studentProfile: z
    .string()
    .describe("A description of the student's interests and preferences."),
  events: z.array(z.string()).describe('A list of event descriptions.'),
});
export type PersonalizedEventRecommendationsInput = z.infer<
  typeof PersonalizedEventRecommendationsInputSchema
>;

const PersonalizedEventRecommendationsOutputSchema = z.array(z.string()).describe(
  'A list of event descriptions, ordered by relevance to the student profile.'
);
export type PersonalizedEventRecommendationsOutput = z.infer<
  typeof PersonalizedEventRecommendationsOutputSchema
>;

export async function getPersonalizedEventRecommendations(
  input: PersonalizedEventRecommendationsInput
): Promise<PersonalizedEventRecommendationsOutput> {
  return personalizedEventRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedEventRecommendationsPrompt',
  input: {schema: PersonalizedEventRecommendationsInputSchema},
  output: {schema: PersonalizedEventRecommendationsOutputSchema},
  prompt: `You are an AI event recommendation system.

You will receive a student profile, and a list of event descriptions.

You will order the events by relevance to the student profile, with the most relevant events first.

Student Profile: {{{studentProfile}}}
Events: {{#each events}}{{{this}}}\n{{/each}}`,
});

const personalizedEventRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedEventRecommendationsFlow',
    inputSchema: PersonalizedEventRecommendationsInputSchema,
    outputSchema: PersonalizedEventRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
