'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { LessonView } from '@/components/lesson-view'
import { CodeEditor } from '@/components/CodeEditor'
import { Quiz } from '@/components/quiz'

const LESSONS = [
  { id: 1, title: 'Variables & Data Types', section: 'Fundamentals' },
  { id: 2, title: 'Functions', section: 'Fundamentals' },
  { id: 3, title: 'Arrays & Objects', section: 'Fundamentals' },
  { id: 4, title: 'ES6 Arrow Functions', section: 'Modern JS' },
  { id: 5, title: 'Async & Await', section: 'Advanced' },
]

export default function Home() {
  const [currentLessonId, setCurrentLessonId] = useState(1)
  const [showQuiz, setShowQuiz] = useState(false)

  const currentLesson = LESSONS.find((l) => l.id === currentLessonId)

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        lessons={LESSONS}
        currentLessonId={currentLessonId}
        onSelectLesson={(id) => {
          setCurrentLessonId(id)
          setShowQuiz(false)
        }}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <h1 className="text-2xl font-bold">JavaScript Sensei Lite</h1>
          <p className="text-sm text-muted-foreground">Master the fundamentals of JavaScript</p>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden gap-4 p-4">
          {!showQuiz ? (
            <>
              {/* Lesson content */}
              <div className="flex-1 overflow-auto">
                <LessonView
                  lesson={currentLesson}
                  onStartQuiz={() => setShowQuiz(true)}
                />
              </div>

              {/* Code editor */}
              <div className="w-1/2 flex flex-col min-w-0">
                <CodeEditor />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Quiz onComplete={() => setShowQuiz(false)} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
