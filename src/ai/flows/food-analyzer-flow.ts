
'use server';
/**
 * @fileOverview An AI flow to analyze a food photo and return nutritional information.
 * - analyzeFood - A function that takes a food photo and returns its nutritional breakdown.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  type FoodAnalyzerInput,
  FoodAnalyzerInputSchema,
  type FoodAnalyzerOutput,
  FoodAnalyzerOutputSchema,
} from '@/ai/schemas/food-analyzer-schemas';
import {fetchNutrition} from '@/services/nutrition-api';

const foodAnalyzerPrompt = ai.definePrompt({
  name: 'foodAnalyzerPrompt',
  input: {schema: z.object({photoDataUri: z.string()})},
  output: {
    schema: z.object({
      foodName: z
        .string()
        .describe('The name of the food identified in the image.'),
      servingSize: z
        .string()
        .describe(
          'The estimated serving size of the food in the image (e.g., "1 bowl", "2 pieces", "100g").'
        ),
    }),
  },
  prompt: `You are an expert food identifier. Analyze the image provided and identify the food item and its estimated serving size.

Image: {{media url=photoDataUri}}`,
});

const foodAnalyzerFlow = ai.defineFlow(
  {
    name: 'foodAnalyzerFlow',
    inputSchema: FoodAnalyzerInputSchema,
    outputSchema: FoodAnalyzerOutputSchema,
  },
  async ({photoDataUri}) => {
    // 1. Identify the food from the image.
    const {output: identification} = await foodAnalyzerPrompt({photoDataUri});
    if (!identification) {
      throw new Error('Could not identify the food in the image.');
    }

    const {foodName, servingSize} = identification;
    const nutritionQuery = `${servingSize} ${foodName}`;

    // 2. Get nutritional data from the API.
    const nutrition = await fetchNutrition(nutritionQuery);
    if (!nutrition) {
      throw new Error(
        `Could not retrieve nutritional information for "${nutritionQuery}".`
      );
    }

    // 3. Construct the final output.
    return {
      foodName,
      servingSize,
      nutrition,
    };
  }
);

export async function analyzeFood(
  input: FoodAnalyzerInput
): Promise<FoodAnalyzerOutput> {
  return foodAnalyzerFlow(input);
}
