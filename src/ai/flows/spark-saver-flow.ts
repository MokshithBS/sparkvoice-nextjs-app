'use server';
/**
 * @fileOverview An AI flow to build a budget-friendly grocery cart.
 * - generateSparkSaverCart - A function that builds a cart based on budget, family size, and preferences.
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
  prompt: `You are an expert Indian home budgeting assistant called "SparkSaver". Your goal is to create the most optimal, budget-friendly, and healthy weekly grocery cart for a family based on their needs.

You will be given:
1.  Budget: {{budget}} INR
2.  Family Size: {{familySize}} people
3.  Dietary Preference: {{preference}}
4.  A complete list of all products available in the store (in JSON format).

Your tasks are:
1.  **Analyze Needs**: Based on the family size and preference, determine the essential weekly grocery needs. Prioritize staple items like atta, rice, dals, basic vegetables, milk, and cooking oil.
2.  **Optimize for Budget**: From the available products, select the most cost-effective items and quantities to build a full weekly grocery list that stays strictly within the specified budget. Choose value-for-money brands and pack sizes.
3.  **Ensure Health**: While optimizing for cost, ensure the cart is balanced and healthy. Include a good mix of vegetables, proteins (dals for veg, maybe eggs/chicken if available and non-veg), and staples.
4.  **Calculate Totals**: Calculate the exact total cost of the generated cart. Also, estimate the savings a user makes with this optimized cart compared to a typical unplanned shopping, assuming a 15-20% saving.
5.  **Generate Summary**: Create a friendly, encouraging summary message in English. It should state the total cost, the estimated savings, and briefly mention the types of items included. For example: "I've created a healthy weekly cart for your family of {{familySize}} for just ₹{totalCost}, saving you about ₹{savings}! It includes all your essentials like dals, veggies, and milk."
6.  **Return JSON**: Provide ONLY a JSON object that matches the output schema. The 'items' array should contain the product name and the recommended quantity.

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
