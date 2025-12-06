import type { User, Match, Skill } from '@/types'

// This is a placeholder for AI matching logic
// In production, this would call an external AI API (OpenAI, Anthropic, etc.)
export async function findMatches(currentUser: User, allUsers: User[]): Promise<Match[]> {
  const matches: Match[] = []
  
  for (const otherUser of allUsers) {
    if (otherUser.id === currentUser.id) continue
    
    // Find skills that current user wants to learn and other user can teach
    const skillsToLearn = currentUser.skillsToLearn.filter(skillToLearn =>
      otherUser.skillsToTeach.some(skillToTeach => 
        skillToTeach.name.toLowerCase() === skillToLearn.name.toLowerCase() ||
        skillToTeach.category.toLowerCase() === skillToLearn.category.toLowerCase()
      )
    )
    
    // Find skills that other user wants to learn and current user can teach
    const skillsToTeach = otherUser.skillsToLearn.filter(skillToLearn =>
      currentUser.skillsToTeach.some(skillToTeach => 
        skillToTeach.name.toLowerCase() === skillToLearn.name.toLowerCase() ||
        skillToTeach.category.toLowerCase() === skillToLearn.category.toLowerCase()
      )
    )
    
    // Create a match if there's at least one skill exchange possible
    if (skillsToLearn.length > 0 && skillsToTeach.length > 0) {
      // Check if lesson types are compatible
      const lessonTypeCompatible = 
        currentUser.lessonType === 'Both' ||
        otherUser.lessonType === 'Both' ||
        currentUser.lessonType === otherUser.lessonType
      
      if (lessonTypeCompatible) {
        matches.push({
          id: `match-${Date.now()}-${Math.random()}`,
          user1Id: currentUser.id,
          user2Id: otherUser.id,
          skill1ToTeach: skillsToTeach[0], // Current user teaches this
          skill2ToTeach: skillsToLearn[0], // Other user teaches this
          status: 'pending',
          createdAt: new Date().toISOString(),
        })
      }
    }
  }
  
  return matches
}

// AI-powered lesson plan generator (placeholder)
export async function generateLessonPlan(
  skill: Skill,
  studentLevel: string,
  teacherLevel: string
): Promise<any> {
  // In production, this would call an AI API
  // For now, return a basic structure
  return {
    id: `plan-${Date.now()}`,
    skill: skill.name,
    weeklyTasks: [
      { id: '1', week: 1, description: 'הכרות עם הבסיס', completed: false },
      { id: '2', week: 2, description: 'תרגול מעשי', completed: false },
      { id: '3', week: 3, description: 'פרויקט סיכום', completed: false },
    ],
    knowledgeChecks: [
      { id: '1', question: 'מה הבנת מהשיעור הראשון?', answer: '', completed: false },
    ],
  }
}


