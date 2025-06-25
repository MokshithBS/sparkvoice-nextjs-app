'use server';
/**
 * @fileOverview An AI flow to parse typed shopping lists.
 * - parseTextList - A function that handles parsing a shopping list from a text string.
 */

import {ai} from '@/ai/genkit';
import {
  type TextListParserInput,
  TextListParserInputSchema,
  type ListParserOutput,
  ListParserOutputSchema,
} from '@/ai/schemas/list-parser-schemas';

export async function parseTextList(input: TextListParserInput): Promise<ListParserOutput> {
  return textListParserFlow(input);
}

const textListParserPrompt = ai.definePrompt({
  name: 'textListParserPrompt',
  input: {schema: TextListParserInputSchema},
  output: {schema: ListParserOutputSchema},
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately parse the provided text shopping list and convert it into a structured list of products and quantities.

- Analyze the text provided: {{{textList}}}
- The list is from an Indian user, so be aware of common grocery items, units (like kg, g, l, dozen), and local terms.
- Extract each item and its corresponding quantity. If no quantity is specified, assume "1".
- Structure the output as a JSON object matching the provided schema. Do not return anything else.`,
});

const textListParserFlow = ai.defineFlow(
  {
    name: 'textListParserFlow',
    inputSchema: TextListParserInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    const {output} = await textListParserPrompt(input);
    return output || { items: [] };
  }
);
