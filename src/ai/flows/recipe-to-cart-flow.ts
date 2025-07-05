'use server';
/**
 * @fileOverview An AI flow to get a list of ingredients for a recipe.
 * - getIngredientsForDish - A function that returns ingredients for a given dish.
 */

import {ai} from '@/ai/genkit';
import {
  ListParserOutputItemSchema,
} from '@/ai/schemas/list-parser-schemas';
import {z} from 'genkit';

const ProductSchemaForAI = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  quantity: z.string(),
});

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
  availableProducts: z
    .array(ProductSchemaForAI)
    .describe('A list of all products available in the store with their standard purchasable quantities (e.g., 1kg, 500ml).'),
});
export type RecipeToCartInput = z.infer<typeof RecipeToCartInputSchema>;

const RecipeToCartOutputSchema = z.object({
    items: z.array(ListParserOutputItemSchema).describe("The list of items extracted from the shopping list."),
    detectedLanguage: z
        .string()
        .describe(
        "The BCP-47 language code of the input list, e.g., 'en-IN' for Indian English, 'hi' for Hindi."
        ),
    confirmationText: z
        .string()
        .describe(
        "A complete, natural language confirmation message in the detected language that summarizes the items found."
        ),
    youtubeVideoUrl: z.string().url().optional().describe("A URL to a popular, relevant YouTube video for the recipe."),
});
export type RecipeToCartOutput = z.infer<typeof RecipeToCartOutputSchema>;


export async function getIngredientsForDish(
  input: RecipeToCartInput
): Promise<RecipeToCartOutput> {
  return recipeToCartFlow(input);
}

const recipeToCartPrompt = ai.definePrompt({
  name: 'recipeToCartPrompt',
  input: {schema: RecipeToCartInputSchema},
  output: {schema: RecipeToCartOutputSchema},
  prompt: `You are an expert Indian chef and shopping assistant. A user wants to cook '{{dishName}}'.

Your primary goal is to create a **practical, shoppable grocery list**, not just a recipe's ingredient list.

You will be given:
1.  The dish name: '{{dishName}}'
2.  The number of servings: {{servingSize}}
3.  A list of all available products in the store with their standard purchasable sizes.

Your tasks are:
1.  **Determine Ingredients**: First, figure out all the ingredients needed for the recipe, adjusted for {{servingSize}} servings.
2.  **Exclude Pantry Staples**: **Do not** include items that are typically already in a home kitchen pantry. This includes: salt, sugar, water, turmeric powder, chili powder, and basic cooking oil (like sunflower oil), unless a very specific type is required for the dish (e.g., 'mustard oil' for a specific curry).
3.  **Match to Products**: For each required ingredient, look at the provided list of available products and find the best match.
4.  **Suggest Purchasable Quantities**: Your final output list must consist of product names and their standard purchasable quantities from the store list (e.g., "Aashirvaad Atta" and "1 kg", NOT "2 cups atta"). For fresh produce like onions or tomatoes that are sold loose, suggest a reasonable standard weight like "500 g" or "1 kg".
5.  **Generate Confirmation**: Create a friendly confirmation message in English summarizing the list for '{{dishName}}'.
6.  **Find a Recipe Video**: Search for a popular, highly-rated YouTube video that shows how to cook '{{dishName}}'. The video should be from a reputable Indian cooking channel if possible. Set the full URL in the 'youtubeVideoUrl' field.
7.  **Return JSON**: Structure the entire output as a single JSON object matching the provided schema.

{{#if specialRequests}}
Please modify the recipe according to the following special requests: {{{specialRequests}}}.
For example, if the request is 'Jain', remove all root vegetables like onions and garlic.
{{/if}}

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const recipeToCartFlow = ai.defineFlow(
  {
    name: 'recipeToCartFlow',
    inputSchema: RecipeToCartInputSchema,
    outputSchema: RecipeToCartOutputSchema,
  },
  async (input) => {
    const {output} = await recipeToCartPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }
    return output;
  }
);
