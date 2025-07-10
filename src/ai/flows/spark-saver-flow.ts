'use server';
/**
 * @fileOverview An AI flow to build a grocery cart based on a budget.
 * - generateSparkSaverCart - A function that builds a cart based on budget and family size.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {
  type SparkSaverInput,
  SparkSaverInputSchema,
  type SparkSaverOutput,
  SparkSaverOutputSchema,
} from '@/ai/schemas/spark-saver-schemas';
import { products } from '@/lib/products';

export async function generateSparkSaverCart(
  input: SparkSaverInput
): Promise<SparkSaverOutput> {
  return sparkSaverFlow(input);
}

// A simpler schema for the AI model to output, reducing complexity.
const SparkSaverAISchema = z.object({
  suggestedItems: z.array(z.object({
    productName: z.string().describe("The exact name of the product from the available products list."),
    quantity: z.string().describe("The quantity to add to the cart, as a string (e.g., '1', '2')."),
    reasoning: z.string().describe("A user-friendly description of why this item was chosen, e.g., 'Weekly Atta Supply'."),
  })),
  summaryText: z.string().describe("A friendly, summary message ('summaryText') that explains your choices."),
});


const sparkSaverPrompt = ai.definePrompt({
  name: 'sparkSaverPrompt',
  input: {schema: SparkSaverInputSchema},
  output: {schema: SparkSaverAISchema},
  prompt: `You are an expert, budget-conscious Indian shopping assistant for an e-commerce platform called SparkVoice. Your goal is to help a family create a weekly shopping cart that provides the best value within their budget.

You will be given:
1.  The weekly budget: '₹{{budget}}'
2.  The family size: '{{familySize}}'
3.  Optional user preferences: '{{preferences}}'
4.  A complete list of all products available in the store.

Your tasks are:
1.  **Analyze Needs**: Based on the family size, estimate the required quantities of essential weekly staples (atta, rice, dal, oil, milk, key vegetables).
2.  **Select Value Products**: From the list of available products, select items that meet these needs while staying strictly under the budget. Prioritize value packs, items on sale, and cost-effective alternatives.
3.  **Incorporate Preferences**: Adjust your selections based on user preferences (e.g., if 'vegetarian', do not include eggs or meat).
4.  **Format Output**: For each selected item, provide the product name, the quantity to purchase, and a user-friendly reasoning.
5.  **Generate a Summary**: Write a friendly, summary message ('summaryText') that explains your choices. For example: "For your family of {{familySize}} on a ₹{{budget}} budget, I've selected a 5kg pack of Aashirvaad Atta for best value and added seasonal vegetables to keep costs down. The total is just under your budget!"
6.  **Return JSON**: Provide ONLY a JSON object that matches the output schema.

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const sparkSaverFlow = ai.defineFlow(
  {
    name: 'sparkSaverFlow',
    inputSchema: SparkSaverInputSchema,
    outputSchema: SparkSaverOutputSchema,
  },
  async (input) => {
    const {output} = await sparkSaverPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }

    // Post-process to build the final cart structure, reducing AI's workload.
    const cartItems = output.suggestedItems.map(item => {
        const productDetails = products.find(p => p.name === item.productName);
        return {
            product: item.productName,
            englishProduct: item.productName, // Assuming English for now
            quantity: item.quantity,
            requestedText: item.reasoning,
        };
    }).filter(item => products.some(p => p.name === item.product)); // Ensure product exists

    return {
        items: cartItems,
        summaryText: output.summaryText,
    };
  }
);
