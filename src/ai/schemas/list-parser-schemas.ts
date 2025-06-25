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
