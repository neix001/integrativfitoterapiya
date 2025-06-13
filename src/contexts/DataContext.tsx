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
  createBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  createDietProgram: (program: Omit<DietProgram, 'id'>) => Promise<void>;
  updateDietProgram: (id: string, program: Partial<DietProgram>) => Promise<void>;
  deleteDietProgram: (id: string) => Promise<void>;
  createLiveClass: (liveClass: Omit<LiveClass, 'id'>) => Promise<void>;
  updateLiveClass: (id: string, liveClass: Partial<LiveClass>) => Promise<void>;
  deleteLiveClass: (id: string) => Promise<void>;
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
      const { data, error } = await supabase
        .from('user_purchases')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error && error.code !== 'PGRST116') throw error;

      setUserPurchases(data || []);
    } catch (error) {
      console.error('Error fetching user purchases:', error);
      setUserPurchases([]);
    }
  };

  const fetchUserTickets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error && error.code !== 'PGRST116') throw error;

      setUserTickets(data || []);
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      setUserTickets([]);
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

      const { error } = await supabase
        .from('user_purchases')
        .insert({
          user_id: user.id,
          program_id: programId,
          status: 'active'
        });

      if (error) throw error;

      await fetchUserPurchases();
      
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

      const { error: ticketError } = await supabase
        .from('user_tickets')
        .insert({
          user_id: user.id,
          class_id: classId,
          status: 'confirmed'
        });

      if (ticketError) throw ticketError;

      const { error: updateError } = await supabase
        .from('live_classes')
        .update({ current_participants: liveClass.currentParticipants + 1 })
        .eq('id', classId);

      if (updateError) throw updateError;

      await Promise.all([fetchUserTickets(), fetchLiveClasses()]);
      
      alert(`Ticket for "${liveClass.title.en}" purchased successfully!`);
    } catch (error: any) {
      console.error('Ticket purchase error:', error);
      throw error;
    }
  };

  // Admin functions
  const createBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      const { error } = await supabase
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
        });

      if (error) throw error;
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    try {
      const updateData: any = {};
      if (post.title) {
        updateData.title_en = post.title.en;
        updateData.title_az = post.title.az;
        updateData.title_ru = post.title.ru;
      }
      if (post.content) {
        updateData.content_en = post.content.en;
        updateData.content_az = post.content.az;
        updateData.content_ru = post.content.ru;
      }
      if (post.excerpt) {
        updateData.excerpt_en = post.excerpt.en;
        updateData.excerpt_az = post.excerpt.az;
        updateData.excerpt_ru = post.excerpt.ru;
      }
      if (post.image) updateData.image = post.image;
      if (post.author) updateData.author = post.author;

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  };

  const createDietProgram = async (program: Omit<DietProgram, 'id'>) => {
    try {
      const { error } = await supabase
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
        });

      if (error) throw error;
      await fetchDietPrograms();
    } catch (error) {
      console.error('Error creating diet program:', error);
      throw error;
    }
  };

  const updateDietProgram = async (id: string, program: Partial<DietProgram>) => {
    try {
      const updateData: any = {};
      if (program.title) {
        updateData.title_en = program.title.en;
        updateData.title_az = program.title.az;
        updateData.title_ru = program.title.ru;
      }
      if (program.description) {
        updateData.description_en = program.description.en;
        updateData.description_az = program.description.az;
        updateData.description_ru = program.description.ru;
      }
      if (program.features) {
        updateData.features_en = program.features.en;
        updateData.features_az = program.features.az;
        updateData.features_ru = program.features.ru;
      }
      if (program.price !== undefined) updateData.price = program.price;
      if (program.image) updateData.image = program.image;
      if (program.duration) updateData.duration = program.duration;

      const { error } = await supabase
        .from('diet_programs')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await fetchDietPrograms();
    } catch (error) {
      console.error('Error updating diet program:', error);
      throw error;
    }
  };

  const deleteDietProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('diet_programs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchDietPrograms();
    } catch (error) {
      console.error('Error deleting diet program:', error);
      throw error;
    }
  };

  const createLiveClass = async (liveClass: Omit<LiveClass, 'id'>) => {
    try {
      const { error } = await supabase
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
          current_participants: liveClass.currentParticipants || 0,
          instructor: liveClass.instructor
        });

      if (error) throw error;
      await fetchLiveClasses();
    } catch (error) {
      console.error('Error creating live class:', error);
      throw error;
    }
  };

  const updateLiveClass = async (id: string, liveClass: Partial<LiveClass>) => {
    try {
      const updateData: any = {};
      if (liveClass.title) {
        updateData.title_en = liveClass.title.en;
        updateData.title_az = liveClass.title.az;
        updateData.title_ru = liveClass.title.ru;
      }
      if (liveClass.description) {
        updateData.description_en = liveClass.description.en;
        updateData.description_az = liveClass.description.az;
        updateData.description_ru = liveClass.description.ru;
      }
      if (liveClass.date) updateData.date = liveClass.date;
      if (liveClass.time) updateData.time = liveClass.time;
      if (liveClass.duration !== undefined) updateData.duration = liveClass.duration;
      if (liveClass.price !== undefined) updateData.price = liveClass.price;
      if (liveClass.maxParticipants !== undefined) updateData.max_participants = liveClass.maxParticipants;
      if (liveClass.currentParticipants !== undefined) updateData.current_participants = liveClass.currentParticipants;
      if (liveClass.instructor) updateData.instructor = liveClass.instructor;

      const { error } = await supabase
        .from('live_classes')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await fetchLiveClasses();
    } catch (error) {
      console.error('Error updating live class:', error);
      throw error;
    }
  };

  const deleteLiveClass = async (id: string) => {
    try {
      const { error } = await supabase
        .from('live_classes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchLiveClasses();
    } catch (error) {
      console.error('Error deleting live class:', error);
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
      refreshData,
      createBlogPost,
      updateBlogPost,
      deleteBlogPost,
      createDietProgram,
      updateDietProgram,
      deleteDietProgram,
      createLiveClass,
      updateLiveClass,
      deleteLiveClass
    }}>
      {children}
    </DataContext.Provider>
  );
};