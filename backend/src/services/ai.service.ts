import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

const ai = new GoogleGenAI({
  apiKey: env.llmApiKey
});

const noteInsightsSchema = z.object({
  summary: z.string(),
  action_items: z.array(z.string()),
  suggested_title: z.string()
});

export type NoteInsights = z.infer<typeof noteInsightsSchema>;

const parseJsonResponse = (responseText: string): NoteInsights => {
  try {
    const parsedResponse: unknown = JSON.parse(responseText);
    return noteInsightsSchema.parse(parsedResponse);
  } catch {
    throw new AppError("Failed to parse AI response", 502);
  }
};

export const generateNoteInsights = async (content: string): Promise<NoteInsights> => {
  const prompt = `Analyze the following note content. Return ONLY a valid JSON object with three keys: "summary" (a brief string summarizing the note), "action_items" (an array of strings extracting tasks), and "suggested_title" (a short, catchy string). Do not include markdown blocks.

Note content:
${content}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2
    }
  });

  if (!response.text) {
    throw new AppError("AI response was empty", 502);
  }

  return parseJsonResponse(response.text);
};
