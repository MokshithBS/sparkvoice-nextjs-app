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
  prompt: `You are an expert shopping assistant for an Indian e-commerce platform. Your task is to accurately parse the provided text shopping list, identify the language, translate product names to English, and convert it into a structured list.

- Analyze the text provided: {{{textList}}}
- The list is from an Indian user, so be aware of common grocery items, units (like kg, g, l, dozen), and local terms.
- **Language Detection**: First, determine the primary language of the text (e.g., Hindi, English, Hinglish, Tamil). Set the \`detectedLanguage\` field in your output to the appropriate BCP-47 code (e.g., 'hi', 'en-IN', 'ta').
- **Item Extraction**: Extract each item and its corresponding quantity. The extracted product name should be in its original language.
- **Translation**: For each item, you **must** translate the product name into English and place it in the \`englishProduct\` field. This is critical for matching with our store's database. For example, if you see "प्याज", the \`product\` field should be "प्याज" and the \`englishProduct\` field should be "Onions".
- **Confirmation Message**: Generate a natural, friendly confirmation message in the detected language that summarizes the items you found. Set this in the \`confirmationText\` field.
- Structure the entire output as a single JSON object matching the provided schema. Do not return anything else.`,
});

const textListParserFlow = ai.defineFlow(
  {
    name: 'textListParserFlow',
    inputSchema: TextListParserInputSchema,
    outputSchema: ListParserOutputSchema,
  },
  async (input) => {
    const {output} = await textListParserPrompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a valid response.");
    }
    return output;
  }
);
