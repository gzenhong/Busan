import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private getApiKey(): string {
    // 確保讀取的是 Vite 在編譯時替換好的字串
    const key = process.env.API_KEY || "";
    return key.trim();
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error("CRITICAL: API_KEY is missing in the build!");
      return { 
        text: "【系統錯誤】找不到 API Key。請確認 Vercel 的 Environment Variables 已設定 API_KEY，並執行了 Redeploy。", 
        links: [] 
      };
    }

    try {
      // 每次請求都建立新實例，確保使用最新的 Key
      const ai = new GoogleGenAI({ apiKey });
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: "你是一位熱愛釜山的專業旅遊達人。請針對 2024 年 6 月份的釜山氣候、節慶（如太宗台繡球花、海雲台沙雕節）提供繁體中文建議。回答要親切且具備實用資訊。",
          tools: [{ googleSearch: {} }]
        }
      });

      if (!response.text) {
        throw new Error("Model returned empty response");
      }

      const text = response.text;
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter(c => c.web)
        .map(c => ({
          title: c.web?.title || "參考連結",
          uri: c.web?.uri || "#"
        }));

      return { text, links };
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      let detail = error.message || "未知網路錯誤";
      if (detail.includes("403")) detail = "API Key 權限不足或被禁用 (403)";
      if (detail.includes("404")) detail = "模型名稱錯誤或 API Key 不支援此模型 (404)";
      if (detail.includes("429")) detail = "請求過於頻繁 (429)";

      return { 
        text: `連線異常：${detail}。\n\n請檢查 Vercel 控制台日誌獲取更多資訊。`, 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("請列出 2024 年 6 月釜山最值得參加的 3 個活動或祭典。");
  }
}

export const geminiService = new GeminiService();