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

export default function ProfileSetupPage() {
  const router = useRouter()
  const { currentUser, updateUser } = useStore()
  const [step, setStep] = useState(1)
  const [skillsToTeach, setSkillsToTeach] = useState<Skill[]>([])
  const [skillsToLearn, setSkillsToLearn] = useState<Skill[]>([])
  const [newSkill, setNewSkill] = useState({ name: '', category: '', experienceLevel: 'Beginner' as ExperienceLevel })
  const [profileData, setProfileData] = useState({
    location: '',
    lessonType: 'Both' as LessonType,
    availability: [] as string[],
  })

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth')
    }
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

  const handleFinish = () => {
    updateUser(currentUser.id, {
      skillsToTeach,
      skillsToLearn,
      location: profileData.location,
      lessonType: profileData.lessonType,
      availability: profileData.availability,
    })
    router.push('/matches')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">השלם את הפרופיל שלך</h1>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-reverse space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 ${step > s ? 'bg-primary-600' : 'bg-gray-700'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Skills to Teach */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">מה אתה יודע ללמד?</h2>
            <p className="text-gray-300 mb-6">הוסף מיומנויות שאתה יכול ללמד אחרים</p>

            <div className="space-y-4 mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="שם המיומנות (למשל: React, עברית, גיטרה)"
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

            <div className="space-y-2 mb-6">
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

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={skillsToTeach.length === 0}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                הבא
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Skills to Learn */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">מה אתה רוצה ללמוד?</h2>
            <p className="text-gray-300 mb-6">הוסף מיומנויות שאתה רוצה ללמוד</p>

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

            <div className="space-y-2 mb-6">
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

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                חזור
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={skillsToLearn.length === 0}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                הבא
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">העדפות נוספות</h2>

            <div className="space-y-6 mb-6">
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

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                חזור
              </button>
              <button
                onClick={handleFinish}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
              >
                סיים
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

