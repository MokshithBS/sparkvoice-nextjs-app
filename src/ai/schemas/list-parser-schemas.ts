import {z} from 'zod';
import { ProductForAISchema } from './common-schemas';

export const ListParserInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a handwritten shopping list, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
   availableProducts: z.array(ProductForAISchema).describe('A list of all products available in the store with their standard purchasable quantities.')
});
export type ListParserInput = z.infer<typeof ListParserInputSchema>;

export const VoiceListParserInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio recording of a shopping list, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
    availableProducts: z.array(ProductForAISchema).describe('A list of all products available in the store with their standard purchasable quantities.')
});
export type VoiceListParserInput = z.infer<typeof VoiceListParserInputSchema>;

export const TextListParserInputSchema = z.object({
  textList: z
    .string()
    .describe(
      'A typed or pasted shopping list as a plain text string. Each item may be on a new line.'
    ),
    availableProducts: z.array(ProductForAISchema).describe('A list of all products available in the store with their standard purchasable quantities.')
});
export type TextListParserInput = z.infer<typeof TextListParserInputSchema>;

export const ListParserOutputItemSchema = z.object({
  product: z.string().describe('The exact name of the product from the available products list that was matched.'),
  englishProduct: z.string().describe('The English translation of the matched product name.'),
  quantity: z.string().describe('The **calculated number of units** to add to the cart, as a string. For example, if the user asks for "15kg Rice" and the store sells a "5 kg" pack, this value should be "3".'),
  requestedText: z.string().describe("The original text of the item as identified from the user's list (e.g., '15kg Rice', '5 packs Parle-G'). This should capture the user's intent directly."),
});
export type ListParserOutputItem = z.infer<typeof ListParserOutputItemSchema>;

export const ListParserOutputSchema = z.object({
  items: z.array(ListParserOutputItemSchema).describe("The list of items extracted from the shopping list."),
  detectedLanguage: z
    .string()
    .describe(
      "The BCP-47 language code of the input list, e.g., 'en-IN' for Indian English, 'hi' for Hindi."
    ),
  confirmationText: z
    .string()
    .describe(
      "A complete, natural language confirmation message in the detected language that summarizes the items found. Example: 'I found 3 items: 3 units of 5kg Aashirvaad Atta, 5 packs of Parle-G, and 1 unit of Amul Milk.'"
    ),
});
export type ListParserOutput = z.infer<typeof ListParserOutputSchema>;
