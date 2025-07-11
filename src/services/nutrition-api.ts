/**
 * @fileOverview A service to fetch nutrition data from the CalorieNinjas API.
 */
'use server';

export interface NutritionInfo {
    calories: number;
    protein_g: number;
    fat_total_g: number;
    sugar_g: number;
    fiber_g: number;
    sodium_mg: number;
    [key: string]: any; // Allow other properties
}

// Renamed and mapped for consistency with our app's schema
export interface MappedNutritionInfo {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    sugar: number;
    fiber: number;
    sodium: number;
}


export async function fetchNutrition(query: string): Promise<MappedNutritionInfo | null> {
  const apiKey = process.env.CALORIENINJAS_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    console.warn("CalorieNinjas API key is not configured. Skipping nutrition fetch.");
    return null;
  }
  
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
        headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) {
        console.error(`Nutrition API error for query "${query}": ${response.status} ${response.statusText}`);
        const errorBody = await response.text();
        console.error("Error body:", errorBody);
        throw new Error(`Nutrition API returned status ${response.status}`);
    }

    const items = await response.json() as NutritionInfo[];

    if (items.length === 0) {
        console.warn(`No nutrition info found for query: "${query}"`);
        return null;
    }
    
    // Aggregate results if multiple items are returned
    const aggregated = items.reduce((acc, item) => {
        acc.calories += item.calories;
        acc.protein_g += item.protein_g;
        acc.fat_total_g += item.fat_total_g;
        acc.sugar_g += item.sugar_g;
        acc.fiber_g += item.fiber_g;
        acc.sodium_mg += item.sodium_mg;
        acc.carbohydrates_total_g += item.carbohydrates_total_g;
        return acc;
    }, {
        calories: 0,
        protein_g: 0,
        fat_total_g: 0,
        sugar_g: 0,
        fiber_g: 0,
        sodium_mg: 0,
        carbohydrates_total_g: 0,
    });

    return {
        calories: aggregated.calories,
        protein: aggregated.protein_g,
        fat: aggregated.fat_total_g,
        sugar: aggregated.sugar_g,
        fiber: aggregated.fiber_g,
        sodium: aggregated.sodium_mg,
        carbs: aggregated.carbohydrates_total_g,
    };

  } catch (error) {
      console.error(`Failed to fetch nutrition data for "${query}":`, error);
      throw error;
  }
}
