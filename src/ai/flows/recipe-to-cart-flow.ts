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
  servingSize: z
    .number()
    .min(1)
    .describe('The number of people the recipe should serve.'),
  specialRequests: z
    .string()
    .optional()
    .describe(
      "Any special requests for the recipe, like 'make it Jain', 'less spicy', or 'for a diabetic person'."
    ),
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

Your task is to provide a structured list of all the necessary ingredients and their likely quantities for a recipe that serves {{servingSize}} people.

{{#if specialRequests}}
Please modify the recipe according to the following special requests: {{{specialRequests}}}.
For example, if the request is 'Jain', remove all root vegetables like onions and garlic. If it's 'diabetic-friendly', suggest healthier alternatives.
{{/if}}

- Be mindful of common Indian cooking practices.
- Do not include items that are typically already in a home kitchen pantry, such as salt, sugar, water, or basic cooking oil unless a specific type is required (e.g., 'mustard oil' for a specific dish).
- For each ingredient, provide a product name and a quantity appropriate for {{servingSize}} servings.
- Generate a friendly confirmation message in English that says "Here are the ingredients for {{dishName}} (serves {{servingSize}})."
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
