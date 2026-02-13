import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const APP_VERSION = "2024.06.BUSAN-V5-FAST";

export class GeminiService {
  private getApiKey(): string {
    const key = process.env.API_KEY || "";
    return key.trim();
  }

  async getTravelAdvice(query: string, userLocation?: { lat: number; lng: number }) {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      return { 
        text: `【系統提示】尚未在 Vercel 設定 API_KEY。`, 
        links: [] 
      };
    }

    try {
      // 建立 AI 實例
      const ai = new GoogleGenAI({ apiKey });
      
      /**
       * 使用 gemini-3-flash-preview。
       * 移除 tools: [{ googleSearch: {} }]，因為這是導致免費 Key 頻繁出現 429 的主因。
       */
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
        contents: [{ parts: [{ text: query }] }],
        config: {
          systemInstruction: `你是一位資深的釜山旅遊專家。
          請用親切、專業的繁體中文回答。
          你的目標是協助使用者規劃 2024 年 6 月的釜山自由行。
          請提供具體的景點、美食建議與天氣提醒（6月為初夏，下旬可能有梅雨）。
          當前版本標記：${APP_VERSION}。`,
          // 暫時停用工具以確保連線穩定
        }
      });

      const text = response.text || "抱歉，目前 AI 回應出現空白，請稍後再試。";
      
      // 由於停用了 Google Search，groundingChunks 會是空的
      const links: {title: string, uri: string}[] = [];

      return { text: text, links };
    } catch (error: any) {
      console.error("Gemini API Error Detail:", error);
      
      if (error?.status === 429 || error?.message?.includes("429")) {
        return {
          text: `【API 配額提醒】\n目前的請求過於頻繁（Google 免費版 API 限制）。請稍等約 30-60 秒後再試一次，或嘗試縮短您的問題。`,
          links: []
        };
      }
      
      return { 
        text: `【連線異常】發生了未預期的錯誤。請確認您的 API Key 是否正確設定於 Vercel 的 Environment Variables 中。\n(Error: ${error?.status || 'Unknown'})`, 
        links: [] 
      };
    }
  }

  async getJuneEvents() {
    return this.getTravelAdvice("請列出 2024 年 6 月釜山的重要活動，如太宗台繡球花節。");
  }
}

export const geminiService = new GeminiService();