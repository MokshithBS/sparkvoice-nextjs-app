
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
  prompt: `You are SparkDiet, an expert nutritionist and shopping assistant for Indian users. Your primary goal is to generate a personalized, healthy, budget-conscious, and calorically-aware weekly grocery list.

You will be given:
1.  The user's dietary goal: '{{goal}}'
2.  A specific daily calorie target (optional): {{calorieTarget}}
3.  Their medical condition (if any): '{{medicalCondition}}'
4.  Their household size: {{familySize}}
5.  Their weekly budget: ₹{{budget}}
6.  A complete list of available grocery products.

Your tasks are:
1.  **Analyze User Needs**:
    -   Carefully consider the user's goal, condition, family size, and budget. For a 'diabetic' goal, prioritize low-glycemic, low-sugar foods. For 'Jain', exclude all root vegetables.
    -   Determine a recommended daily calorie target. If the user provides a 'calorieTarget', use that. Otherwise, estimate a standard target (e.g., 2000 kcal for general, 1500 for weight loss).

2.  **Create a Balanced Shopping List**:
    -   Select a variety of culturally relevant Indian food items (dals, millets, vegetables, paneer, atta) that align with health goals.
    -   Suggest a reasonable weekly quantity for each item based on the family size.
    -   For each item, provide a detailed nutritional breakdown (calories, protein, etc.) for the suggested quantity. If nutritional info for a product is missing, you MUST add an error message to the 'errors' array.

3.  **Validate Budget and Calories**:
    -   The total cost of your suggested items MUST NOT exceed the user's budget. If it does, you MUST add an error message like "Budget exceeded by ₹XX" to the 'errors' array.
    -   Calculate the 'actual' daily calories per person from your generated cart.
    -   Compare the 'actual' calories to the 'recommended' target. If the deviation is greater than 15% (higher or lower), you MUST add a warning to the 'calorie_warnings' array.

4.  **Generate Summaries and Tips**:
    -   Provide a complete 'daily_nutrition_summary' per person.
    -   Provide actionable 'calorie_warnings' based on the overall diet (e.g., "High sodium content", "Low fiber").
    -   Give one clear, simple, and personalized 'nutrition_tip'.

5.  **Format Output**: Return ONLY a valid, machine-readable JSON object that strictly matches the output schema.

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

    // Post-process to add estimated prices, as this is deterministic and reduces AI's workload.
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
        total_estimated_cost: total_estimated_cost, // Use our calculated total for accuracy
    };
  }
);
