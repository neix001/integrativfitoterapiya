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

export interface UserPurchase {
  id: string;
  user_id: string;
  program_id: string;
  status: 'active' | 'completed';
  created_at: string;
}

export interface UserTicket {
  id: string;
  user_id: string;
  class_id: string;
  status: 'confirmed' | 'attended' | 'cancelled';
  created_at: string;
}

export type Language = 'en' | 'az' | 'ru';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  senderName?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}