'use client'

import { Button } from '@/components/ui/button'

interface Lesson {
  id: number
  title: string
  section: string
}

interface SidebarProps {
  lessons: Lesson[]
  currentLessonId: number
  onSelectLesson: (id: number) => void
}

export function Sidebar({ lessons, currentLessonId, onSelectLesson }: SidebarProps) {
  const sections = Array.from(new Set(lessons.map((l) => l.section)))

  return (
    <aside className="w-64 border-r border-border bg-card overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Lessons</h2>
      </div>

      <div className="p-2">
        {sections.map((section) => (
          <div key={section} className="mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">
              {section}
            </h3>
            <div className="space-y-1">
              {lessons
                .filter((lesson) => lesson.section === section)
                .map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      currentLessonId === lesson.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {lesson.title}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

