
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-morphism border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <h1 className="text-xl font-bold gradient-text">釜山漫遊</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#itinerary" className="hover:text-blue-600 transition-colors">精選行程</a>
            <a href="#explore" className="hover:text-blue-600 transition-colors">AI 助手</a>
            <a href="#tips" className="hover:text-blue-600 transition-colors">旅遊須知</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            立即預約
          </button>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-white font-bold mb-4">釜山漫遊 BusanWanderer</h3>
            <p className="text-sm">您的釜山專業導覽手冊。為追求品質與深度體驗的旅人而生。</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">快速連結</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white">熱門目的地</a></li>
              <li><a href="#" className="hover:text-white">旅遊保險</a></li>
              <li><a href="#" className="hover:text-white">聯絡我們</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">社群追蹤</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer">IG</span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer">FB</span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer">YT</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © 2024 BusanWanderer. 版權所有。
        </div>
      </footer>
    </div>
  );
};
