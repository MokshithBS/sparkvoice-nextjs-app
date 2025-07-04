import {z} from 'zod';

const ProductSchemaForAI = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
});

export const PantryCheckerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's pantry or fridge, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  availableProducts: z
    .array(ProductSchemaForAI)
    .describe('The full list of products available in the store.'),
});
export type PantryCheckerInput = z.infer<typeof PantryCheckerInputSchema>;

export const PantryCheckerOutputSchema = z.object({
  suggestionIds: z
    .array(z.number())
    .max(5)
    .describe(
      'An array of product IDs for the suggested restocking items. Maximum of 5 suggestions.'
    ),
  confirmationText: z
    .string()
    .describe(
      'A friendly, natural language confirmation message summarizing the restocking suggestions.'
    ),
});
export type PantryCheckerOutput = z.infer<typeof PantryCheckerOutputSchema>;
