'use server';
/**
 * @fileOverview An AI flow to get a list of ingredients for a recipe.
 * - getIngredientsForDish - A function that returns ingredients for a given dish.
 */

import {ai} from '@/ai/genkit';
import {
  type ListParserOutput,
  ListParserOutputSchema,
} from '@/ai/schemas/list-parser-schemas';
import {z} from 'genkit';

const RecipeToCartInputSchema = z.object({
  dishName: z
    .string()
    .describe('The name of the dish the user wants to cook.'),
});
export type RecipeToCartInput = z.infer<typeof RecipeToCartInputSchema>;

export async function getIngredientsForDish(
  input: RecipeToCartInput
): Promise<ListParserOutput> {
  return recipeToCartFlow(input);
}

const recipeToCartPrompt = ai.definePrompt({
  name: 'recipeToCartPrompt',
  input: {schema: RecipeToCartInputSchema},
  output: {schema: ListParserOutputSchema},
  prompt: `You are an expert Indian chef and shopping assistant. A user wants to cook '{{dishName}}'.

Your task is to provide a structured list of all the necessary ingredients and their likely quantities for a standard recipe that serves 4 people.

- Be mindful of common Indian cooking practices.
- Do not include items that are typically already in a home kitchen pantry, such as salt, sugar, water, or basic cooking oil unless a specific type is required (e.g., 'mustard oil').
- For each ingredient, provide a product name and a quantity.
- Generate a friendly confirmation message in English that says "Here are the ingredients for {{dishName}}."
- Set the detectedLanguage to 'en-IN'.
- Structure the entire output as a single JSON object matching the provided schema. Do not return anything else.`,
});

const recipeToCartFlow = ai.defineFlow(
  {
    name: 'recipeToCartFlow',
    inputSchema: RecipeToCartInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    const {output} = await recipeToCartPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }
    return output;
  }
);
