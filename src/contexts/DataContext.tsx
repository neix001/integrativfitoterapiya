import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { BlogPost, DietProgram, LiveClass, ChatMessage, SupportTicket } from '../types';

interface DataContextType {
  blogPosts: BlogPost[];
  dietPrograms: DietProgram[];
  liveClasses: LiveClass[];
  supportTickets: SupportTicket[];
  loading: boolean;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  updateBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addDietProgram: (program: Omit<DietProgram, 'id'>) => Promise<void>;
  updateDietProgram: (program: DietProgram) => Promise<void>;
  deleteDietProgram: (id: string) => Promise<void>;
  addLiveClass: (liveClass: Omit<LiveClass, 'id'>) => Promise<void>;
  updateLiveClass: (liveClass: LiveClass) => Promise<void>;
  deleteLiveClass: (id: string) => Promise<void>;
  createSupportTicket: (userEmail: string, userName: string, initialMessage: string) => Promise<string>;
  addMessageToTicket: (ticketId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<void>;
  updateTicketStatus: (ticketId: string, status: 'open' | 'closed') => Promise<void>;
  purchaseProgram: (programId: string) => void;
  purchaseTicket: (classId: string) => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [dietPrograms, setDietPrograms] = useState<DietProgram[]>([]);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert database row to BlogPost
  const dbRowToBlogPost = (row: any): BlogPost => ({
    id: row.id,
    title: {
      en: row.title_en,
      az: row.title_az,
      ru: row.title_ru
    },
    content: {
      en: row.content_en,
      az: row.content_az,
      ru: row.content_ru
    },
    excerpt: {
      en: row.excerpt_en,
      az: row.excerpt_az,
      ru: row.excerpt_ru
    },
    image: row.image,
    date: row.created_at.split('T')[0],
    author: row.author
  });

  // Convert database row to DietProgram
  const dbRowToDietProgram = (row: any): DietProgram => ({
    id: row.id,
    title: {
      en: row.title_en,
      az: row.title_az,
      ru: row.title_ru
    },
    description: {
      en: row.description_en,
      az: row.description_az,
      ru: row.description_ru
    },
    price: parseFloat(row.price),
    image: row.image,
    duration: row.duration,
    features: {
      en: row.features_en || [],
      az: row.features_az || [],
      ru: row.features_ru || []
    }
  });

  // Convert database row to LiveClass
  const dbRowToLiveClass = (row: any): LiveClass => ({
    id: row.id,
    title: {
      en: row.title_en,
      az: row.title_az,
      ru: row.title_ru
    },
    description: {
      en: row.description_en,
      az: row.description_az,
      ru: row.description_ru
    },
    date: row.date,
    time: row.time,
    duration: row.duration,
    price: parseFloat(row.price),
    maxParticipants: row.max_participants,
    currentParticipants: row.current_participants,
    instructor: row.instructor
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch blog posts
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (blogError) throw blogError;
      setBlogPosts(blogData?.map(dbRowToBlogPost) || []);

      // Fetch diet programs
      const { data: programData, error: programError } = await supabase
        .from('diet_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (programError) throw programError;
      setDietPrograms(programData?.map(dbRowToDietProgram) || []);

      // Fetch live classes
      const { data: classData, error: classError } = await supabase
        .from('live_classes')
        .select('*')
        .order('date', { ascending: true });

      if (classError) throw classError;
      setLiveClasses(classData?.map(dbRowToLiveClass) || []);

      // Fetch support tickets (only for admins or user's own tickets)
      if (user) {
        let ticketQuery = supabase.from('support_tickets').select(`
          *,
          chat_messages (*)
        `);

        if (!user.isAdmin) {
          ticketQuery = ticketQuery.eq('user_id', user.id);
        }

        const { data: ticketData, error: ticketError } = await ticketQuery
          .order('created_at', { ascending: false });

        if (ticketError) throw ticketError;

        const tickets: SupportTicket[] = ticketData?.map(ticket => ({
          id: ticket.id,
          userEmail: ticket.user_email,
          userName: ticket.user_name,
          status: ticket.status as 'open' | 'closed',
          createdAt: ticket.created_at,
          messages: ticket.chat_messages?.map((msg: any) => ({
            id: msg.id,
            text: msg.text,
            sender: msg.sender as 'user' | 'support',
            timestamp: new Date(msg.created_at).toLocaleTimeString(),
            senderName: msg.sender_name
          })) || []
        })) || [];

        setSupportTickets(tickets);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title_en: post.title.en,
          title_az: post.title.az,
          title_ru: post.title.ru,
          content_en: post.content.en,
          content_az: post.content.az,
          content_ru: post.content.ru,
          excerpt_en: post.excerpt.en,
          excerpt_az: post.excerpt.az,
          excerpt_ru: post.excerpt.ru,
          image: post.image,
          author: post.author
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setBlogPosts(prev => [dbRowToBlogPost(data), ...prev]);
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  const updateBlogPost = async (post: BlogPost) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          title_en: post.title.en,
          title_az: post.title.az,
          title_ru: post.title.ru,
          content_en: post.content.en,
          content_az: post.content.az,
          content_ru: post.content.ru,
          excerpt_en: post.excerpt.en,
          excerpt_az: post.excerpt.az,
          excerpt_ru: post.excerpt.ru,
          image: post.image,
          author: post.author,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setBlogPosts(prev => prev.map(p => p.id === post.id ? dbRowToBlogPost(data) : p));
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const addDietProgram = async (program: Omit<DietProgram, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('diet_programs')
        .insert({
          title_en: program.title.en,
          title_az: program.title.az,
          title_ru: program.title.ru,
          description_en: program.description.en,
          description_az: program.description.az,
          description_ru: program.description.ru,
          price: program.price,
          image: program.image,
          duration: program.duration,
          features_en: program.features.en,
          features_az: program.features.az,
          features_ru: program.features.ru
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setDietPrograms(prev => [dbRowToDietProgram(data), ...prev]);
      }
    } catch (error) {
      console.error('Error adding diet program:', error);
    }
  };

  const updateDietProgram = async (program: DietProgram) => {
    try {
      const { data, error } = await supabase
        .from('diet_programs')
        .update({
          title_en: program.title.en,
          title_az: program.title.az,
          title_ru: program.title.ru,
          description_en: program.description.en,
          description_az: program.description.az,
          description_ru: program.description.ru,
          price: program.price,
          image: program.image,
          duration: program.duration,
          features_en: program.features.en,
          features_az: program.features.az,
          features_ru: program.features.ru,
          updated_at: new Date().toISOString()
        })
        .eq('id', program.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setDietPrograms(prev => prev.map(p => p.id === program.id ? dbRowToDietProgram(data) : p));
      }
    } catch (error) {
      console.error('Error updating diet program:', error);
    }
  };

  const deleteDietProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('diet_programs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setDietPrograms(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting diet program:', error);
    }
  };

  const addLiveClass = async (liveClass: Omit<LiveClass, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('live_classes')
        .insert({
          title_en: liveClass.title.en,
          title_az: liveClass.title.az,
          title_ru: liveClass.title.ru,
          description_en: liveClass.description.en,
          description_az: liveClass.description.az,
          description_ru: liveClass.description.ru,
          date: liveClass.date,
          time: liveClass.time,
          duration: liveClass.duration,
          price: liveClass.price,
          max_participants: liveClass.maxParticipants,
          current_participants: liveClass.currentParticipants,
          instructor: liveClass.instructor
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setLiveClasses(prev => [...prev, dbRowToLiveClass(data)].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      }
    } catch (error) {
      console.error('Error adding live class:', error);
    }
  };

  const updateLiveClass = async (liveClass: LiveClass) => {
    try {
      const { data, error } = await supabase
        .from('live_classes')
        .update({
          title_en: liveClass.title.en,
          title_az: liveClass.title.az,
          title_ru: liveClass.title.ru,
          description_en: liveClass.description.en,
          description_az: liveClass.description.az,
          description_ru: liveClass.description.ru,
          date: liveClass.date,
          time: liveClass.time,
          duration: liveClass.duration,
          price: liveClass.price,
          max_participants: liveClass.maxParticipants,
          current_participants: liveClass.currentParticipants,
          instructor: liveClass.instructor,
          updated_at: new Date().toISOString()
        })
        .eq('id', liveClass.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setLiveClasses(prev => prev.map(c => c.id === liveClass.id ? dbRowToLiveClass(data) : c));
      }
    } catch (error) {
      console.error('Error updating live class:', error);
    }
  };

  const deleteLiveClass = async (id: string) => {
    try {
      const { error } = await supabase
        .from('live_classes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLiveClasses(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting live class:', error);
    }
  };

  const createSupportTicket = async (userEmail: string, userName: string, initialMessage: string): Promise<string> => {
    if (!user) throw new Error('User must be logged in');

    try {
      // Create ticket
      const { data: ticketData, error: ticketError } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          user_email: userEmail,
          user_name: userName
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Add initial message
      const { data: messageData, error: messageError } = await supabase
        .from('chat_messages')
        .insert({
          ticket_id: ticketData.id,
          text: initialMessage,
          sender: 'user',
          sender_name: userName
        })
        .select()
        .single();

      if (messageError) throw messageError;

      // Refresh support tickets
      await fetchData();

      return ticketData.id;
    } catch (error) {
      console.error('Error creating support ticket:', error);
      throw error;
    }
  };

  const addMessageToTicket = async (ticketId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          ticket_id: ticketId,
          text: message.text,
          sender: message.sender,
          sender_name: message.senderName || 'Unknown'
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setSupportTickets(prev => prev.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            messages: [...ticket.messages, {
              id: data.id,
              text: data.text,
              sender: data.sender as 'user' | 'support',
              timestamp: new Date(data.created_at).toLocaleTimeString(),
              senderName: data.sender_name
            }]
          };
        }
        return ticket;
      }));
    } catch (error) {
      console.error('Error adding message to ticket:', error);
    }
  };

  const updateTicketStatus = async (ticketId: string, status: 'open' | 'closed') => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      if (error) throw error;

      setSupportTickets(prev => prev.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status } : ticket
      ));
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const purchaseProgram = (programId: string) => {
    console.log(`Diet program ${programId} purchased! Email notification sent.`);
  };

  const purchaseTicket = (classId: string) => {
    const liveClass = liveClasses.find(c => c.id === classId);
    console.log(`Ticket purchased for class: ${liveClass?.title.en}. Email with ticket details sent.`);
  };

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <DataContext.Provider value={{
      blogPosts,
      dietPrograms,
      liveClasses,
      supportTickets,
      loading,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      addDietProgram,
      updateDietProgram,
      deleteDietProgram,
      addLiveClass,
      updateLiveClass,
      deleteLiveClass,
      createSupportTicket,
      addMessageToTicket,
      updateTicketStatus,
      purchaseProgram,
      purchaseTicket,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};