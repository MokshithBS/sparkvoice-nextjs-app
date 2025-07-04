import {z} from 'zod';
import { ListParserOutputItemSchema } from './list-parser-schemas';

const ProductSchemaForAI = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  quantity: z.string(),
});

export const SparkSaverInputSchema = z.object({
  budget: z.number().describe('The maximum budget for the weekly grocery list.'),
  familySize: z.number().describe('The number of people in the family.'),
  preference: z.enum(['Veg', 'Non-Veg', 'Jain']).describe('The dietary preference of the family.'),
  availableProducts: z
    .array(ProductSchemaForAI)
    .describe('The full list of products available in the store with their prices.'),
});
export type SparkSaverInput = z.infer<typeof SparkSaverInputSchema>;

export const SparkSaverOutputSchema = z.object({
  items: z.array(ListParserOutputItemSchema).describe("The optimized list of items for the cart."),
  totalCost: z.number().describe('The calculated total cost of the suggested cart.'),
  savings: z.number().describe('The estimated savings compared to an average non-optimized cart.'),
  summaryText: z
    .string()
    .describe(
      'A friendly, natural language summary of the generated cart, highlighting the total cost and savings.'
    ),
});
export type SparkSaverOutput = z.infer<typeof SparkSaverOutputSchema>;
