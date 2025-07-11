
/**
 * @fileOverview Schemas for the SparkDiet AI assistant.
 */

import {z} from 'zod';
import {ProductForAISchema} from './common-schemas';

export const DietAssistantInputSchema = z.object({
  goal: z.string().describe('The primary health or dietary goal (e.g., "diabetic-friendly", "weight loss", "muscle gain", "Jain").'),
  calorieTarget: z.number().optional().describe('A specific daily calorie target for one person (e.g., 1200, 2000).'),
  medicalCondition: z.string().optional().describe('Any specific medical condition to consider (e.g., "diabetes", "high blood pressure").'),
  familySize: z.number().int().positive().describe('The number of people in the household.'),
  budget: z.number().positive().describe('The weekly grocery budget in rupees.'),
  availableProducts: z
    .array(ProductForAISchema)
    .describe('A list of all products available in the store with their nutritional information.'),
});
export type DietAssistantInput = z.infer<typeof DietAssistantInputSchema>;

// This is the simplified structure the AI will be asked to return.
// The main flow will then enrich this with nutritional data.
export const AISuggestedCartItemSchema = z.object({
    name: z.string().describe("The exact name of the product from the available products list."),
    quantity: z.string().describe("The suggested quantity of the product to purchase (e.g., '1 kg', '2 packs')."),
    key_nutrition_facts: z.string().describe("A brief, user-friendly summary of why this item is a good choice for the user's goal (e.g., 'High in protein and fiber, good for muscle gain')."),
});

// This is the schema for the AI's direct output.
export const DietAssistantAIOutputSchema = z.object({
    cart: z.array(AISuggestedCartItemSchema).describe("The generated list of grocery items for the cart."),
    nutrition_tip: z.string().describe("A single, personalized, and actionable nutrition tip for the user based on their goal."),
    diet_flags: z.string().describe("A summary of the diet's primary characteristics (e.g., 'Balanced', 'High-Protein', 'Low-Carb')."),
});


const NutritionSchema = z.object({
    calories: z.number().describe("Estimated calories for the given quantity of the item."),
    protein: z.number().describe("Estimated protein in grams."),
    carbs: z.number().describe("Estimated carbohydrates in grams."),
    fat: z.number().describe("Estimated fat in grams."),
    fiber: z.number().describe("Estimated fiber in grams."),
    sugar: z.number().describe("Estimated sugar in grams."),
    sodium: z.number().describe("Estimated sodium in milligrams."),
});

// This is the final, enriched cart item schema that the flow will return.
export const DietCartItemSchema = AISuggestedCartItemSchema.extend({
    estimated_price: z.number().describe("The estimated price for the suggested quantity of this item."),
    nutrition: NutritionSchema.describe("A detailed breakdown of nutritional facts for this item."),
});

// This is the final output schema for the entire flow.
export const DietAssistantOutputSchema = z.object({
  cart: z.array(DietCartItemSchema).describe("The generated list of grocery items for the cart with detailed nutritional info."),
  total_estimated_cost: z.number().describe("The total estimated cost for all items in the generated cart."),
  daily_nutrition_summary: NutritionSchema.describe("An approximate daily nutritional summary for one person based on the generated cart."),
  calorie_target: z.object({
    recommended: z.number().describe("The recommended daily calorie target based on the user's goal."),
    actual: z.number().describe("The actual calculated daily calories per person from the generated cart."),
    difference: z.number().describe("The difference between the actual and recommended calories."),
  }).describe("A validation of the cart's calories against the user's target."),
  calorie_warnings: z.array(z.string()).describe("A list of warnings if the cart deviates significantly from nutritional goals (e.g., 'Actual calories are more than 15% below target', 'Low fiber content')."),
  errors: z.array(z.string()).describe("A list of errors encountered, such as missing nutritional info for an item or exceeding the budget."),
  nutrition_tip: z.string().describe("A single, personalized, and actionable nutrition tip for the user based on their goal."),
  diet_flags: z.string().describe("A summary of the diet's primary characteristics (e.g., 'Balanced', 'High-Protein', 'Low-Carb')."),
});
export type DietAssistantOutput = z.infer<typeof DietAssistantOutputSchema>;
