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

const RecipeIngredientSchema = z.object({
    name: z.string().describe("The name of the ingredient, e.g., 'All-Purpose Flour'."),
    quantity: z.string().describe("The quantity from the recipe, e.g., '2 cups' or '1 tsp'."),
});

const RecipeToCartOutputSchema = z.object({
    shoppableItems: z.array(ListParserOutputItemSchema).describe("The practical, shoppable list of products and their purchasable quantities."),
    ingredients: z.array(RecipeIngredientSchema).describe("The detailed list of ingredients as they would appear in a recipe book."),
    recipeInstructions: z.string().describe("The step-by-step cooking instructions for the recipe."),
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
    youtubeVideoUrl: z.string().optional().describe("A URL to a popular, relevant YouTube video for the recipe."),
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

Your goal is to provide a complete cooking and shopping experience.

You will be given:
1.  The dish name: '{{dishName}}'
2.  The number of servings: {{servingSize}}
3.  A complete list of all products available in the store with their standard purchasable sizes.

Your tasks are:
1.  **Generate Recipe**: First, create a clear, step-by-step recipe for '{{dishName}}' adjusted for {{servingSize}} servings. This includes a detailed ingredient list (like '2 cups atta', '1 tsp salt') and cooking instructions. Set these in the 'ingredients' and 'recipeInstructions' fields.
2.  **Create Shoppable List**: From the recipe ingredients, create a practical, **shoppable grocery list** ('shoppableItems').
3.  **Exclude Pantry Staples from Shopping List**: From the **shoppable list only**, **do not** include items that are typically already in a home kitchen pantry. This includes: salt, sugar, water, turmeric powder, chili powder, and basic cooking oil (like sunflower oil), unless a very specific type is required for the dish (e.g., 'mustard oil'). The main recipe ingredient list ('ingredients') should still include them for completeness.
4.  **Match to Products**: For each required item on the shoppable list, find the best matching product from the provided list of available store products.
5.  **Suggest Purchasable Quantities**: Your final shoppable list must consist of product names and their standard purchasable quantities from the store list (e.g., "Aashirvaad Atta" and "1 kg", NOT "2 cups atta"). For fresh produce like onions or tomatoes that are sold loose, suggest a reasonable standard weight like "500 g" or "1 kg".
6.  **Generate Confirmation**: Create a friendly confirmation message in English summarizing the shoppable list.
7.  **Find a Recipe Video**: Search for a popular, highly-rated YouTube video that shows how to cook '{{dishName}}'. The video should be from a reputable Indian cooking channel if possible. Set the full URL in the 'youtubeVideoUrl' field.
8.  **Return JSON**: Structure the entire output as a single JSON object matching the provided schema.

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
