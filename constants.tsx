
import React from 'react';
import { BusanItinerary } from './types';

export const BUSAN_DEFAULT_ITINERARY: BusanItinerary = {
  title: "2024 釜山初夏微風之行",
  duration: "5 天 4 夜 (6 月精選)",
  summary: "在 6 月的暖陽下感受釜山充滿活力的海岸氣息，從潔白的沙灘到色彩斑斕的懸崖村落，體驗最道地的韓國海港風情。",
  days: [
    {
      day: 1,
      date: "6 月 15 日",
      theme: "抵達釜山：海雲台海濱風情",
      activities: [
        {
          time: "14:00",
          title: "海雲台飯店入住",
          description: "抵達釜山 KTX 車站後搭乘地鐵前往海雲台，入住擁有無敵海景的飯店，放下行李稍作休息。",
          tags: ["抵達", "海雲台"],
          imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "16:00",
          title: "海雲台藍線公園 (Blue Line Park)",
          description: "搭乘超可愛的 Sky Capsule 天空膠囊小火車，從尾浦前往青沙浦，飽覽釜山東部海岸線全景。",
          tags: ["必去景點", "網美打卡"],
          imageUrl: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "19:00",
          title: "海雲台傳統市場晚餐",
          description: "在熱鬧的市場內品嚐道地的豬肉湯飯 (Gukbap) 和現炸糖餅，感受釜山人的熱情夜晚。",
          tags: ["在地美食", "傳統市場"],
          imageUrl: "https://images.unsplash.com/photo-1547453846-4b99837cc1c2?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      day: 2,
      date: "6 月 16 日",
      theme: "色彩與文化：老城區探索",
      activities: [
        {
          time: "10:00",
          title: "甘川洞文化村",
          description: "探索被譽為「釜山馬丘比丘」的藝術村落，尋找小王子與狐狸的背影，穿梭於彩色房屋間。",
          tags: ["文化體驗", "藝術"],
          imageUrl: "https://images.unsplash.com/photo-1578330132801-72993f40f39b?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "13:00",
          title: "札嘎其魚市場",
          description: "韓國最大的海鮮市場。挑選最鮮甜的生魚片或現烤海鮮，體驗最直接的海洋美味。",
          tags: ["鮮食", "世界之最"],
          imageUrl: "https://images.unsplash.com/photo-1534604973900-c41ab4c287ba?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "16:00",
          title: "BIFF 廣場與國際市場",
          description: "在電影節發源地散步，品嚐黑糖堅果糖餅，並在國際市場挖掘各式特色雜貨與服飾。",
          tags: ["購物", "街頭小吃"],
          imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      day: 3,
      date: "6 月 17 日",
      theme: "海邊寺廟與主題樂園",
      activities: [
        {
          time: "09:00",
          title: "海東龍宮寺",
          description: "韓國唯一座落在海邊的寺廟，在晨曦中感受莊嚴氣氛與拍岸浪濤交織出的奇景。",
          tags: ["宗教聖地", "壯麗海景"],
          imageUrl: "https://images.unsplash.com/photo-1582234306482-0e241724281b?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "13:00",
          title: "釜山樂天世界 Adventure",
          description: "在全新的大型主題樂園度過歡樂下午，挑戰刺激的雲霄飛車，享受夢幻的城堡氛圍。",
          tags: ["親子同樂", "刺激冒險"],
          imageUrl: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "19:00",
          title: "廣安里海灘夜景",
          description: "坐在沙灘上欣賞廣安大橋的點燈秀，享受海風與精釀啤酒，週末還有機會看到無人機表演。",
          tags: ["極致夜景", "浪漫夜晚"],
          imageUrl: "https://images.unsplash.com/photo-1622329606138-04283842183c?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      day: 4,
      date: "6 月 18 日",
      theme: "海岸步道與隱藏秘境",
      activities: [
        {
          time: "10:00",
          title: "松島海上纜車與天空步道",
          description: "搭乘透明水晶纜車橫跨海洋，漫步在松島天空步道上，體驗行走於海面上的快感。",
          tags: ["海上體驗", "透明纜車"],
          imageUrl: "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "14:00",
          title: "白淺灘文化村",
          description: "被稱為「釜山聖托里尼」，沿著海岸線散步，隨機走進一家海景咖啡廳享受悠閒時光。",
          tags: ["海景咖啡", "散步"],
          imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "18:00",
          title: "太宗台遊園區",
          description: "6 月下旬正是繡球花盛開的季節。搭乘 Danubi 列車前往燈塔，欣賞壯闊的絕壁奇景。",
          tags: ["繡球花季", "大自然"],
          imageUrl: "https://images.unsplash.com/photo-1622329606138-04283842183c?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      day: 5,
      date: "6 月 19 日",
      theme: "現代釜山與賦歸",
      activities: [
        {
          time: "10:00",
          title: "新世界百貨 Centum City",
          description: "造訪世界最大的百貨公司，最後採買伴手禮，或前往 Spa Land 體驗高級汗蒸幕放鬆身心。",
          tags: ["購物天堂", "汗蒸幕"],
          imageUrl: "https://images.unsplash.com/photo-1567401893424-76b7bc33d53b?q=80&w=800&auto=format&fit=crop"
        },
        {
          time: "13:00",
          title: "草梁小麥冷麵 (Milmyeon)",
          description: "在離開釜山前，品嚐只有在這裡才有的道地小麥冷麵，清爽滋味最適合 6 月的微熱天氣。",
          tags: ["最後一餐", "釜山限定"],
          imageUrl: "https://images.unsplash.com/photo-1512058560366-cd2427ff1141?q=80&w=800&auto=format&fit=crop"
        }
      ]
    }
  ]
};
