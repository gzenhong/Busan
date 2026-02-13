
import React, { useState } from 'react';
import { BusanItinerary, DayPlan } from '../types';

interface ItineraryProps {
  itinerary: BusanItinerary;
}

export const Itinerary: React.FC<ItineraryProps> = ({ itinerary }) => {
  const [activeDay, setActiveDay] = useState(1);

  const currentDay = itinerary.days.find(d => d.day === activeDay) || itinerary.days[0];

  return (
    <section id="itinerary" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">專屬規劃</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">釜山 5 天 4 夜精華</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{itinerary.summary}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {itinerary.days.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                activeDay === day.day
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              第 {day.day} 天
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Day Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 h-full">
              <div className="text-blue-600 font-bold mb-2">第 {currentDay.day} 天 • {currentDay.date}</div>
              <h3 className="text-2xl font-bold mb-4">{currentDay.theme}</h3>
              <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  這是一段深入釜山靈魂的旅程。請穿上舒適的步行鞋，準備好相機，迎接 6 月燦爛的海濱光影。
                </p>
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="font-semibold mb-3 text-sm uppercase text-slate-400">當日亮點</h4>
                  <ul className="space-y-2">
                    {currentDay.activities.map((a, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {a.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Timeline */}
          <div className="lg:col-span-8 space-y-8">
            {currentDay.activities.map((activity, idx) => (
              <div key={idx} className="relative flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {activity.time}
                  </div>
                  {idx < currentDay.activities.length - 1 && (
                    <div className="w-px h-full bg-slate-200 my-2"></div>
                  )}
                </div>
                <div className="flex-1 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {activity.imageUrl && (
                      <img 
                        src={activity.imageUrl} 
                        alt={activity.title} 
                        className="w-full md:w-48 h-32 object-cover rounded-2xl shrink-0"
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-bold mb-2">{activity.title}</h4>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{activity.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {activity.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
