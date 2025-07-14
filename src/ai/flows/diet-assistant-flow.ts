
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
  DietAssistantAIOutputSchema,
} from '@/ai/schemas/diet-assistant-schemas';
import type { DietCartItem } from '@/ai/schemas/diet-assistant-schemas';

export async function generateDietCart(
  input: DietAssistantInput
): Promise<DietAssistantOutput> {
  return dietAssistantFlow(input);
}

const dietAssistantPrompt = ai.definePrompt({
  name: 'dietAssistantPrompt',
  input: {schema: DietAssistantInputSchema},
  output: {schema: DietAssistantAIOutputSchema},
  prompt: `You are SparkDiet, an expert nutritionist and shopping assistant for Indian users. Your primary goal is to generate a personalized, healthy, budget-conscious, and culturally relevant weekly grocery list.

You will be given:
1.  The user's dietary goal: '{{goal}}'
2.  Their medical condition (if any): '{{medicalCondition}}'
3.  Their household size: {{familySize}}
4.  Their weekly budget: ₹{{budget}}
5.  A complete list of available grocery products.

Your tasks are:
1.  **Analyze User Needs**:
    -   Carefully consider the user's goal, condition, family size, and budget. For 'diabetic', prioritize low-glycemic, low-sugar foods. For 'Jain', exclude all root vegetables.
2.  **Create a Shopping List**:
    -   Select a variety of culturally relevant Indian food items (dals, millets, vegetables, paneer, atta) that align with health goals.
    -   Suggest a reasonable weekly quantity for each item based on the family size (e.g. "1", "2 packs"). The number of units to buy.
    -   For each item, provide a simple, user-friendly \`key_nutrition_facts\` summary (e.g., "High in protein, good for weight loss").
3.  **Generate Summaries**:
    -   Provide a \`nutrition_tip\`.
    -   Provide a \`diet_flags\` summary (e.g., 'Balanced', 'High-Protein').
4.  **Format Output**: Return ONLY a valid, machine-readable JSON object that strictly matches the output schema.

Available Products (JSON format):
{{{json availableProducts}}}`,
});

// Helper to generate approximate nutrition data for the prototype
const getRandomNutrition = () => ({
    calories: Math.floor(Math.random() * 300) + 100, // 100-400 kcal
    protein: Math.floor(Math.random() * 20), // 0-20g
    carbs: Math.floor(Math.random() * 50), // 0-50g
    fat: Math.floor(Math.random() * 15), // 0-15g
    fiber: Math.floor(Math.random() * 10), // 0-10g
    sugar: Math.floor(Math.random() * 20), // 0-20g
    sodium: Math.floor(Math.random() * 500), // 0-500mg
});


const dietAssistantFlow = ai.defineFlow(
  {
    name: 'dietAssistantFlow',
    inputSchema: DietAssistantInputSchema,
    outputSchema: DietAssistantOutputSchema,
  },
  async (input) => {
    // 1. Get initial cart from AI
    const {output: aiResponse} = await dietAssistantPrompt(input);
    if (!aiResponse) {
      throw new Error('The AI failed to generate a valid response.');
    }
    const { cart: aiCart, nutrition_tip, diet_flags } = aiResponse;

    let total_estimated_cost = 0;
    const errors: string[] = [];
    
    // 2. Enrich cart with prices and nutrition data from API
    const enrichedCart: DietCartItem[] = aiCart.map((item) => {
        const productDetails = products.find(p => p.name === item.name);
        
        // Correctly parse quantity for price calculation (e.g., "2 packs" -> 2, "1 kg" -> 1)
        const numericQuantity = parseInt(item.quantity.match(/^(\d+)/)?.[1] || '1', 10);
        const estimated_price = productDetails ? (productDetails.salePrice || productDetails.price) * numericQuantity : 0;
        total_estimated_cost += estimated_price;
        
        // For the prototype, we use randomized nutrition data.
        const nutrition = getRandomNutrition();

        return {
            ...item,
            estimated_price,
            nutrition: {
                calories: (nutrition?.calories || 0) * numericQuantity,
                protein: (nutrition?.protein || 0) * numericQuantity,
                carbs: (nutrition?.carbs || 0) * numericQuantity,
                fat: (nutrition?.fat || 0) * numericQuantity,
                fiber: (nutrition?.fiber || 0) * numericQuantity,
                sugar: (nutrition?.sugar || 0) * numericQuantity,
                sodium: (nutrition?.sodium || 0) * numericQuantity,
            },
        };
    });

    // Budget validation
    if (total_estimated_cost > input.budget) {
        errors.push(`Budget exceeded by ₹${(total_estimated_cost - input.budget).toFixed(2)}`);
    }

    return {
        cart: enrichedCart,
        total_estimated_cost,
        errors,
        nutrition_tip,
        diet_flags,
    };
  }
);

