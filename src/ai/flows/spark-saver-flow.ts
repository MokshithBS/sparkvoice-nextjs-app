'use server';
/**
 * @fileOverview An AI flow to build a grocery cart based on a budget.
 * - generateSparkSaverCart - A function that builds a cart based on budget and family size.
 */

import {ai} from '@/ai/genkit';
import {
  type SparkSaverInput,
  SparkSaverInputSchema,
  type SparkSaverOutput,
  SparkSaverOutputSchema,
} from '@/ai/schemas/spark-saver-schemas';

export async function generateSparkSaverCart(
  input: SparkSaverInput
): Promise<SparkSaverOutput> {
  return sparkSaverFlow(input);
}

const sparkSaverPrompt = ai.definePrompt({
  name: 'sparkSaverPrompt',
  input: {schema: SparkSaverInputSchema},
  output: {schema: SparkSaverOutputSchema},
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
4.  **Generate a Summary**: Write a friendly, summary message ('summaryText') that explains your choices. For example: "For your family of {{familySize}} on a ₹{{budget}} budget, I've selected a 5kg pack of Aashirvaad Atta for best value and added seasonal vegetables to keep costs down. The total is just under your budget!"
5.  **Return JSON**: Provide ONLY a JSON object that matches the output schema. The 'items' array should contain the product name and the recommended quantity.

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
    return output;
  }
);
