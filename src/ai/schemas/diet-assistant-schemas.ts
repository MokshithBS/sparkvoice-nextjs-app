/**
 * @fileOverview Schemas for the SparkDiet AI assistant.
 */

import {z} from 'zod';
import {ProductForAISchema} from './common-schemas';

export const DietAssistantInputSchema = z.object({
  goal: z.string().describe('The primary health or dietary goal (e.g., "diabetic-friendly", "weight loss", "muscle gain").'),
  medicalCondition: z.string().optional().describe('Any specific medical condition to consider (e.g., "diabetes", "high blood pressure").'),
  familySize: z.number().int().positive().describe('The number of people in the household.'),
  budget: z.number().positive().describe('The weekly grocery budget in rupees.'),
  availableProducts: z
    .array(ProductForAISchema)
    .describe('A list of all products available in the store with their nutritional information.'),
});
export type DietAssistantInput = z.infer<typeof DietAssistantInputSchema>;

export const DietCartItemSchema = z.object({
    name: z.string().describe("The exact name of the product from the available products list."),
    quantity: z.string().describe("The suggested quantity of the product to purchase (e.g., '1 kg', '2 packs')."),
    estimated_price: z.number().describe("The estimated price for the suggested quantity of this item."),
    key_nutrition_facts: z.string().describe("A brief summary of the key nutritional facts for this item (e.g., 'High in protein and fiber')."),
});

const UnpricedDietCartItemSchema = DietCartItemSchema.omit({ estimated_price: true });

export const DietAssistantOutputSchema = z.object({
  cart: z.array(UnpricedDietCartItemSchema).describe("The generated list of grocery items for the cart."),
  total_estimated_cost: z.number().describe("The total estimated cost for all items in the generated cart, which should be within the user's budget."),
  daily_nutrition_summary: z.object({
    calories: z.string().describe("Estimated total daily calories per person."),
    protein: z.string().describe("Estimated total daily protein per person (in grams)."),
    fiber: z.string().describe("Estimated total daily fiber per person (in grams)."),
    carbs: z.string().describe("Estimated total daily carbohydrates per person (in grams)."),
    fat: z.string().describe("Estimated total daily fat per person (in grams)."),
    sugar: z.string().describe("Estimated total daily sugar per person (in grams)."),
  }).describe("An approximate daily nutritional summary for one person based on the generated cart."),
  diet_flags: z.string().describe('A summary of dietary warnings or highlights (e.g., "balanced", "high sodium", "low fiber").'),
  nutrition_tip: z.string().describe("A single, personalized, and actionable nutrition tip for the user based on their goal."),
});
export type DietAssistantOutput = z.infer<typeof DietAssistantOutputSchema>;
