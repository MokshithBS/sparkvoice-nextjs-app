import {z} from 'zod';
import { ListParserOutputItemSchema } from './list-parser-schemas';
import { ProductForAISchema } from './common-schemas';

export const SparkSaverInputSchema = z.object({
  budget: z.number().positive().describe("The user's weekly grocery budget."),
  familySize: z.number().positive().int().describe("The number of people in the household."),
  preferences: z.string().optional().describe("Any specific user preferences, e.g., 'vegetarian', 'prefers organic', 'no spicy food'."),
  availableProducts: z
    .array(ProductForAISchema)
    .describe('The full list of products available in the store with their prices.'),
});
export type SparkSaverInput = z.infer<typeof SparkSaverInputSchema>;

export const SparkSaverOutputSchema = z.object({
  items: z.array(ListParserOutputItemSchema).describe("The curated list of items for the cart that fits the budget."),
  summaryText: z
    .string()
    .describe(
      'A friendly, natural language summary of the generated cart, explaining the choices made based on the budget and preferences.'
    ),
});
export type SparkSaverOutput = z.infer<typeof SparkSaverOutputSchema>;
