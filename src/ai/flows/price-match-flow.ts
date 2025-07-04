'use server';
/**
 * @fileOverview An AI flow to compare a physical bill with online prices.
 * - compareBill - A function that analyzes a bill and compares prices.
 */

import {ai} from '@/ai/genkit';
import {
  type PriceMatchInput,
  PriceMatchInputSchema,
  type PriceMatchOutput,
  PriceMatchOutputSchema,
} from '@/ai/schemas/price-match-schemas';

export async function compareBill(
  input: PriceMatchInput
): Promise<PriceMatchOutput> {
  return priceMatchFlow(input);
}

const priceMatchPrompt = ai.definePrompt({
  name: 'priceMatchPrompt',
  input: {schema: PriceMatchInputSchema},
  output: {schema: PriceMatchOutputSchema},
  prompt: `You are an expert price comparison assistant for an Indian e-commerce platform called SparkVoice. Your goal is to build trust with users by showing them how much they can save by shopping online with us.

You will be given:
1.  A photo of a user's physical grocery store bill: {{media url=billPhotoDataUri}}
2.  A complete list of all products available in our online store (in JSON format).

Your tasks are:
1.  **Analyze the Bill**: Carefully scan the bill image to extract each item, its quantity, and its price. Be very accurate with OCR.
2.  **Match Products**: For each item from the bill, find the closest matching product from our list of available online products.
3.  **Compare Prices**: For each matched item, compare the price on the bill (offlinePrice) with our online price (onlinePrice). Calculate the saving for each item.
4.  **Calculate Totals**: Sum up the total cost from the bill (totalOfflineCost), the total cost if bought online (totalOnlineCost), and the total potential savings (totalSavings).
5.  **Generate Summary**: Create a friendly, encouraging summary message (summaryText). It should state the total potential savings clearly.
6.  **Generate a Coupon**: If the total savings are greater than 0, generate a simple, memorable coupon code (e.g., 'SPARK10', 'SAVEBIG20'). Set this in the 'couponCode' field. The message should say something like: "You could have saved ₹{totalSavings}! As a thank you for trying this feature, here is a coupon for your next order: {couponCode}". If there are no savings, the message should be neutral, like "Our prices are very competitive! Thanks for checking with us."
7.  **Return JSON**: Provide ONLY a JSON object that matches the output schema.

Available Online Products (JSON format):
{{{json availableProducts}}}`,
});

const priceMatchFlow = ai.defineFlow(
  {
    name: 'priceMatchFlow',
    inputSchema: PriceMatchInputSchema,
    outputSchema: PriceMatchOutputSchema,
  },
  async (input) => {
    const {output} = await priceMatchPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a valid response.');
    }
    return output;
  }
);
