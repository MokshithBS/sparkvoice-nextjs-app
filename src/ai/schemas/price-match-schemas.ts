import {z} from 'zod';
import { ProductForAISchema } from './common-schemas';

export const PriceMatchInputSchema = z.object({
  billPhotoDataUri: z
    .string()
    .describe(
      "A photo of a physical store bill, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  availableProducts: z
    .array(ProductForAISchema)
    .describe('The full list of products available in the online store with their prices.'),
});
export type PriceMatchInput = z.infer<typeof PriceMatchInputSchema>;


const ComparisonItemSchema = z.object({
    productName: z.string().describe('The name of the product identified from the bill.'),
    offlinePrice: z.number().describe('The price of the product on the physical bill.'),
    onlinePrice: z.number().describe('The price of the best matching product in our online store.'),
    saving: z.number().describe('The difference between the offline and online price (positive if online is cheaper).'),
});

export const PriceMatchOutputSchema = z.object({
  comparisonItems: z.array(ComparisonItemSchema).describe("A list of items from the bill compared with online prices."),
  totalOfflineCost: z.number().describe('The calculated total cost from the physical bill.'),
  totalOnlineCost: z.number().describe('The calculated total cost if the same items were bought from our online store.'),
  totalSavings: z.number().describe('The total potential savings.'),
  summaryText: z
    .string()
    .describe(
      'A friendly, natural language summary of the price comparison, highlighting the savings and offering a reward.'
    ),
  couponCode: z.string().optional().describe('A coupon code generated for the user as a reward for using the feature.'),
});
export type PriceMatchOutput = z.infer<typeof PriceMatchOutputSchema>;
