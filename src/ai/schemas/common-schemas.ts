import {z} from 'zod';

export const ProductForAISchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  salePrice: z.number().optional(),
  category: z.string(),
  quantity: z
    .string()
    .describe('The package size, e.g., "5 kg", "1 L", "1 pack"'),
});
