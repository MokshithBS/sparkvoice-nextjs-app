
'use server';
/**
 * @fileOverview An AI flow to analyze a food photo and return nutritional information for the entire meal.
 * - analyzeFood - A function that takes a food photo and returns its nutritional breakdown.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  type FoodAnalyzerInput,
  FoodAnalyzerInputSchema,
  type FoodAnalyzerOutput,
  FoodAnalyzerOutputSchema,
  FoodItemSchema,
} from '@/ai/schemas/food-analyzer-schemas';
import {fetchNutrition} from '@/services/nutrition-api';
import type { MappedNutritionInfo } from '@/services/nutrition-api';

const foodAnalyzerPrompt = ai.definePrompt({
  name: 'foodAnalyzerPrompt',
  input: {schema: z.object({photoDataUri: z.string()})},
  output: {
    schema: z.object({
        items: z.array(z.object({
            foodName: z
                .string()
                .describe('The name of a single food item identified in the image (e.g., "idli", "sambar").'),
            servingSize: z
                .string()
                .describe(
                'The estimated serving size of that specific food item (e.g., "2 pieces", "1 bowl", "100g").'
                ),
        })),
    }),
  },
  prompt: `You are an expert food identifier specializing in Indian cuisine. Analyze the image provided. Identify ALL distinct food items on the plate. For each item, provide its name and estimated serving size.

Image: {{media url=photoDataUri}}`,
});

const foodAnalyzerFlow = ai.defineFlow(
  {
    name: 'foodAnalyzerFlow',
    inputSchema: FoodAnalyzerInputSchema,
    outputSchema: FoodAnalyzerOutputSchema,
  },
  async ({photoDataUri}) => {
    // 1. Identify all food items from the image.
    const {output: identification} = await foodAnalyzerPrompt({photoDataUri});
    if (!identification || identification.items.length === 0) {
      throw new Error('Could not identify any food items in the image.');
    }

    // 2. Get nutritional data for each item and aggregate it.
    const identifiedItems: FoodItemSchema[] = [];
    const totalNutrition: MappedNutritionInfo = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
    };

    for (const item of identification.items) {
        const nutritionQuery = `${item.servingSize} ${item.foodName}`;
        const nutrition = await fetchNutrition(nutritionQuery);
        
        if (nutrition) {
            identifiedItems.push({
                foodName: item.foodName,
                servingSize: item.servingSize,
                nutrition,
            });

            // Aggregate totals
            totalNutrition.calories += nutrition.calories;
            totalNutrition.protein += nutrition.protein;
            totalNutrition.carbs += nutrition.carbs;
            totalNutrition.fat += nutrition.fat;
            totalNutrition.fiber += nutrition.fiber;
            totalNutrition.sugar += nutrition.sugar;
            totalNutrition.sodium += nutrition.sodium;
        }
    }
    
    if (identifiedItems.length === 0) {
        throw new Error("Could not retrieve nutritional information for any identified items.");
    }

    // 3. Construct the final output.
    const summary = `This meal contains approximately ${Math.round(totalNutrition.calories)} calories and ${Math.round(totalNutrition.sugar)}g of sugar.`;

    return {
      identifiedItems,
      totalNutrition,
      summary,
    };
  }
);

export async function analyzeFood(
  input: FoodAnalyzerInput
): Promise<FoodAnalyzerOutput> {
  return foodAnalyzerFlow(input);
}
