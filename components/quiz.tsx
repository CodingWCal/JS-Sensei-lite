'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface QuizProps {
  onComplete: () => void
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Which keyword is used to declare a variable?',
    options: ['var', 'let', 'const', 'All of the above'],
    correct: 3,
  },
  {
    id: 2,
    question: 'What is the correct way to create a function?',
    options: ['function myFunc() {}', 'const myFunc = () => {}', 'Both A and B', 'None'],
    correct: 2,
  },
]

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const question = QUIZ_QUESTIONS[currentQuestion]

  const handleAnswer = (index: number) => {
    if (index === question.correct) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  if (showResults) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100)
    return (
      <div className="bg-card rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-5xl font-bold text-primary mb-6">{percentage}%</div>
        <p className="text-muted-foreground mb-2">
          You got {score} out of {QUIZ_QUESTIONS.length} questions correct.
        </p>
        <Button onClick={onComplete} className="mt-6 bg-primary hover:bg-primary/90 w-full">
          Back to Lesson
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-8 max-w-md w-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-muted-foreground">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold">{question.question}</h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full p-4 text-left border border-border rounded-lg hover:bg-muted transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

