export interface BlogPost {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  excerpt: Record<Language, string>;
  image: string;
  date: string;
  author: string;
}

export interface DietProgram {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  price: number;
  image: string;
  duration: string;
  features: Record<Language, string[]>;
}

export interface LiveClass {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  date: string;
  time: string;
  duration: number;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  instructor: string;
}

export type Language = 'en' | 'az' | 'ru';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  senderName?: string;
}