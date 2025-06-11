export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  purchases: Purchase[];
  tickets: Ticket[];
}

export interface Purchase {
  id: string;
  programId: string;
  date: string;
  price: number;
}

export interface Ticket {
  id: string;
  classId: string;
  purchaseDate: string;
  price: number;
}

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

export interface SupportTicket {
  id: string;
  userEmail: string;
  userName: string;
  status: 'open' | 'closed';
  createdAt: string;
  messages: ChatMessage[];
}