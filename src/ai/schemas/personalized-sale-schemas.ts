import {z} from 'zod';

const ProductSchemaForAI = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  salePrice: z.number().optional(),
  category: z.string(),
});

export const PersonalizedSaleInputSchema = z.object({
  profession: z.string().describe("The user's stated profession, e.g., 'Student', 'Doctor', 'Homemaker'."),
  availableProducts: z
    .array(ProductSchemaForAI)
    .describe('The full list of products currently on sale in the store.'),
});
export type PersonalizedSaleInput = z.infer<typeof PersonalizedSaleInputSchema>;


export const PersonalizedSaleOutputSchema = z.object({
  suggestionIds: z
    .array(z.number())
    .max(6)
    .describe(
      'An array of product IDs for the suggested sale items. Maximum of 6 suggestions.'
    ),
  summaryText: z
    .string()
    .describe(
      'A friendly, encouraging summary message that explains the personalized suggestions. For example: "As a student, we thought you might like these deals on instant noodles and coffee to help with late-night study sessions!"'
    ),
});
export type PersonalizedSaleOutput = z.infer<typeof PersonalizedSaleOutputSchema>;
