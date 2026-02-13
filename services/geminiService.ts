import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private getApiKey(): string {
    // 優先讀取 Vite 注入的變數
    const key = process.env.API_KEY || "";
    return key.trim();
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    const apiKey = this.getApiKey();
    
    // 診斷資訊
    const keyStatus = apiKey 
      ? `已偵測到 Key (長度: ${apiKey.length}, 前4碼: ${apiKey.substring(0, 4)}...)` 
      : "❌ API Key 為空 (process.env.API_KEY 注入失敗)";

    if (!apiKey) {
      return { 
        text: `【系統診斷】\n${keyStatus}\n\n請檢查 Vercel Environment Variables 設定。`, 
        links: [] 
      };
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // 使用正確的模型名稱
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: "你是一位熱愛釜山的旅遊專家。請用繁體中文回答，並針對 2024 年 6 月提供建議。請務必使用 Google Search 工具獲取最新資訊。",
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "模型未回傳文字。";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter(c => c.web)
        .map(c => ({
          title: c.web?.title || "參考來源",
          uri: c.web?.uri || "#"
        }));

      return { text, links };
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      let errorMsg = "連線失敗";
      if (error?.message) errorMsg = error.message;
      else if (typeof error === 'object') errorMsg = JSON.stringify(error);

      return { 
        text: `【API 連線異常】\n診斷：${keyStatus}\n錯誤內容：${errorMsg}\n\n提示：如果錯誤訊息仍提到 'gemini-1.5-flash'，請檢查是否已在 Vercel 點擊 Redeploy。`, 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的活動？");
  }
}

export const geminiService = new GeminiService();