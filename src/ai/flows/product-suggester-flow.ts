'use server';
/**
 * @fileOverview An AI flow to suggest products to the user.
 *
 * - suggestProducts - A function that suggests products based on context.
 */

import {ai} from '@/ai/genkit';
import {
  type ProductSuggesterInput,
  ProductSuggesterInputSchema,
  type ProductSuggesterOutput,
  ProductSuggesterOutputSchema,
} from '@/ai/schemas/product-suggester-schemas';

export async function suggestProducts(
  input: ProductSuggesterInput
): Promise<ProductSuggesterOutput> {
  return productSuggesterFlow(input);
}

const productSuggesterPrompt = ai.definePrompt({
  name: 'productSuggesterPrompt',
  input: {schema: ProductSuggesterInputSchema},
  output: {schema: ProductSuggesterOutputSchema},
  prompt: `You are an intelligent shopping assistant for an Indian e-commerce platform. Your goal is to help users discover products.

You will be given:
1. A list of product names for context. This might be a user's search query (if they couldn't find the item) or the list of items currently in their shopping cart.
2. A complete list of all products available in the store, including their ID, name, and category.

Your task is to suggest relevant products from the list of available products.

- If the context list seems to be a search for an unavailable item, find the best alternatives from the available products. For example, if the user searches for "Coca-cola" and it's not available, you could suggest "Pepsi".
- If the context list looks like a shopping cart, suggest complementary products. For example, if the cart contains "Bread" and "Butter", you might suggest "Jam" or "Eggs".
- Do not suggest any products that are already mentioned in the context list.
- Return a list of up to 4 product IDs for your suggestions.
- Provide ONLY a JSON object that matches the output schema.

Context Products:
{{#each contextProducts}}
- {{{this}}}
{{/each}}

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const productSuggesterFlow = ai.defineFlow(
  {
    name: 'productSuggesterFlow',
    inputSchema: ProductSuggesterInputSchema,
    outputSchema: ProductSuggesterOutputSchema,
  },
  async (input) => {
    const {output} = await productSuggesterPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }
    return output;
  }
);
