import {z} from 'zod';

export const FoodAnalyzerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a food item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type FoodAnalyzerInput = z.infer<typeof FoodAnalyzerInputSchema>;

const NutritionSchema = z.object({
  calories: z
    .number()
    .describe('Estimated calories for the given quantity of the item.'),
  protein: z.number().describe('Estimated protein in grams.'),
  carbs: z.number().describe('Estimated carbohydrates in grams.'),
  fat: z.number().describe('Estimated fat in grams.'),
  fiber: z.number().describe('Estimated fiber in grams.'),
  sugar: z.number().describe('Estimated sugar in grams.'),
  sodium: z.number().describe('Estimated sodium in milligrams.'),
});
export type Nutrition = z.infer<typeof NutritionSchema>;

export const FoodItemSchema = z.object({
    foodName: z.string().describe('The name of the food identified in the image.'),
    servingSize: z
      .string()
      .describe(
        'The estimated serving size of the food in the image (e.g., "1 bowl", "2 pieces", "100g").'
      ),
    nutrition: NutritionSchema.describe(
      'A detailed breakdown of nutritional facts for this item.'
    ),
});
export type FoodItemSchema = z.infer<typeof FoodItemSchema>;


export const FoodAnalyzerOutputSchema = z.object({
  identifiedItems: z.array(FoodItemSchema).describe('An array of all food items identified on the plate with their nutritional info.'),
  totalNutrition: NutritionSchema.describe('The aggregated nutritional information for the entire meal.'),
  summary: z.string().describe('A brief, human-readable summary of the meal\'s nutrition.'),
});
export type FoodAnalyzerOutput = z.infer<typeof FoodAnalyzerOutputSchema>;
