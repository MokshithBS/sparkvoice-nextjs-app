'use server';
/**
 * @fileOverview A flow to generate a user avatar image.
 * - generateAvatar - A function that takes a text prompt and returns an image data URI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateAvatarInputSchema = z.object({
  prompt: z.string().describe('A text description for the avatar image to be generated.'),
});
export type GenerateAvatarInput = z.infer<typeof GenerateAvatarInputSchema>;

const GenerateAvatarOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

export async function generateAvatar(
  input: GenerateAvatarInput
): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow(input);
}

const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    inputSchema: GenerateAvatarInputSchema,
    outputSchema: GenerateAvatarOutputSchema,
  },
  async ({ prompt }) => {
    // Construct a more direct prompt to improve reliability.
    const fullPrompt = `A simple, friendly, cartoon-style avatar of a person. Close-up portrait with a plain background, based on the following description: "${prompt}"`;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: fullPrompt,
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return a valid image.');
    }

    return { imageDataUri: media.url };
  }
);
