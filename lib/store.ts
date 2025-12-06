import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Match, ChatMessage, Lesson, Skill } from '@/types'

interface AppState {
  currentUser: User | null
  users: User[]
  matches: Match[]
  messages: ChatMessage[]
  lessons: Lesson[]
  
  setCurrentUser: (user: User) => void
  addUser: (user: User) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  addMatch: (match: Match) => void
  updateMatch: (matchId: string, updates: Partial<Match>) => void
  addMessage: (message: ChatMessage) => void
  addLesson: (lesson: Lesson) => void
  updateLesson: (lessonId: string, updates: Partial<Lesson>) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      matches: [],
      messages: [],
      lessons: [],

      setCurrentUser: (user) => set({ currentUser: user }),
      
      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),
      
      updateUser: (userId, updates) => set((state) => ({
        users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u),
        currentUser: state.currentUser?.id === userId 
          ? { ...state.currentUser, ...updates }
          : state.currentUser
      })),
      
      addMatch: (match) => set((state) => ({
        matches: [...state.matches, match]
      })),
      
      updateMatch: (matchId, updates) => set((state) => ({
        matches: state.matches.map(m => 
          m.id === matchId ? { ...m, ...updates } : m
        )
      })),
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
      })),
      
      addLesson: (lesson) => set((state) => ({
        lessons: [...state.lessons, lesson]
      })),
      
      updateLesson: (lessonId, updates) => set((state) => ({
        lessons: state.lessons.map(l => 
          l.id === lessonId ? { ...l, ...updates } : l
        )
      })),
    }),
    {
      name: 'skillswap-storage',
    }
  )
)


