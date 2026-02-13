
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  /**
   * 根據 @google/genai 最新開發規範：
   * 1. 必須使用 GoogleGenAI 類別（GoogleGenerativeAI 已棄用）。
   * 2. API Key 必須嚴格從 process.env.API_KEY 取得。
   * 3. 初始化必須使用具名參數物件 { apiKey: process.env.API_KEY }。
   */
  private createClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    try {
      const ai = this.createClient();
      
      // 使用 gemini-3-flash-preview 模型處理旅遊諮詢
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一位熱愛釜山的專業旅遊達人。使用者詢問：「${query}」。
        請針對 2024 年 6 月份的釜山氣候（初夏、梅雨季準備）與在地活動（如太宗台繡球花節、海雲台沙雕展），
        以「繁體中文」提供具體、親切且充滿溫度的建議。`,
        config: {
          // 啟用 Google Search Grounding 以獲取最新資訊
          tools: [{ googleSearch: {} }]
        }
      });

      /**
       * 規範要求：
       * .text 是一個屬性而非方法，不可加括號 ()。
       */
      const text = response.text || "抱歉，我現在無法回答這個問題，請稍後再試。";
      
      // 提取搜尋接地 (Search Grounding) 的參考連結
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
      // 錯誤處理：若 API Key 尚未設定或請求失敗
      return { 
        text: "連線至釜山助手時發生異常。請確保您的環境變數 API_KEY 已正確設定。", 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的祭典或活動？");
  }
}

export const geminiService = new GeminiService();
