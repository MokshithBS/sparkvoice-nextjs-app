import {z} from 'zod';

const ProductSchemaForAI = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
});

export const ProductSuggesterInputSchema = z.object({
  contextProducts: z
    .array(z.string())
    .describe(
      "A list of product names that provide context for the suggestion. This could be what the user is searching for, or what's already in their cart."
    ),
  availableProducts: z
    .array(ProductSchemaForAI)
    .describe('The full list of products available in the store.'),
});
export type ProductSuggesterInput = z.infer<typeof ProductSuggesterInputSchema>;

export const ProductSuggesterOutputSchema = z.object({
  suggestionIds: z
    .array(z.number())
    .max(4)
    .describe(
      'An array of product IDs for the suggested items. Maximum of 4 suggestions.'
    ),
});
export type ProductSuggesterOutput = z.infer<
  typeof ProductSuggesterOutputSchema
>;
