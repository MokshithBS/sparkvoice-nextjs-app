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
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately parse a handwritten shopping list from the provided image and convert it into a structured list of products and quantities.

- Analyze the image provided: {{media url=photoDataUri}}
- The list is from an Indian user, so be aware of common grocery items, units (like kg, g, l, dozen), and local terms.
- The handwriting might be messy or unclear. Do your best to interpret it.
- Extract each item and its corresponding quantity. If no quantity is specified, assume "1".
- Structure the output as a JSON object matching the provided schema. Do not return anything else.`,
});

const listParserFlow = ai.defineFlow(
  {
    name: 'listParserFlow',
    inputSchema: ListParserInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    const {output} = await listParserPrompt(input);
    return output || { items: [] };
  }
);
