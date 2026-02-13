
export interface Activity {
  time: string;
  title: string;
  description: string;
  location?: string;
  tags: string[];
  imageUrl?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
}

export interface BusanItinerary {
  title: string;
  duration: string;
  summary: string;
  days: DayPlan[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  links?: { title: string; uri: string }[];
}
