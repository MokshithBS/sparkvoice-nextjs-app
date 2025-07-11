
'use server';
/**
 * @fileOverview A health-conscious shopping assistant designed for Indian users.
 *
 * - generateDietCart - A function that generates a personalized grocery cart based on health goals.
 */

import {ai} from '@/ai/genkit';
import { products } from '@/lib/products';
import { fetchNutrition, type MappedNutritionInfo as NutritionInfo } from '@/services/nutrition-api';
import {
  type DietAssistantInput,
  DietAssistantInputSchema,
  type DietAssistantOutput,
  DietAssistantOutputSchema,
  DietAssistantAIOutputSchema,
} from '@/ai/schemas/diet-assistant-schemas';

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
2.  A specific daily calorie target (optional): {{calorieTarget}}
3.  Their medical condition (if any): '{{medicalCondition}}'
4.  Their household size: {{familySize}}
5.  Their weekly budget: ₹{{budget}}
6.  A complete list of available grocery products.

Your tasks are:
1.  **Analyze User Needs**:
    -   Carefully consider the user's goal, condition, family size, and budget. For 'diabetic', prioritize low-glycemic, low-sugar foods. For 'Jain', exclude all root vegetables.
2.  **Create a Shopping List**:
    -   Select a variety of culturally relevant Indian food items (dals, millets, vegetables, paneer, atta) that align with health goals.
    -   Suggest a reasonable weekly quantity for each item based on the family size.
    -   For each item, provide a simple, user-friendly \`key_nutrition_facts\` summary (e.g., "High in protein, good for weight loss").
3.  **Generate Summaries**:
    -   Provide a \`nutrition_tip\`.
    -   Provide a \`diet_flags\` summary (e.g., 'Balanced', 'High-Protein').
4.  **Format Output**: Return ONLY a valid, machine-readable JSON object that strictly matches the output schema.

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
    // 1. Get initial cart from AI
    const {output: aiResponse} = await dietAssistantPrompt(input);
    if (!aiResponse) {
      throw new Error('The AI failed to generate a valid response.');
    }
    const { cart: aiCart, nutrition_tip, diet_flags } = aiResponse;

    let total_estimated_cost = 0;
    const errors: string[] = [];
    const calorie_warnings: string[] = [];
    
    // 2. Enrich cart with prices and nutrition data from API
    const enrichedCart = await Promise.all(
        aiCart.map(async (item) => {
            const productDetails = products.find(p => p.name === item.name);
            const estimated_price = productDetails ? (productDetails.salePrice || productDetails.price) * (parseInt(item.quantity) || 1) : 0;
            total_estimated_cost += estimated_price;
            
            let nutrition: NutritionInfo | null = null;
            try {
                nutrition = await fetchNutrition(`${item.quantity} ${item.name}`);
            } catch (error) {
                console.error(`Nutrition API error for ${item.name}:`, error);
                errors.push(`Nutrition API failed for ${item.name}.`);
            }

            if (!nutrition) {
                errors.push(`Missing nutrition info for '${item.name}'`);
            }

            return {
                ...item,
                estimated_price,
                nutrition: nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 },
            };
        })
    );

    // 3. Calculate totals and perform validations
    const weekly_nutrition_summary = enrichedCart.reduce((totals, item) => {
        totals.calories += item.nutrition.calories;
        totals.protein += item.nutrition.protein;
        totals.carbs += item.nutrition.carbs;
        totals.fat += item.nutrition.fat;
        totals.fiber += item.nutrition.fiber;
        totals.sugar += item.nutrition.sugar;
        totals.sodium += item.nutrition.sodium;
        return totals;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 });

    const daily_nutrition_summary = {
        calories: Math.round(weekly_nutrition_summary.calories / input.familySize / 7),
        protein: Math.round(weekly_nutrition_summary.protein / input.familySize / 7),
        carbs: Math.round(weekly_nutrition_summary.carbs / input.familySize / 7),
        fat: Math.round(weekly_nutrition_summary.fat / input.familySize / 7),
        fiber: Math.round(weekly_nutrition_summary.fiber / input.familySize / 7),
        sugar: Math.round(weekly_nutrition_summary.sugar / input.familySize / 7),
        sodium: Math.round(weekly_nutrition_summary.sodium / input.familySize / 7),
    };

    // Budget validation
    if (total_estimated_cost > input.budget) {
        errors.push(`Budget exceeded by ₹${(total_estimated_cost - input.budget).toFixed(2)}`);
    }

    // Calorie target validation
    const recommended = input.calorieTarget || 2000;
    const actual = daily_nutrition_summary.calories;
    const difference = actual - recommended;
    const deviation = Math.abs(difference) / recommended;

    if (deviation > 0.15 && actual > 0) {
        const direction = difference > 0 ? 'exceed' : 'are below';
        calorie_warnings.push(`Actual calories (${actual} kcal) ${direction} the recommended target (${recommended} kcal) by more than 15%.`);
    }

    return {
        cart: enrichedCart,
        total_estimated_cost,
        daily_nutrition_summary,
        calorie_target: {
            recommended,
            actual,
            difference,
        },
        calorie_warnings,
        errors,
        nutrition_tip,
        diet_flags,
    };
  }
);
