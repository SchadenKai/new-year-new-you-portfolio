import { create } from 'zustand';

export type SectionName = 'experience' | 'projects' | 'skills' | 'achievements' | 'posts' | 'stats' | 'tiktok';

interface LayoutState {
  layoutOrder: SectionName[];
  highlightIds: string[];
  isConfigured: boolean;
  setLayout: (order: SectionName[], highlights: string[]) => void;
  resetLayout: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  layoutOrder: ['stats', 'experience', 'projects', 'skills', 'achievements', 'posts', 'tiktok'],
  highlightIds: [],
  isConfigured: false,
  setLayout: (order, highlights) => set({ 
      layoutOrder: order, 
      highlightIds: highlights,
      isConfigured: true 
  }),
  resetLayout: () => set({ 
      layoutOrder: ['experience', 'projects', 'skills', 'achievements', 'posts', 'tiktok'], 
      highlightIds: [], 
      isConfigured: false 
  }),
}));
