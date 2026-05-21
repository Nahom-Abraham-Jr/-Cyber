import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TabType = 'dashboard' | 'scanner' | 'learning' | 'breach';
export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'es' | 'am' | 'om';

interface AppState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeTab: 'dashboard',
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      theme: 'dark', // default
      setTheme: (theme) => set({ theme }),
      
      language: 'en', // default
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'aegis-defend-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ theme: state.theme, language: state.language }), // only save theme and language
    }
  )
);
