
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一位專業的釜山旅遊達人。使用者詢問：「${query}」。請針對 6 月份的氣候與在地活動，以「繁體中文」提供親切且實用的建議。如果是關於景點，請盡量提及具體位置或交通方式。`,
        config: {
          tools: [{ googleSearch: {} }, { googleMaps: {} }],
          toolConfig: userLocation ? {
            retrievalConfig: {
              latLng: {
                latitude: userLocation.lat,
                longitude: userLocation.lng
              }
            }
          } : undefined
        }
      });

      const text = response.text || "抱歉，我現在無法回答這個問題。";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      // Extract links from grounding chunks
      const links = chunks
        .filter(c => c.web || c.maps)
        .map(c => ({
          title: c.web?.title || c.maps?.title || "查看更多資訊",
          uri: c.web?.uri || c.maps?.uri || "#"
        }));

      return { text, links };
    } catch (error) {
      console.error("Gemini API error:", error);
      return { text: "抱歉，與釜山專家連線時發生錯誤。請稍後再試。", links: [] };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼重大的祭典或活動？");
  }
}

export const geminiService = new GeminiService();
