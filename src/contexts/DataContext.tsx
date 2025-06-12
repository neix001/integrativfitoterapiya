import React, { createContext, useContext, useState } from 'react';
import { BlogPost, DietProgram, LiveClass } from '../types';
import { mockBlogPosts, mockDietPrograms, mockLiveClasses } from '../data/mockData';

interface DataContextType {
  blogPosts: BlogPost[];
  dietPrograms: DietProgram[];
  liveClasses: LiveClass[];
  loading: boolean;
  purchaseProgram: (programId: string) => void;
  purchaseTicket: (classId: string) => void;
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
  const [blogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [dietPrograms] = useState<DietProgram[]>(mockDietPrograms);
  const [liveClasses] = useState<LiveClass[]>(mockLiveClasses);
  const [loading] = useState(false);

  const purchaseProgram = (programId: string) => {
    const program = dietPrograms.find(p => p.id === programId);
    console.log(`Diet program ${programId} purchased! Email notification sent.`);
    alert(`Program "${program?.title.en}" purchased successfully! Check your email for details.`);
  };

  const purchaseTicket = (classId: string) => {
    const liveClass = liveClasses.find(c => c.id === classId);
    console.log(`Ticket purchased for class: ${liveClass?.title.en}. Email with ticket details sent.`);
    alert(`Ticket for "${liveClass?.title.en}" purchased successfully! Check your email for class details.`);
  };

  return (
    <DataContext.Provider value={{
      blogPosts,
      dietPrograms,
      liveClasses,
      loading,
      purchaseProgram,
      purchaseTicket
    }}>
      {children}
    </DataContext.Provider>
  );
};