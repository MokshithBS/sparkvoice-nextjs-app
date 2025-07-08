'use server';
/**
 * @fileOverview An AI flow to build a contextual grocery cart.
 * - generateContextualCart - A function that builds a cart based on a high-level user query.
 */

import {ai} from '@/ai/genkit';
import {
  type ContextToCartInput,
  ContextToCartInputSchema,
  type ContextToCartOutput,
  ContextToCartOutputSchema,
} from '@/ai/schemas/contextual-cart-schemas';

export async function generateContextualCart(
  input: ContextToCartInput
): Promise<ContextToCartOutput> {
  return contextToCartFlow(input);
}

const contextToCartPrompt = ai.definePrompt({
  name: 'contextToCartPrompt',
  input: {schema: ContextToCartInputSchema},
  output: {schema: ContextToCartOutputSchema},
  prompt: `You are a creative and intelligent shopping assistant for an Indian e-commerce platform called SparkVoice. Your goal is to transform a user's high-level, contextual request into a practical and personalized shopping cart.

You will be given:
1.  The user's request: '{{query}}'
2.  A complete list of all products available in the store.

Your tasks are:
1.  **Analyze Intent**: Understand the user's core need (e.g., party, health focus, comfort food for a rainy day, quick meal for students).
2.  **Select Relevant Products**: From the list of available products, create a curated list of items that match the user's context. Be thoughtful about quantities (e.g., for a party of 8, suggest larger packs of snacks and drinks).
3.  **Generate a Creative Summary**: Write a friendly, personalized summary message ('summaryText') that explains your choices and why they fit the context. For example: "For your beach trip, I've added sunscreen for protection, coconut water to stay hydrated, and some easy-to-carry snacks!"
4.  **Return JSON**: Provide ONLY a JSON object that matches the output schema. The 'items' array should contain the product name and the recommended quantity.

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const contextToCartFlow = ai.defineFlow(
  {
    name: 'contextToCartFlow',
    inputSchema: ContextToCartInputSchema,
    outputSchema: ContextToCartOutputSchema,
  },
  async (input) => {
    const {output} = await contextToCartPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }
    return output;
  }
);
