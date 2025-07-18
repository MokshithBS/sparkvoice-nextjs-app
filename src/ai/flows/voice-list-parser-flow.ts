
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
import {z} from 'genkit';
import { parseTextList } from './text-list-parser-flow';
import { googleAI } from '@genkit-ai/googleai';

export async function parseVoiceList(input: VoiceListParserInput): Promise<ListParserOutput> {
  return voiceListParserFlow(input);
}

// Define a simple prompt that ONLY does transcription.
const transcriptionPrompt = ai.definePrompt({
  name: 'transcriptionPrompt',
  // Specify a multimodal model that supports audio transcription
  model: googleAI.model('gemini-2.0-flash'),
  input: {
    schema: z.object({
      audioDataUri: z.string(),
    }),
  },
  output: {
    schema: z.object({
      transcript: z.string().describe('The transcribed text from the audio.'),
    }),
  },
  prompt: `Transcribe the following audio recording of a shopping list. Provide only the transcribed text.

Audio: {{media url=audioDataUri}}`,
});

const voiceListParserFlow = ai.defineFlow(
  {
    name: 'voiceListParserFlow',
    inputSchema: VoiceListParserInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    // Step 1: Transcribe the audio to text.
    // Pass ONLY the audioDataUri to the transcription prompt.
    const transcriptionResponse = await transcriptionPrompt({ audioDataUri: input.audioDataUri });
    const transcribedText = transcriptionResponse.output?.transcript;

    if (!transcribedText) {
      throw new Error("The AI failed to transcribe the audio.");
    }

    // Step 2: Use the reliable text parser flow with the transcribed text and the available products.
    const result = await parseTextList({
      textList: transcribedText,
      availableProducts: input.availableProducts,
    });
    
    return result;
  }
);
