'use server';
/**
 * @fileOverview An AI flow to parse handwritten shopping lists.
 *
 * - parseList - A function that handles parsing a shopping list from an image.
 * - ListParserInput - The input type for the parseList function.
 * - ListParserOutput - The return type for the parseList function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const ListParserInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a handwritten shopping list, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ListParserInput = z.infer<typeof ListParserInputSchema>;

export const ListParserOutputSchema = z.object({
  items: z.array(z.object({
    product: z.string().describe('The name of the product identified, e.g., "Milk" or "Basmati Rice".'),
    quantity: z.string().describe('The quantity of the product, e.g., "1L" or "2 kg".'),
  })).describe("The list of items extracted from the shopping list."),
});
export type ListParserOutput = z.infer<typeof ListParserOutputSchema>;

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
