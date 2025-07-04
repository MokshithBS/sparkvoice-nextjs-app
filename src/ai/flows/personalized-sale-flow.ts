'use server';
/**
 * @fileOverview An AI flow to personalize sale recommendations based on profession.
 * - generatePersonalizedSale - A function that suggests sale items based on profession.
 */

import {ai} from '@/ai/genkit';
import {
  type PersonalizedSaleInput,
  PersonalizedSaleInputSchema,
  type PersonalizedSaleOutput,
  PersonalizedSaleOutputSchema,
} from '@/ai/schemas/personalized-sale-schemas';

export async function generatePersonalizedSale(
  input: PersonalizedSaleInput
): Promise<PersonalizedSaleOutput> {
  return personalizedSaleFlow(input);
}

const personalizedSalePrompt = ai.definePrompt({
  name: 'personalizedSalePrompt',
  input: {schema: PersonalizedSaleInputSchema},
  output: {schema: PersonalizedSaleOutputSchema},
  prompt: `You are a creative and friendly shopping assistant for an Indian e-commerce platform called SparkVoice. It's our "Grand Sparkathon Sale" and you need to create a personalized experience.

You will be given:
1.  The user's profession: '{{profession}}'
2.  A complete list of all products currently on sale.

Your tasks are:
1.  **Think like the user**: Based on their profession, what kind of sale items would be most useful or appealing to them? Think about their daily life, needs, and potential desires. (e.g., student: quick food, coffee; doctor: handwash, healthy snacks; homemaker: cooking staples, cleaning supplies).
2.  **Select Top Deals**: From the list of available sale products, select up to 6 of the most relevant items.
3.  **Generate a Creative Summary**: Write a fun, personalized summary message (summaryText) that explains your choices and makes the user feel special. Be creative and tie it to their profession.
4.  **Return JSON**: Provide ONLY a JSON object that matches the output schema.

Available Sale Products (JSON format):
{{{json availableProducts}}}`,
});

const personalizedSaleFlow = ai.defineFlow(
  {
    name: 'personalizedSaleFlow',
    inputSchema: PersonalizedSaleInputSchema,
    outputSchema: PersonalizedSaleOutputSchema,
  },
  async (input) => {
    const {output} = await personalizedSalePrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }
    return output;
  }
);
