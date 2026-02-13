import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private createClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("Critical: API_KEY is missing in the built application.");
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    try {
      const ai = this.createClient();
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: "你是一位熱愛釜山的專業旅遊達人。請針對 2024 年 6 月份的釜山氣候與在地活動，以「繁體中文」提供建議。",
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "抱歉，我現在無法回答這個問題。";
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter(c => c.web)
        .map(c => ({
          title: c.web?.title || "參考來源",
          uri: c.web?.uri || "#"
        }));

      return { text, links };
    } catch (error) {
      // 輸出詳細錯誤到控制台，這對調試非常重要
      console.error("Gemini API Error Detail:", error);
      
      let msg = "連線至釜山助手時發生異常。";
      if (error instanceof Error && error.message.includes("API key not valid")) {
        msg += " API Key 無效，請確認 Vercel 設定並「重新部署」。";
      } else {
        msg += " 請查看瀏覽器控制台以獲取詳細資訊。";
      }

      return { text: msg, links: [] };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的祭典或活動？");
  }
}

export const geminiService = new GeminiService();