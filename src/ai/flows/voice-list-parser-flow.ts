'use server';
/**
 * @fileOverview An AI flow to parse spoken shopping lists.
 * - parseVoiceList - A function that handles parsing a shopping list from an audio recording.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {
  type ListParserOutput,
  ListParserOutputSchema,
} from '@/ai/schemas/list-parser-schemas';

export const VoiceListParserInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio recording of a shopping list, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VoiceListParserInput = z.infer<typeof VoiceListParserInputSchema>;

export async function parseVoiceList(input: VoiceListParserInput): Promise<ListParserOutput> {
  return voiceListParserFlow(input);
}

const voiceListParserPrompt = ai.definePrompt({
  name: 'voiceListParserPrompt',
  input: {schema: VoiceListParserInputSchema},
  output: {schema: ListParserOutputSchema},
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately transcribe the provided audio recording of a shopping list and convert it into a structured list of products and quantities.

- Analyze the audio provided: {{media url=audioDataUri}}
- The list is from an Indian user, so be aware of common grocery items, units (like kg, g, l, dozen), and local terms or languages (like Hindi or Hinglish).
- Transcribe the spoken list.
- Extract each item and its corresponding quantity from the transcription. If no quantity is specified, assume "1".
- Structure the output as a JSON object matching the provided schema. Do not return anything else.`,
});

const voiceListParserFlow = ai.defineFlow(
  {
    name: 'voiceListParserFlow',
    inputSchema: VoiceListParserInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    const {output} = await voiceListParserPrompt(input);
    return output || { items: [] };
  }
);
