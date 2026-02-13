import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private getApiKey(): string {
    // 優先從 process.env 讀取 Vite 注入的變數
    const key = process.env.API_KEY || "";
    return key.trim();
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error("Vite/Vercel API_KEY is missing!");
      return { 
        text: "系統偵測到 API_KEY 遺失。請確認已在 Vercel Settings -> Environment Variables 設定了 'API_KEY'，並在設定後執行了 'Redeploy'。", 
        links: [] 
      };
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: "你是一位熱愛釜山的專業旅遊達人。請針對 2024 年 6 月份的釜山氣候與在地活動，以「繁體中文」提供建議。如果使用者詢問地點，請盡量結合 Google 搜尋結果。",
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "抱歉，我暫時無法產生內容。";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter(c => c.web)
        .map(c => ({
          title: c.web?.title || "參考來源",
          uri: c.web?.uri || "#"
        }));

      return { text, links };
    } catch (error: any) {
      console.error("Gemini API Error Detail:", error);
      
      let errorMessage = "連線異常。";
      if (error.message?.includes("API key not valid")) {
        errorMessage = "API Key 格式錯誤或無效。";
      } else if (error.message?.includes("quota")) {
        errorMessage = "API 使用量已達上限。";
      }

      return { 
        text: `${errorMessage} (詳細原因: ${error.message || "網路連線失敗"})`, 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的祭典或活動？");
  }
}

export const geminiService = new GeminiService();