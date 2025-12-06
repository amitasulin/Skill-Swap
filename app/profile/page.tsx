'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { Star, Edit, ArrowRight } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser } = useStore()

  if (!currentUser) {
    router.push('/auth')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">{currentUser.name}</h1>
              <p className="text-gray-300">{currentUser.email}</p>
              {currentUser.location && (
                <p className="text-gray-300 mt-1">📍 {currentUser.location}</p>
              )}
            </div>
            <Link
              href="/profile/edit"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              ערוך פרופיל
            </Link>
          </div>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(currentUser.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-700 font-semibold">
              {currentUser.rating > 0 ? currentUser.rating.toFixed(1) : 'אין דירוגים עדיין'}
            </span>
            <span className="text-gray-500">({currentUser.totalLessons} שיעורים)</span>
          </div>
        </div>

        {/* Skills to Teach */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">מה אני מלמד</h2>
          {currentUser.skillsToTeach.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {currentUser.skillsToTeach.map((skill) => (
                <div key={skill.id} className="border border-gray-600 bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-white">{skill.name}</h3>
                    <span className="bg-primary-900 text-primary-300 px-2 py-1 rounded text-sm">
                      {skill.experienceLevel}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">קטגוריה: {skill.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">עדיין לא הוספת מיומנויות ללמד</p>
          )}
        </div>

        {/* Skills to Learn */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">מה אני רוצה ללמוד</h2>
          {currentUser.skillsToLearn.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {currentUser.skillsToLearn.map((skill) => (
                <div key={skill.id} className="border border-gray-600 bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-white">{skill.name}</h3>
                    <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-sm">
                      {skill.experienceLevel}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">קטגוריה: {skill.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">עדיין לא הוספת מיומנויות ללמוד</p>
          )}
        </div>

        {/* Preferences */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">העדפות</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">סוג שיעור:</span> {
              currentUser.lessonType === 'Zoom' ? 'זום בלבד' :
              currentUser.lessonType === 'Frontal' ? 'פרונטלי בלבד' :
              'זום ופרונטלי'
            }</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/matches"
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 text-center font-semibold flex items-center justify-center gap-2"
          >
            מצא התאמות
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

