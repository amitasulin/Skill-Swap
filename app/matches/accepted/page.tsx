'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { MessageCircle, Calendar, Star } from 'lucide-react'

export default function AcceptedMatchesPage() {
  const router = useRouter()
  const { currentUser, matches, users } = useStore()

  if (!currentUser) {
    router.push('/auth')
    return null
  }

  const acceptedMatches = matches.filter(
    m => m.status === 'accepted' && 
    (m.user1Id === currentUser.id || m.user2Id === currentUser.id)
  )

  const getMatchedUser = (match: typeof matches[0]) => {
    const otherUserId = match.user1Id === currentUser.id ? match.user2Id : match.user1Id
    return users.find(u => u.id === otherUserId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">ההתאמות שלי</h1>

        {acceptedMatches.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-8 text-center">
            <p className="text-gray-300 mb-4">אין לך התאמות מקובלות עדיין</p>
            <Link
              href="/matches"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
            >
              מצא התאמות חדשות
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {acceptedMatches.map((match) => {
              const matchedUser = getMatchedUser(match)
              if (!matchedUser) return null

              return (
                <div key={match.id} className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">{matchedUser.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-300">{matchedUser.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-900 p-4 rounded-lg border border-green-700">
                      <p className="text-sm text-gray-300 mb-1">אתה לומד:</p>
                      <p className="font-semibold text-green-300">{match.skill2ToTeach.name}</p>
                      <p className="text-xs text-gray-400">{match.skill2ToTeach.category}</p>
                    </div>
                    <div className="bg-blue-900 p-4 rounded-lg border border-blue-700">
                      <p className="text-sm text-gray-300 mb-1">אתה מלמד:</p>
                      <p className="font-semibold text-blue-300">{match.skill1ToTeach.name}</p>
                      <p className="text-xs text-gray-400">{match.skill1ToTeach.category}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/chat/${match.id}`}
                      className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      צ'אט
                    </Link>
                    <Link
                      href={`/schedule/${match.id}`}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Calendar className="h-5 w-5" />
                      קבע שיעור
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

