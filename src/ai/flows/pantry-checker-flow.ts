'use server';
/**
 * @fileOverview An AI flow to suggest products based on a pantry photo.
 *
 * - checkPantry - A function that suggests products based on a pantry photo.
 */

import {ai} from '@/ai/genkit';
import {
  type PantryCheckerInput,
  PantryCheckerInputSchema,
  type PantryCheckerOutput,
  PantryCheckerOutputSchema,
} from '@/ai/schemas/pantry-checker-schemas';

export async function checkPantry(
  input: PantryCheckerInput
): Promise<PantryCheckerOutput> {
  return pantryCheckerFlow(input);
}

const pantryCheckerPrompt = ai.definePrompt({
  name: 'pantryCheckerPrompt',
  input: {schema: PantryCheckerInputSchema},
  output: {schema: PantryCheckerOutputSchema},
  prompt: `You are an expert home and grocery assistant for an Indian household. Your goal is to help users restock their pantry by analyzing a photo.

You will be given:
1. A photo of a user's pantry, fridge, or kitchen shelf: {{media url=photoDataUri}}
2. A complete list of all products available in the store (in JSON format).

Your tasks are:
1.  **Analyze the Image**: Carefully examine the image to identify common Indian grocery and household items.
2.  **Identify Low-Stock Items**: Look for products that are running low or are almost empty. For example: an almost empty jar of coffee, the last few tea bags in a box, a bottle of oil that is nearly finished, a single onion or potato left in a basket.
3.  **Match with Available Products**: Compare the low-stock items you identified with the list of available products. Find the best match for each item.
4.  **Generate Suggestions**: Return a list of up to 5 product IDs for the items the user should restock. Do not suggest items that appear to be well-stocked.
5.  **Create a Confirmation Message**: Generate a friendly, natural language confirmation message in English that explains your suggestions. For example: "I noticed you're running low on coffee and your cooking oil is almost finished, so I've suggested some items to restock."
6.  **Return JSON**: Provide ONLY a JSON object that matches the output schema.

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const pantryCheckerFlow = ai.defineFlow(
  {
    name: 'pantryCheckerFlow',
    inputSchema: PantryCheckerInputSchema,
    outputSchema: PantryCheckerOutputSchema,
  },
  async (input) => {
    const {output} = await pantryCheckerPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }
    return output;
  }
);
