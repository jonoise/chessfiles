import { create } from 'zustand'

export type Page = 'home' | 'stats'

interface NavigationStore {
  page: Page
  setPage: (page: Page) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  page: 'home',
  setPage: (page) => set({ page }),
}))
