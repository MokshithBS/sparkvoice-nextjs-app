
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

const foodAnalyzerFlow = ai.defineFlow(
  {
    name: 'foodAnalyzerFlow',
    inputSchema: FoodAnalyzerInputSchema,
    outputSchema: FoodAnalyzerOutputSchema,
  },
  async ({photoDataUri}) => {
    // For the prototype, we will return a hardcoded result.
    const hardcodedResult: FoodAnalyzerOutput = {
      identifiedItems: [
        {
          foodName: 'Idli',
          servingSize: '2 pieces',
          nutrition: {
            calories: 116,
            protein: 4,
            carbs: 26,
            fat: 0.4,
            fiber: 2,
            sugar: 0.2,
            sodium: 300
          }
        },
        {
          foodName: 'Vada',
          servingSize: '3 pieces',
          nutrition: {
            calories: 240,
            protein: 9,
            carbs: 30,
            fat: 10,
            fiber: 6,
            sugar: 0,
            sodium: 450
          }
        },
        {
          foodName: 'Sambar',
          servingSize: '1 bowl',
          nutrition: {
            calories: 304,
            protein: 15,
            carbs: 45,
            fat: 8,
            fiber: 10,
            sugar: 9.4,
            sodium: 800
          }
        },
        {
          foodName: 'Coconut Chutney',
          servingSize: '1 bowl',
          nutrition: {
            calories: 60,
            protein: 1,
            carbs: 3,
            fat: 5,
            fiber: 2,
            sugar: 1.9,
            sodium: 200
          }
        }
      ],
      totalNutrition: {
        calories: 720,
        protein: 29,
        carbs: 104,
        fat: 23.4,
        fiber: 20,
        sugar: 11.5,
        sodium: 1750
      },
      summary: "This South Indian meal provides about 720 kcal. It is high in carbohydrates and sodium, but also a good source of protein and fiber. Consider portion sizes for a balanced diet."
    };

    return hardcodedResult;
  }
);

export async function analyzeFood(
  input: FoodAnalyzerInput
): Promise<FoodAnalyzerOutput> {
  return foodAnalyzerFlow(input);
}
