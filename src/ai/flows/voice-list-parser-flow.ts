'use server';
/**
 * @fileOverview An AI flow to parse spoken shopping lists.
 * - parseVoiceList - A function that handles parsing a shopping list from an audio recording.
 */

import {ai} from '@/ai/genkit';
import {
  type ListParserOutput,
  ListParserOutputSchema,
  type VoiceListParserInput,
  VoiceListParserInputSchema,
} from '@/ai/schemas/list-parser-schemas';

export async function parseVoiceList(input: VoiceListParserInput): Promise<ListParserOutput> {
  return voiceListParserFlow(input);
}

const voiceListParserPrompt = ai.definePrompt({
  name: 'voiceListParserPrompt',
  input: {schema: VoiceListParserInputSchema},
  output: {schema: ListParserOutputSchema},
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately transcribe a spoken shopping list, match items to available products, and convert it into a structured list of cart items.

You will be given:
1. An audio recording of a user's shopping list: {{media url=audioDataUri}}
2. A complete list of all products available in the store, which you MUST use as the source of truth for matching.

Your tasks are:
1.  **Transcription & Item Extraction**: Transcribe the audio and extract each item from the user's spoken list.
2.  **Store Original Text**: For each item, store the original transcribed text (e.g., "15 kilos of Rice", "5 packs of Parle-G") in the \`requestedText\` field. This is crucial for user clarity.
3.  **Product Matching**: For each item, find the best matching product from the \`availableProducts\` list provided below. The 'product' and 'englishProduct' fields in your output MUST be an exact name from this list.
4.  **Quantity Calculation**: This is the most critical step. Calculate the quantity of the matched store product needed to fulfill the user's request.
    -   Example 1: If the user says "15 kilos of Rice" and the available product is a "5 kg" pack, you must calculate that the user needs a quantity of **3**. The 'quantity' field should be "3".
    -   Example 2: If the user says "5 packs of Parle-G" and the available product is a "1 pack" unit, the quantity is **5**.
5.  **Language Detection**: Determine the primary language being spoken. Set the \`detectedLanguage\` field to the appropriate BCP-47 code.
6.  **Confirmation Message**: Generate a natural, friendly confirmation message in the detected language that summarizes the items you found.
7.  **Return JSON**: Structure the entire output as a single JSON object that strictly follows the output schema. Do not return anything else.

Available Products (JSON format):
{{{json availableProducts}}}`,
});

const voiceListParserFlow = ai.defineFlow(
  {
    name: 'voiceListParserFlow',
    inputSchema: VoiceListParserInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    const {output} = await voiceListParserPrompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a valid response.");
    }
    return output;
  }
);
