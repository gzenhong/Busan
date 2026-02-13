
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  /**
   * 根據規範，我們維持使用 process.env.API_KEY。
   * Vite 的 define 配置會在建置時處理好瀏覽器端映射。
   */
  private createClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is missing! Please set it in Vercel Environment Variables.");
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    try {
      const ai = this.createClient();
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: `你是一位熱愛釜山的專業旅遊達人。請針對 2024 年 6 月份的釜山氣候（初夏、梅雨季準備）與在地活動（如太宗台繡球花節、海雲台沙雕展），以「繁體中文」提供具體、親切且充滿溫度的建議。`,
          tools: [{ googleSearch: {} }]
        }
      });

      // 嚴格遵守規範：.text 是 getter 屬性
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
      console.error("Gemini API Error:", error);
      return { 
        text: "連線至釜山助手時發生異常。請檢查 Vercel 的 API_KEY 設定是否正確，並確保專案已重新部署。", 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的祭典或活動？");
  }
}

export const geminiService = new GeminiService();
