'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Calendar, Clock, Video, MapPin } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default function SchedulePage() {
  const router = useRouter()
  const params = useParams()
  const matchId = params.matchId as string
  const { currentUser, matches, users, addLesson } = useStore()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [skillToTeach, setSkillToTeach] = useState('')

  const match = matches.find(m => m.id === matchId)
  const matchedUser = match
    ? users.find(u => 
        u.id === (match.user1Id === currentUser?.id ? match.user2Id : match.user1Id)
      )
    : null

  if (!currentUser || !match || !matchedUser) {
    router.push('/matches/accepted')
    return null
  }

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !skillToTeach) return

    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`)
    
    const lesson = {
      id: `lesson-${Date.now()}`,
      matchId: match.id,
      skillTaught: skillToTeach,
      teacherId: skillToTeach === match.skill1ToTeach.name ? currentUser.id : matchedUser.id,
      studentId: skillToTeach === match.skill1ToTeach.name ? matchedUser.id : currentUser.id,
      scheduledDate: scheduledDateTime.toISOString(),
    }

    addLesson(lesson)
    alert('שיעור נקבע בהצלחה!')
    router.push('/matches/accepted')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">קבע שיעור</h1>

        <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h2 className="font-semibold mb-2 text-white">עם: {matchedUser.name}</h2>
          <div className="space-y-1 text-sm text-gray-300">
            <p>אתה לומד: <span className="font-semibold">{match.skill2ToTeach.name}</span></p>
            <p>אתה מלמד: <span className="font-semibold">{match.skill1ToTeach.name}</span></p>
          </div>
        </div>

        <form onSubmit={handleSchedule} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              איזה שיעור?
            </label>
            <select
              value={skillToTeach}
              onChange={(e) => setSkillToTeach(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">בחר שיעור</option>
              <option value={match.skill1ToTeach.name}>
                אני מלמד: {match.skill1ToTeach.name}
              </option>
              <option value={match.skill2ToTeach.name}>
                אני לומד: {match.skill2ToTeach.name}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="inline h-4 w-4 ml-1" />
              תאריך
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="inline h-4 w-4 ml-1" />
              שעה
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/matches/accepted"
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 text-center"
            >
              ביטול
            </Link>
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
            >
              קבע שיעור
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

