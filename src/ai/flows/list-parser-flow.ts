'use server';
/**
 * @fileOverview An AI flow to parse handwritten shopping lists.
 *
 * - parseList - A function that handles parsing a shopping list from an image.
 */

import {ai} from '@/ai/genkit';
import {
  type ListParserInput,
  ListParserInputSchema,
  type ListParserOutput,
  ListParserOutputSchema,
} from '@/ai/schemas/list-parser-schemas';

export async function parseList(input: ListParserInput): Promise<ListParserOutput> {
  return listParserFlow(input);
}

const listParserPrompt = ai.definePrompt({
  name: 'listParserPrompt',
  input: {schema: ListParserInputSchema},
  output: {schema: ListParserOutputSchema},
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately parse a handwritten shopping list, match items to available products, and convert it into a structured list of cart items.

You will be given:
1. An image of a user's handwritten list: {{media url=photoDataUri}}
2. A complete list of all products available in the store, including their standard package size (e.g., 'Aashirvaad Atta', quantity '5 kg').

Your tasks are:
1.  **Item Extraction**: Read each item from the user's list.
2.  **Store Original Text**: For each item, store the original text as you interpreted it from the image (e.g., "15kg Rice", "5 packs Parle-G") in the \`requestedText\` field. This is crucial for user clarity.
3.  **Product Matching**: For each item, find the best matching product from the \`availableProducts\` list.
4.  **Quantity Calculation**: This is the most critical step. Calculate the quantity of the matched store product needed to fulfill the user's request.
    -   Example 1: If the user writes "15kg Rice" and the available product is a "5 kg" pack, you must calculate that the user needs a quantity of **3**. The 'quantity' field should be "3".
    -   Example 2: If the user writes "5 packs of Parle-G" and the available product is a "1 pack" unit, the quantity is **5**.
5.  **Language Detection**: Determine the primary language of the text in the image (e.g., Hindi, English, Hinglish, Tamil). Set the \`detectedLanguage\` field to the appropriate BCP-47 code.
6.  **Format Output**:
    - The 'product' and 'englishProduct' fields in your output MUST be the exact product name from the \`availableProducts\` list.
    - The 'quantity' field MUST be the calculated quantity to add to the cart, as a string (e.g., "3", "5").
    - The 'requestedText' field MUST contain the original text for that item from the list.
7.  **Confirmation Message**: Generate a natural, friendly confirmation message in the detected language that summarizes the items you found.
8.  **Return JSON**: Structure the entire output as a single JSON object. Do not return anything else.

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const listParserFlow = ai.defineFlow(
  {
    name: 'listParserFlow',
    inputSchema: ListParserInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    const {output} = await listParserPrompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a valid response.");
    }
    return output;
  }
);
