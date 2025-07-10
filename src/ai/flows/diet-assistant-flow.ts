
'use server';
/**
 * @fileOverview A health-conscious shopping assistant designed for Indian users.
 *
 * - generateDietCart - A function that generates a personalized grocery cart based on health goals.
 */

import {ai} from '@/ai/genkit';
import { products } from '@/lib/products';
import {
  type DietAssistantInput,
  DietAssistantInputSchema,
  type DietAssistantOutput,
  DietAssistantOutputSchema,
  DietCartItemSchema,
} from '@/ai/schemas/diet-assistant-schemas';

export async function generateDietCart(
  input: DietAssistantInput
): Promise<DietAssistantOutput> {
  return dietAssistantFlow(input);
}

const dietAssistantPrompt = ai.definePrompt({
  name: 'dietAssistantPrompt',
  input: {schema: DietAssistantInputSchema},
  output: {schema: DietAssistantOutputSchema},
  prompt: `You are SparkDiet AI, an expert nutritionist and shopping assistant for Indian users. Your goal is to generate a personalized, healthy, and budget-conscious weekly grocery list.

You will be given:
1.  The user's dietary goal: '{{goal}}'
2.  Their medical condition (if any): '{{medicalCondition}}'
3.  Their household size: {{familySize}}
4.  Their weekly budget: ₹{{budget}}
5.  A complete list of available grocery products with their prices.

Your tasks are:
1.  **Analyze User Needs**: Carefully consider the user's goal, condition, family size, and budget. For example, a 'diabetic' goal requires low-glycemic index foods and minimal sugar. 'Muscle gain' requires high-protein items.
2.  **Create a Balanced Shopping List**: Select a variety of culturally relevant Indian food items (like dals, millets, fresh vegetables, paneer, atta) that align with the user's health goals.
3.  **Suggest Quantities**: For each item, suggest a reasonable quantity for the specified family size for one week.
4.  **Stay Within Budget**: The total cost of your suggested items must not exceed the user's budget.
5.  **Provide Nutritional Rationale**: For each item in the cart, provide a brief note on its 'key_nutrition_facts'.
6.  **Summarize Nutrition**: Provide an approximate 'daily_nutrition_summary' for one person based on the list.
7.  **Give Actionable Advice**: Provide one clear, simple, and personalized 'nutrition_tip' related to the user's goal.
8.  **Format Output**: Return ONLY a JSON object that matches the output schema. The 'name' field for each cart item MUST be an exact match from the available products list.

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const dietAssistantFlow = ai.defineFlow(
  {
    name: 'dietAssistantFlow',
    inputSchema: DietAssistantInputSchema,
    outputSchema: DietAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await dietAssistantPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }

    // Post-process to calculate price and ensure accuracy
    let total_estimated_cost = 0;
    const pricedCart = output.cart.map(item => {
      const productDetails = products.find(p => p.name === item.name);
      const estimated_price = productDetails ? (productDetails.salePrice || productDetails.price) : 0;
      total_estimated_cost += estimated_price;
      return {
        ...item,
        estimated_price: estimated_price,
      };
    });

    return {
        ...output,
        cart: pricedCart,
        total_estimated_cost: total_estimated_cost,
    };
  }
);
