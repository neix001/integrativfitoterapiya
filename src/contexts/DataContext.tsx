import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, DietProgram, LiveClass, UserPurchase, UserTicket } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface DataContextType {
  blogPosts: BlogPost[];
  dietPrograms: DietProgram[];
  liveClasses: LiveClass[];
  userPurchases: UserPurchase[];
  userTickets: UserTicket[];
  loading: boolean;
  purchaseProgram: (programId: string) => Promise<void>;
  purchaseTicket: (classId: string) => Promise<void>;
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
  const [userPurchases, setUserPurchases] = useState<UserPurchase[]>([]);
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshData();
  }, [user]);

  const refreshData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchBlogPosts(),
        fetchDietPrograms(),
        fetchLiveClasses(),
        user ? fetchUserPurchases() : Promise.resolve(),
        user ? fetchUserTickets() : Promise.resolve()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts: BlogPost[] = data.map(post => ({
        id: post.id,
        title: {
          en: post.title_en,
          az: post.title_az,
          ru: post.title_ru
        },
        content: {
          en: post.content_en,
          az: post.content_az,
          ru: post.content_ru
        },
        excerpt: {
          en: post.excerpt_en,
          az: post.excerpt_az,
          ru: post.excerpt_ru
        },
        image: post.image,
        date: post.created_at.split('T')[0],
        author: post.author
      }));

      setBlogPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchDietPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('diet_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPrograms: DietProgram[] = data.map(program => ({
        id: program.id,
        title: {
          en: program.title_en,
          az: program.title_az,
          ru: program.title_ru
        },
        description: {
          en: program.description_en,
          az: program.description_az,
          ru: program.description_ru
        },
        price: program.price,
        image: program.image,
        duration: program.duration,
        features: {
          en: program.features_en || [],
          az: program.features_az || [],
          ru: program.features_ru || []
        }
      }));

      setDietPrograms(formattedPrograms);
    } catch (error) {
      console.error('Error fetching diet programs:', error);
    }
  };

  const fetchLiveClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('live_classes')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      const formattedClasses: LiveClass[] = data.map(liveClass => ({
        id: liveClass.id,
        title: {
          en: liveClass.title_en,
          az: liveClass.title_az,
          ru: liveClass.title_ru
        },
        description: {
          en: liveClass.description_en,
          az: liveClass.description_az,
          ru: liveClass.description_ru
        },
        date: liveClass.date,
        time: liveClass.time,
        duration: liveClass.duration,
        price: liveClass.price,
        maxParticipants: liveClass.max_participants,
        currentParticipants: liveClass.current_participants || 0,
        instructor: liveClass.instructor
      }));

      setLiveClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching live classes:', error);
    }
  };

  const fetchUserPurchases = async () => {
    if (!user) return;

    try {
      // For now, we'll simulate user purchases
      // In a real app, you'd have a user_purchases table
      setUserPurchases([]);
    } catch (error) {
      console.error('Error fetching user purchases:', error);
    }
  };

  const fetchUserTickets = async () => {
    if (!user) return;

    try {
      // For now, we'll simulate user tickets
      // In a real app, you'd have a user_tickets table
      setUserTickets([]);
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    }
  };

  const purchaseProgram = async (programId: string) => {
    if (!user) {
      throw new Error('Please login to purchase programs');
    }

    try {
      const program = dietPrograms.find(p => p.id === programId);
      if (!program) {
        throw new Error('Program not found');
      }

      // In a real app, you'd process payment and create a purchase record
      console.log(`Program ${programId} purchased by user ${user.id}`);
      
      // Simulate adding to user purchases
      const newPurchase: UserPurchase = {
        id: Date.now().toString(),
        userId: user.id,
        programId,
        purchaseDate: new Date().toISOString(),
        status: 'active'
      };

      setUserPurchases(prev => [...prev, newPurchase]);
      
      alert(`Program "${program.title.en}" purchased successfully!`);
    } catch (error: any) {
      console.error('Purchase error:', error);
      throw error;
    }
  };

  const purchaseTicket = async (classId: string) => {
    if (!user) {
      throw new Error('Please login to purchase tickets');
    }

    try {
      const liveClass = liveClasses.find(c => c.id === classId);
      if (!liveClass) {
        throw new Error('Class not found');
      }

      if (liveClass.currentParticipants >= liveClass.maxParticipants) {
        throw new Error('Class is fully booked');
      }

      // In a real app, you'd process payment and create a ticket record
      console.log(`Ticket for class ${classId} purchased by user ${user.id}`);

      // Update class participants count
      const { error } = await supabase
        .from('live_classes')
        .update({ current_participants: liveClass.currentParticipants + 1 })
        .eq('id', classId);

      if (error) throw error;

      // Simulate adding to user tickets
      const newTicket: UserTicket = {
        id: Date.now().toString(),
        userId: user.id,
        classId,
        purchaseDate: new Date().toISOString(),
        status: 'confirmed'
      };

      setUserTickets(prev => [...prev, newTicket]);
      
      // Refresh live classes to update participant count
      await fetchLiveClasses();
      
      alert(`Ticket for "${liveClass.title.en}" purchased successfully!`);
    } catch (error: any) {
      console.error('Ticket purchase error:', error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{
      blogPosts,
      dietPrograms,
      liveClasses,
      userPurchases,
      userTickets,
      loading,
      purchaseProgram,
      purchaseTicket,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};