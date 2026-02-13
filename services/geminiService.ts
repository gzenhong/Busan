import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// 增加版本標記，用於確認部署是否成功
const APP_VERSION = "2024.06.BUSAN-V3";

export class GeminiService {
  private getApiKey(): string {
    const key = process.env.API_KEY || "";
    return key.trim();
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    const apiKey = this.getApiKey();
    const keyStatus = apiKey 
      ? `已偵測到 Key (前4碼: ${apiKey.substring(0, 4)}...)` 
      : "❌ API Key 為空";

    if (!apiKey) {
      return { 
        text: `【版本: ${APP_VERSION}】\n${keyStatus}\n\n請前往 Vercel 設定 API_KEY 並重新部署。`, 
        links: [] 
      };
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // 這裡強制指定 gemini-3-flash-preview
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: "你是一位釜山旅遊專家。請用繁體中文回答。目前的 APP 版本是 " + APP_VERSION,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "模型回傳內容為空。";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter(c => c.web)
        .map(c => ({
          title: c.web?.title || "參考來源",
          uri: c.web?.uri || "#"
        }));

      return { text: `【${APP_VERSION}】\n${text}`, links };
    } catch (error: any) {
      console.error("Gemini Error:", error);
      
      const errorStr = typeof error === 'object' ? JSON.stringify(error) : String(error);
      
      return { 
        text: `【連線異常 - 版本: ${APP_VERSION}】\n診斷：${keyStatus}\n錯誤內容：${errorStr}\n\n提示：如果錯誤還在顯示 gemini-1.5-flash，代表 Vercel 的 Redeploy 沒有成功。`, 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("2024年6月釜山有什麼特別的活動？");
  }
}

export const geminiService = new GeminiService();