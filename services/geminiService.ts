import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// 升級版本標記為 V4，確認切換至穩定版模型
const APP_VERSION = "2024.06.BUSAN-V4-STABLE";

export class GeminiService {
  private getApiKey(): string {
    const key = process.env.API_KEY || "";
    return key.trim();
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      return { 
        text: `【版本: ${APP_VERSION}】\n❌ 未偵測到 API Key。請在 Vercel 設定中添加 API_KEY 並重新部署。`, 
        links: [] 
      };
    }

    try {
      // 每次請求都建立新實例，確保使用最新 Key
      const ai = new GoogleGenAI({ apiKey });
      
      /**
       * 使用 'gemini-flash-latest' 替代 preview 版本。
       * 穩定版模型對於免費 Key 的配額限制通常較寬鬆。
       */
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-flash-latest', 
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: `你是一位專業的釜山旅遊專家。請用繁體中文回答旅人的問題。
          當前版本：${APP_VERSION}。
          請優先考慮 2024 年 6 月的活動、天氣（梅雨季提醒）與交通建議。`,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "抱歉，我現在無法生成回答，請稍後再試。";
      
      // 提取參考連結
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter(c => c.web)
        .map(c => ({
          title: c.web?.title || "參考來源",
          uri: c.web?.uri || "#"
        }));

      return { text: `【${APP_VERSION}】\n${text}`, links };
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      // 針對 429 錯誤提供友善提示
      if (error?.status === 429 || (error?.message && error.message.includes("429"))) {
        return {
          text: `【系統過載】\n由於 Gemini 免費版 API 的限制，目前的請求次數已達上限。請等待約 1 分鐘後再試。`,
          links: []
        };
      }

      const errorDetail = error?.message || JSON.stringify(error);
      return { 
        text: `【連線異常 - ${APP_VERSION}】\n錯誤詳細資訊：${errorDetail}\n\n若持續出現此錯誤，請確認 API Key 是否有效。`, 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的活動？例如太宗台繡球花節。");
  }
}

export const geminiService = new GeminiService();