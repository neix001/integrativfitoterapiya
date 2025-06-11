import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title_en: string;
          title_az: string;
          title_ru: string;
          content_en: string;
          content_az: string;
          content_ru: string;
          excerpt_en: string;
          excerpt_az: string;
          excerpt_ru: string;
          image: string;
          author: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_en: string;
          title_az: string;
          title_ru: string;
          content_en: string;
          content_az: string;
          content_ru: string;
          excerpt_en: string;
          excerpt_az: string;
          excerpt_ru: string;
          image: string;
          author: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_az?: string;
          title_ru?: string;
          content_en?: string;
          content_az?: string;
          content_ru?: string;
          excerpt_en?: string;
          excerpt_az?: string;
          excerpt_ru?: string;
          image?: string;
          author?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      diet_programs: {
        Row: {
          id: string;
          title_en: string;
          title_az: string;
          title_ru: string;
          description_en: string;
          description_az: string;
          description_ru: string;
          price: number;
          image: string;
          duration: string;
          features_en: string[];
          features_az: string[];
          features_ru: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_en: string;
          title_az: string;
          title_ru: string;
          description_en: string;
          description_az: string;
          description_ru: string;
          price: number;
          image: string;
          duration: string;
          features_en: string[];
          features_az: string[];
          features_ru: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_az?: string;
          title_ru?: string;
          description_en?: string;
          description_az?: string;
          description_ru?: string;
          price?: number;
          image?: string;
          duration?: string;
          features_en?: string[];
          features_az?: string[];
          features_ru?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      live_classes: {
        Row: {
          id: string;
          title_en: string;
          title_az: string;
          title_ru: string;
          description_en: string;
          description_az: string;
          description_ru: string;
          date: string;
          time: string;
          duration: number;
          price: number;
          max_participants: number;
          current_participants: number;
          instructor: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_en: string;
          title_az: string;
          title_ru: string;
          description_en: string;
          description_az: string;
          description_ru: string;
          date: string;
          time: string;
          duration: number;
          price: number;
          max_participants: number;
          current_participants?: number;
          instructor: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_az?: string;
          title_ru?: string;
          description_en?: string;
          description_az?: string;
          description_ru?: string;
          date?: string;
          time?: string;
          duration?: number;
          price?: number;
          max_participants?: number;
          current_participants?: number;
          instructor?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      support_tickets: {
        Row: {
          id: string;
          user_id: string;
          user_email: string;
          user_name: string;
          status: 'open' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_email: string;
          user_name: string;
          status?: 'open' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_email?: string;
          user_name?: string;
          status?: 'open' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          ticket_id: string;
          text: string;
          sender: 'user' | 'support';
          sender_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          ticket_id: string;
          text: string;
          sender: 'user' | 'support';
          sender_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          ticket_id?: string;
          text?: string;
          sender?: 'user' | 'support';
          sender_name?: string;
          created_at?: string;
        };
      };
    };
  };
}