'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import type { Skill, ExperienceLevel, LessonType } from '@/types'
import { Plus, X } from 'lucide-react'

const SKILL_CATEGORIES = [
  'תכנות', 'עיצוב', 'שפות', 'מוזיקה', 'ספורט', 'בישול', 'אמנות', 'עסקים', 'אחר'
]

const EXPERIENCE_LEVELS: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Expert']

const LESSON_TYPES: { value: LessonType; label: string }[] = [
  { value: 'Zoom', label: 'זום בלבד' },
  { value: 'Frontal', label: 'פרונטלי בלבד' },
  { value: 'Both', label: 'זום ופרונטלי' },
]

export default function EditProfilePage() {
  const router = useRouter()
  const { currentUser, updateUser } = useStore()
  const [skillsToTeach, setSkillsToTeach] = useState<Skill[]>([])
  const [skillsToLearn, setSkillsToLearn] = useState<Skill[]>([])
  const [newSkill, setNewSkill] = useState({ name: '', category: '', experienceLevel: 'Beginner' as ExperienceLevel })
  const [profileData, setProfileData] = useState({
    location: '',
    lessonType: 'Both' as LessonType,
  })

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth')
      return
    }

    setSkillsToTeach(currentUser.skillsToTeach)
    setSkillsToLearn(currentUser.skillsToLearn)
    setProfileData({
      location: currentUser.location || '',
      lessonType: currentUser.lessonType,
    })
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  const addSkillToTeach = () => {
    if (newSkill.name && newSkill.category) {
      setSkillsToTeach([...skillsToTeach, {
        id: `skill-${Date.now()}`,
        ...newSkill,
        experienceLevel: newSkill.experienceLevel as ExperienceLevel,
      }])
      setNewSkill({ name: '', category: '', experienceLevel: 'Beginner' })
    }
  }

  const addSkillToLearn = () => {
    if (newSkill.name && newSkill.category) {
      setSkillsToLearn([...skillsToLearn, {
        id: `skill-${Date.now()}`,
        ...newSkill,
        experienceLevel: newSkill.experienceLevel as ExperienceLevel,
      }])
      setNewSkill({ name: '', category: '', experienceLevel: 'Beginner' })
    }
  }

  const removeSkill = (id: string, list: Skill[], setList: (skills: Skill[]) => void) => {
    setList(list.filter(s => s.id !== id))
  }

  const handleSave = () => {
    updateUser(currentUser.id, {
      skillsToTeach,
      skillsToLearn,
      location: profileData.location,
      lessonType: profileData.lessonType,
    })
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8">
        <h1 className="text-3xl font-bold mb-8 text-white">ערוך פרופיל</h1>

        {/* Skills to Teach */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">מה אתה יודע ללמד?</h2>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="שם המיומנות"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              />
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                <option value="">קטגוריה</option>
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={newSkill.experienceLevel}
                onChange={(e) => setNewSkill({ ...newSkill, experienceLevel: e.target.value as ExperienceLevel })}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addSkillToTeach}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {skillsToTeach.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
                <div>
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="text-gray-300 mr-2"> - {skill.category} ({skill.experienceLevel})</span>
                </div>
                <button
                  onClick={() => removeSkill(skill.id, skillsToTeach, setSkillsToTeach)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills to Learn */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">מה אתה רוצה ללמוד?</h2>
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="שם המיומנות"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              />
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                <option value="">קטגוריה</option>
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={newSkill.experienceLevel}
                onChange={(e) => setNewSkill({ ...newSkill, experienceLevel: e.target.value as ExperienceLevel })}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              >
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addSkillToLearn}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {skillsToLearn.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
                <div>
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="text-gray-300 mr-2"> - {skill.category} ({skill.experienceLevel})</span>
                </div>
                <button
                  onClick={() => removeSkill(skill.id, skillsToLearn, setSkillsToLearn)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">העדפות</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                מיקום / אזור
              </label>
              <input
                type="text"
                placeholder="תל אביב, ירושלים, או 'זום בלבד'"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                סוג שיעור מועדף
              </label>
              <div className="space-y-2">
                {LESSON_TYPES.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="lessonType"
                      value={type.value}
                      checked={profileData.lessonType === type.value}
                      onChange={(e) => setProfileData({ ...profileData, lessonType: e.target.value as LessonType })}
                      className="ml-2"
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/profile')}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500"
          >
            ביטול
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            שמור שינויים
          </button>
        </div>
      </div>
    </div>
  )
}

