'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { findMatches } from '@/lib/ai-matching'
import type { Match, User } from '@/types'
import { X, Check, Star, MapPin, Video, Users } from 'lucide-react'
import Link from 'next/link'

export default function MatchesPage() {
  const router = useRouter()
  const { currentUser, users, addUser, addMatch, updateMatch } = useStore()
  const [potentialMatches, setPotentialMatches] = useState<Match[]>([])
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth')
      return
    }

    // Initialize with some demo users if needed
    if (users.length === 0) {
      const demoUsers: User[] = [
        {
          id: 'demo-1',
          name: 'דני כהן',
          email: 'dani@example.com',
          skillsToTeach: [
            { id: '1', name: 'React', category: 'תכנות', experienceLevel: 'Expert' },
            { id: '2', name: 'JavaScript', category: 'תכנות', experienceLevel: 'Expert' },
          ],
          skillsToLearn: [
            { id: '3', name: 'עברית', category: 'שפות', experienceLevel: 'Beginner' },
          ],
          lessonType: 'Both',
          availability: [],
          rating: 4.8,
          totalLessons: 15,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'demo-2',
          name: 'שרה לוי',
          email: 'sara@example.com',
          skillsToTeach: [
            { id: '4', name: 'עברית', category: 'שפות', experienceLevel: 'Expert' },
            { id: '5', name: 'עיצוב גרפי', category: 'עיצוב', experienceLevel: 'Intermediate' },
          ],
          skillsToLearn: [
            { id: '6', name: 'אנגלית', category: 'שפות', experienceLevel: 'Intermediate' },
          ],
          lessonType: 'Zoom',
          availability: [],
          rating: 4.9,
          totalLessons: 22,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'demo-3',
          name: 'יוסי ישראלי',
          email: 'yossi@example.com',
          skillsToTeach: [
            { id: '7', name: 'גיטרה', category: 'מוזיקה', experienceLevel: 'Intermediate' },
          ],
          skillsToLearn: [
            { id: '8', name: 'יוגה', category: 'ספורט', experienceLevel: 'Beginner' },
          ],
          lessonType: 'Frontal',
          location: 'תל אביב',
          availability: [],
          rating: 4.7,
          totalLessons: 8,
          createdAt: new Date().toISOString(),
        },
      ]
      demoUsers.forEach(user => addUser(user))
    }

    // Find matches
    const loadMatches = async () => {
      setLoading(true)
      // Wait a bit for users to be loaded
      setTimeout(async () => {
        const allUsers = useStore.getState().users
        const matches = await findMatches(currentUser, allUsers)
        setPotentialMatches(matches)
        setLoading(false)
      }, 100)
    }

    loadMatches()
  }, [currentUser, router, addUser])

  if (!currentUser) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-300">מחפש התאמות...</p>
        </div>
      </div>
    )
  }

  const currentMatch = potentialMatches[currentMatchIndex]
  const matchedUser = currentMatch
    ? users.find(u => u.id === currentMatch.user2Id) || users.find(u => u.id === currentMatch.user1Id && u.id !== currentUser.id)
    : null

  const handleAccept = () => {
    if (currentMatch) {
      const updatedMatch = { ...currentMatch, status: 'accepted' as const }
      addMatch(updatedMatch)
      setCurrentMatchIndex(prev => prev + 1)
      // Show success message
      setTimeout(() => {
        if (window.confirm('התאמה התקבלה! האם תרצה לעבור לדף ההתאמות?')) {
          router.push('/matches/accepted')
        }
      }, 500)
    }
  }

  const handleReject = () => {
    if (currentMatch) {
      const updatedMatch = { ...currentMatch, status: 'rejected' as const }
      addMatch(updatedMatch)
      setCurrentMatchIndex(prev => prev + 1)
    }
  }

  if (!currentMatch || !matchedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-white">אין התאמות נוספות</h2>
          <p className="text-gray-300 mb-6">
            נסה להוסיף עוד מיומנויות לפרופיל שלך או לבדוק שוב מאוחר יותר
          </p>
          <Link
            href="/profile"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            ערוך פרופיל
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">מצא התאמות</h1>

        {/* Match Card */}
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
          {/* User Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <Users className="h-16 w-16 text-primary-600" />
            </div>
          </div>

          {/* User Info */}
            <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{matchedUser.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-white">{matchedUser.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({matchedUser.totalLessons} שיעורים)</span>
                </div>
              </div>
            </div>

            {/* Location & Lesson Type */}
            <div className="flex gap-4 mb-6 text-sm text-gray-300">
              {matchedUser.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {matchedUser.location}
                </div>
              )}
              <div className="flex items-center gap-1">
                {matchedUser.lessonType === 'Zoom' || matchedUser.lessonType === 'Both' ? (
                  <Video className="h-4 w-4" />
                ) : null}
                {matchedUser.lessonType === 'Zoom' ? 'זום' :
                 matchedUser.lessonType === 'Frontal' ? 'פרונטלי' : 'זום ופרונטלי'}
              </div>
            </div>

            {/* Skills Exchange */}
            <div className="space-y-4 mb-6">
              <div className="bg-green-900 border-r-4 border-green-500 p-4 rounded">
                <p className="text-sm text-gray-300 mb-1">אתה תלמד:</p>
                <p className="font-semibold text-green-300">
                  {currentMatch.skill2ToTeach.name} ({currentMatch.skill2ToTeach.experienceLevel})
                </p>
                <p className="text-xs text-gray-400 mt-1">{currentMatch.skill2ToTeach.category}</p>
              </div>
              <div className="bg-blue-900 border-r-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-gray-300 mb-1">אתה תלמד:</p>
                <p className="font-semibold text-blue-300">
                  {currentMatch.skill1ToTeach.name} ({currentMatch.skill1ToTeach.experienceLevel})
                </p>
                <p className="text-xs text-gray-400 mt-1">{currentMatch.skill1ToTeach.category}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleReject}
                className="flex-1 bg-red-100 text-red-600 py-4 rounded-lg font-semibold hover:bg-red-200 flex items-center justify-center gap-2"
              >
                <X className="h-6 w-6" />
                דחה
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 bg-green-100 text-green-600 py-4 rounded-lg font-semibold hover:bg-green-200 flex items-center justify-center gap-2"
              >
                <Check className="h-6 w-6" />
                קבל
              </button>
            </div>
          </div>
        </div>

        {/* Match Counter */}
        <div className="text-center mt-4 text-gray-300">
          {currentMatchIndex + 1} מתוך {potentialMatches.length} התאמות
        </div>
      </div>
    </div>
  )
}

