import { GoogleGenAI } from "@google/genai";
import { SurveyResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFeedback = async (responses: SurveyResponse[]): Promise<string> => {
  try {
    const feedbackText = responses
      .map(r => `- Rating: ${r.rating}/5, Topic: ${r.interestTopic}, Comment: ${r.comment || 'N/A'}`)
      .join('\n');

    const prompt = `
      Analyze the following feedback from our "Aperitivo e Previdenza" insurance event.
      Provide a concise summary of the sentiment, identifying the most popular topics and any areas for improvement.
      Format the output as a professional HTML-friendly summary (use bullet points).
      Language: Italian.

      Feedback Data:
      ${feedbackText}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });

    return response.text || "Nessuna analisi generata.";
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    return "Impossibile analizzare i feedback al momento. Verifica la chiave API.";
  }
};