'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const matchId = params.matchId as string
  const { currentUser, matches, users, messages, addMessage } = useStore()
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const match = matches.find(m => m.id === matchId)
  const matchedUser = match
    ? users.find(u => 
        u.id === (match.user1Id === currentUser?.id ? match.user2Id : match.user1Id)
      )
    : null

  const chatMessages = messages.filter(m => m.chatId === matchId)

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth')
      return
    }

    if (!match) {
      router.push('/matches/accepted')
      return
    }

    // Initialize chat if needed
    if (!match.chatId) {
      // Chat will be created when first message is sent
    }
  }, [currentUser, match, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !currentUser || !match) return

    const chatId = match.chatId || `chat-${matchId}`
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      chatId,
      senderId: currentUser.id,
      content: messageText.trim(),
      timestamp: new Date().toISOString(),
    }

    addMessage(newMessage)

    // Update match with chatId if it's the first message
    if (!match.chatId) {
      useStore.getState().updateMatch(matchId, { chatId })
    }

    setMessageText('')
  }

  if (!currentUser || !match || !matchedUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/matches/accepted"
              className="text-gray-300 hover:text-white"
            >
              <ArrowRight className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">{matchedUser.name}</h1>
              <p className="text-sm text-gray-400">
                {match.skill1ToTeach.name} ↔ {match.skill2ToTeach.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>אין הודעות עדיין. התחל שיחה!</p>
            </div>
          ) : (
            chatMessages.map((message) => {
              const isOwn = message.senderId === currentUser.id
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isOwn
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwn ? 'text-primary-100' : 'text-gray-400'
                      }`}
                    >
                      {format(new Date(message.timestamp), 'HH:mm')}
                    </p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="הקלד הודעה..."
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="h-5 w-5" />
            שלח
          </button>
        </form>
      </div>
    </div>
  )
}

