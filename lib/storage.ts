// Helper functions for Local Storage operations
import type { User, Match, ChatMessage, Lesson } from '@/types'

const STORAGE_KEYS = {
  USERS: 'skillswap-users',
  CURRENT_USER: 'skillswap-current-user',
  MATCHES: 'skillswap-matches',
  MESSAGES: 'skillswap-messages',
  LESSONS: 'skillswap-lessons',
}

export const storage = {
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.USERS)
    return data ? JSON.parse(data) : []
  },

  saveUsers: (users: User[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return data ? JSON.parse(data) : null
  },

  saveCurrentUser: (user: User | null): void => {
    if (typeof window === 'undefined') return
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
  },

  getMatches: (): Match[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.MATCHES)
    return data ? JSON.parse(data) : []
  },

  saveMatches: (matches: Match[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches))
  },

  getMessages: (): ChatMessage[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    return data ? JSON.parse(data) : []
  },

  saveMessages: (messages: ChatMessage[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
  },

  getLessons: (): Lesson[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.LESSONS)
    return data ? JSON.parse(data) : []
  },

  saveLessons: (lessons: Lesson[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons))
  },
}


