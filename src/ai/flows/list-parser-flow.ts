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
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately parse a handwritten shopping list from the provided image, identify the language, and convert it into a structured list of products and quantities.

- Analyze the image provided: {{media url=photoDataUri}}
- The list is from an Indian user, so be aware of common grocery items, units (like kg, g, l, dozen), and local terms.
- The handwriting might be messy or unclear. Do your best to interpret it.
- **Language Detection**: First, determine the primary language of the text in the image (e.g., Hindi, English, Hinglish, Tamil). Set the \`detectedLanguage\` field in your output to the appropriate BCP-47 code (e.g., 'hi', 'en-IN', 'ta').
- **Item Extraction**: Extract each item and its corresponding quantity. If no quantity is specified, assume "1".
- **Confirmation Message**: Generate a natural, friendly confirmation message in the detected language that summarizes the items you found. Set this in the \`confirmationText\` field.
- Structure the entire output as a single JSON object matching the provided schema. Do not return anything else.`,
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
