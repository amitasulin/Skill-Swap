export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Expert'

export type LessonType = 'Zoom' | 'Frontal' | 'Both'

export interface Skill {
  id: string
  name: string
  category: string
  experienceLevel: ExperienceLevel
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
  location?: string
  skillsToTeach: Skill[]
  skillsToLearn: Skill[]
  lessonType: LessonType
  availability: string[]
  rating: number
  totalLessons: number
  createdAt: string
}

export interface Match {
  id: string
  user1Id: string
  user2Id: string
  skill1ToTeach: Skill // user1 teaches this to user2
  skill2ToTeach: Skill // user2 teaches this to user1
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  createdAt: string
  chatId?: string
}

export interface ChatMessage {
  id: string
  chatId: string
  senderId: string
  content: string
  timestamp: string
}

export interface Lesson {
  id: string
  matchId: string
  skillTaught: string
  teacherId: string
  studentId: string
  scheduledDate: string
  completedDate?: string
  rating?: number
  notes?: string
}

export interface LessonPlan {
  id: string
  matchId: string
  skill: string
  weeklyTasks: WeeklyTask[]
  knowledgeChecks: KnowledgeCheck[]
}

export interface WeeklyTask {
  id: string
  week: number
  description: string
  completed: boolean
}

export interface KnowledgeCheck {
  id: string
  question: string
  answer: string
  completed: boolean
}


