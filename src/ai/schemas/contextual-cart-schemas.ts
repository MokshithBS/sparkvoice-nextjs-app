import {z} from 'zod';
import { ListParserOutputItemSchema } from './list-parser-schemas';
import { ProductForAISchema } from './common-schemas';

export const ContextToCartInputSchema = z.object({
  query: z.string().describe("The user's high-level, contextual request (e.g., 'planning a party', 'need healthy food')."),
  availableProducts: z
    .array(ProductForAISchema)
    .describe('The full list of products available in the store with their prices.'),
});
export type ContextToCartInput = z.infer<typeof ContextToCartInputSchema>;

export const ContextToCartOutputSchema = z.object({
  items: z.array(ListParserOutputItemSchema).describe("The curated list of items for the cart."),
  summaryText: z
    .string()
    .describe(
      'A friendly, natural language summary of the generated cart, explaining the choices made based on the context.'
    ),
});
export type ContextToCartOutput = z.infer<typeof ContextToCartOutputSchema>;
