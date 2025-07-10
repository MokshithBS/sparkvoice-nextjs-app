'use server';
/**
 * @fileOverview A health-conscious shopping assistant designed for Indian users.
 *
 * - generateDietCart - A function that generates a personalized grocery cart based on health goals.
 */

import {ai} from '@/ai/genkit';
import {
  type DietAssistantInput,
  DietAssistantInputSchema,
  type DietAssistantOutput,
  DietAssistantOutputSchema,
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
  prompt: `You are SparkDiet AI, an expert nutritionist and shopping assistant for Indian users. Your goal is to generate a personalized, healthy, and budget-conscious weekly grocery cart.

You will be given:
1.  The user's dietary goal: '{{goal}}'
2.  Their medical condition (if any): '{{medicalCondition}}'
3.  Their household size: {{familySize}}
4.  Their weekly budget: ₹{{budget}}
5.  A complete list of available grocery products with their prices and nutritional information.

Your tasks are:
1.  **Analyze User Needs**: Carefully consider the user's goal, condition, family size, and budget. For example, a 'diabetic' goal requires low-glycemic index foods and minimal sugar. 'Muscle gain' requires high-protein items.
2.  **Create a Balanced Cart**: Select a variety of culturally relevant Indian food items (like dals, millets, fresh vegetables, paneer, atta) that align with the user's health goals. Calculate the quantity needed for the week for the specified family size.
3.  **Prioritize Health & Affordability**:
    -   Choose whole foods and minimally processed items.
    -   Suggest cost-effective but healthy alternatives (e.g., suggest seasonal vegetables, or choose jaggery over refined sugar if appropriate).
    -   The 'total_estimated_cost' MUST NOT exceed the user's budget.
4.  **Provide Nutritional Insights**:
    -   For each item in the cart, provide its name, suggested purchase quantity, estimated price, and a brief note on its 'key_nutrition_facts'.
    -   Calculate and provide an approximate 'daily_nutrition_summary' for one person.
    -   Set a 'diet_flags' warning (e.g., "high sodium", "low fiber", "balanced") to give the user a quick overview.
5.  **Give Actionable Advice**: Provide one clear, simple, and personalized 'nutrition_tip' related to the user's goal.
6.  **Return JSON**: Structure the entire output as a single JSON object matching the output schema.

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
    return output;
  }
);
