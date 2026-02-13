
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "安妞！👋 我是您的釜山旅遊小助手。關於 6 月份的行程，有任何想調整或詢問的嗎？例如「有哪些必吃美食？」或「下雨的話有什麼備案？」都可以問我喔！" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    let userLoc = undefined;
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) => 
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
      );
      userLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    } catch (e) {
      console.log("Geolocation skipped or failed.");
    }

    const result = await geminiService.getTravelAdvice(input, userLoc);
    setMessages(prev => [...prev, { role: 'model', text: result.text, links: result.links }]);
    setLoading(false);
  };

  return (
    <section id="explore" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">打造您的專屬行程</h2>
          <p className="text-slate-600">由 Gemini 提供技術支援，結合即時 Google 搜尋與地圖資訊，為您提供最準確的在地建議。</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-100 border border-slate-200 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="bg-blue-600 p-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              ✨
            </div>
            <div>
              <div className="font-bold">釜山旅遊專家 AI</div>
              <div className="text-xs opacity-80">採用 Gemini 3 Flash 模型</div>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-300/30 space-y-2">
                      <p className="text-[10px] uppercase font-bold opacity-60">來源與相關連結</p>
                      {msg.links.map((link, lIdx) => (
                        <a 
                          key={lIdx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-xs text-blue-500 hover:underline truncate"
                        >
                          🔗 {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none animate-pulse text-slate-400 text-sm">
                  正在搜尋 Google 並生成建議...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="例如：『廣安里無人機表演什麼時候開始？』"
                className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                傳送
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
