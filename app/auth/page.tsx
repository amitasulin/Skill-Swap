'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import type { User, ExperienceLevel, LessonType } from '@/types'
import { Zap } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { setCurrentUser, addUser, users } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLogin) {
      // Login logic
      const user = users.find(u => u.email === formData.email)
      if (user) {
        setCurrentUser(user)
        router.push('/profile')
      } else {
        alert('משתמש לא נמצא. אנא הירשם תחילה.')
      }
    } else {
      // Signup logic
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        skillsToTeach: [],
        skillsToLearn: [],
        lessonType: 'Both',
        availability: [],
        rating: 0,
        totalLessons: 0,
        createdAt: new Date().toISOString(),
      }
      addUser(newUser)
      setCurrentUser(newUser)
      router.push('/profile/setup')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-10 w-10 text-primary-400" />
            <span className="mr-2 text-2xl font-bold text-primary-400">Skill Swap</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'התחברות' : 'הרשמה'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                שם מלא
              </label>
              <input
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              אימייל
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              סיסמה
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            {isLogin ? 'התחבר' : 'הירשם'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-400 hover:text-primary-300 font-medium"
          >
            {isLogin ? 'אין לך חשבון? הירשם' : 'יש לך חשבון? התחבר'}
          </button>
        </div>
      </div>
    </div>
  )
}

