import { create } from 'zustand';

export type SectionName = 'experience' | 'projects' | 'skills';

interface LayoutState {
  layoutOrder: SectionName[];
  highlightIds: string[];
  isConfigured: boolean;
  setLayout: (order: SectionName[], highlights: string[]) => void;
  resetLayout: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  layoutOrder: ['experience', 'projects', 'skills'],
  highlightIds: [],
  isConfigured: false,
  setLayout: (order, highlights) => set({ 
      layoutOrder: order, 
      highlightIds: highlights,
      isConfigured: true 
  }),
  resetLayout: () => set({ 
      layoutOrder: ['experience', 'projects', 'skills'], 
      highlightIds: [], 
      isConfigured: false 
  }),
}));
