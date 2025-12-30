'use server';

/**
 * @fileOverview A flow for generating personalized event certificates for attendees.
 *
 * - generateEventCertificates - A function that generates certificates for event attendees.
 * - GenerateEventCertificatesInput - The input type for the generateEventCertificates function.
 * - GenerateEventCertificatesOutput - The return type for the generateEventCertificates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventCertificatesInputSchema = z.object({
  attendeeName: z.string().describe('The name of the event attendee.'),
  eventName: z.string().describe('The name of the event.'),
  eventDate: z.string().describe('The date of the event.'),
  certificateTemplate: z
    .string()
    .describe(
      'A template for the certificate, including placeholders for attendee name, event name, and event date.'
    ),
});
export type GenerateEventCertificatesInput = z.infer<
  typeof GenerateEventCertificatesInputSchema
>;

const GenerateEventCertificatesOutputSchema = z.object({
  certificate: z.string().describe('The generated certificate.'),
});
export type GenerateEventCertificatesOutput = z.infer<
  typeof GenerateEventCertificatesOutputSchema
>;

export async function generateEventCertificates(
  input: GenerateEventCertificatesInput
): Promise<GenerateEventCertificatesOutput> {
  return generateEventCertificatesFlow(input);
}

const generateEventCertificatesPrompt = ai.definePrompt({
  name: 'generateEventCertificatesPrompt',
  input: {schema: GenerateEventCertificatesInputSchema},
  output: {schema: GenerateEventCertificatesOutputSchema},
  prompt: `Generate a personalized certificate for {{attendeeName}} who attended {{eventName}} on {{eventDate}}. Use the following template:

{{certificateTemplate}}`,
});

const generateEventCertificatesFlow = ai.defineFlow(
  {
    name: 'generateEventCertificatesFlow',
    inputSchema: GenerateEventCertificatesInputSchema,
    outputSchema: GenerateEventCertificatesOutputSchema,
  },
  async input => {
    const {output} = await generateEventCertificatesPrompt(input);
    return output!;
  }
);
