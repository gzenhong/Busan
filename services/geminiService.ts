import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private getApiKey(): string {
    // 讀取由 Vite 注入的字串
    const key = process.env.API_KEY || "";
    return key.trim();
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    const apiKey = this.getApiKey();
    
    // 安全地顯示 Key 狀態用於診斷
    const keyStatus = apiKey 
      ? `已偵測到 Key (前4碼: ${apiKey.substring(0, 4)}...)` 
      : "❌ 找不到 API Key (process.env.API_KEY 為空)";

    if (!apiKey) {
      return { 
        text: `【診斷錯誤】\n${keyStatus}\n\n原因：Vite 在打包時未能正確注入環境變數。請確保已在 Vercel 設定 API_KEY 並執行了 Redeploy。`, 
        links: [] 
      };
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        // 依照指南使用 gemini-3-flash-preview
        model: 'gemini-3-flash-preview', 
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: "你是一位熱愛釜山的專業旅遊達人。請針對 2024 年 6 月份的釜山氣候、美食與活動提供繁體中文建議。若使用 Google 搜尋，請提供實用的網址。",
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "模型未回傳文字內容。";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter(c => c.web)
        .map(c => ({
          title: c.web?.title || "參考來源",
          uri: c.web?.uri || "#"
        }));

      return { text, links };
    } catch (error: any) {
      console.error("Gemini API Error Details:", error);
      
      let errorDetail = error.message || "未知錯誤";
      if (typeof error === 'object' && error !== null) {
        errorDetail = JSON.stringify(error);
      }
      
      return { 
        text: `【連線異常】\n診斷資訊：${keyStatus}\n錯誤詳細內容：${errorDetail}\n\n提示：請確認您的 API Key 是否具備 Gemini 3 系列模型的存取權限。`, 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的活動？");
  }
}

export const geminiService = new GeminiService();