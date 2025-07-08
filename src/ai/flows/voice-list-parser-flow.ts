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
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately transcribe the provided audio recording of a shopping list, identify the language, translate product names to English, and convert it into a structured list.

- Analyze the audio provided: {{media url=audioDataUri}}
- The list is from an Indian user, so be aware of common grocery items, units (like kg, g, l, dozen), and local terms or languages (like Hindi or Hinglish).
- **Language Detection & Transcription**: First, transcribe the spoken list. As you do, determine the primary language being spoken. Set the \`detectedLanguage\` field in your output to the appropriate BCP-47 code (e.g., 'hi', 'en-IN', 'ta').
- **Item Extraction**: From the transcription, extract each item and its corresponding quantity. The extracted product name should be in its original language.
- **Translation**: For each item, you **must** translate the product name into English and place it in the \`englishProduct\` field. This is critical for matching with our store's database. For example, if you hear "प्याज", the \`product\` field should be "प्याज" and the \`englishProduct\` field should be "Onions".
- **Confirmation Message**: Generate a natural, friendly confirmation message in the detected language that summarizes the items you found. Set this in the \`confirmationText\` field.
- Structure the entire output as a single JSON object matching the provided schema. Do not return anything else.`,
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
