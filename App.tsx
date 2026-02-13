import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Itinerary } from './components/Itinerary';
import { GeminiAssistant } from './components/GeminiAssistant';
import { BUSAN_DEFAULT_ITINERARY } from './constants';

const App: React.FC = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1920&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollPos * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900 z-1" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-6 tracking-widest uppercase animate-bounce">
            2024 六月限定
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            釜山漫遊 <br/>
            <span className="text-blue-400">Busan Wanderer</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            透過 AI 智能規劃，開啟一段極致的 5 天 4 夜夏日海岸冒險。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#itinerary" 
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl shadow-white/10"
            >
              查看完整行程
            </a>
            <a 
              href="#explore" 
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 border border-blue-400/50"
            >
              詢問 AI 專家
            </a>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-white/60 text-sm font-medium animate-pulse hidden md:flex">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">☀️</span> 氣溫 22°C ~ 28°C
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">🌊</span> 水溫：適合玩水
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl">🥘</span> 當季必吃：冷麵、海鮮
          </div>
        </div>
      </section>

      {/* Main Itinerary */}
      <Itinerary itinerary={BUSAN_DEFAULT_ITINERARY} />

      {/* June Specific Tips */}
      <section id="tips" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl mb-6 shadow-lg shadow-blue-200">
                🌦️
              </div>
              <h3 className="text-xl font-bold mb-3">天氣建議</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                6 月是初夏的開始，陽光普照但不過於悶熱。要注意的是，下旬可能會進入梅雨季，建議隨身攜帶輕便雨具。
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-amber-50 border border-amber-100">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-xl mb-6 shadow-lg shadow-amber-200">
                🚲
              </div>
              <h3 className="text-xl font-bold mb-3">交通小撇步</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                推薦購買「Visit Busan Pass」，可無限次搭乘地鐵並免費進入藍線公園、樂天世界等 30 個以上熱門景點，非常划算！
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-green-50 border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white text-xl mb-6 shadow-lg shadow-green-200">
                🌸
              </div>
              <h3 className="text-xl font-bold mb-3">6 月限定花期</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                太宗台的繡球花節是 6 月下旬的重頭戲。整座山頭被紫色與藍色的花海覆蓋，搭配絕美海景是絕對不能錯過的奇觀。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <GeminiAssistant />

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">準備好出發去釜山了嗎？</h2>
          <p className="text-blue-100 text-lg mb-10">
            加入數千名旅人的行列，透過我們的智能平台發現釜山的獨特魅力。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
              下載 PDF 行程表
            </button>
            <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
              開始規劃我的旅程
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;