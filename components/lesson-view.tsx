'use client'

import { Button } from '@/components/ui/button'

interface Lesson {
  id: number
  title: string
  section: string
}

interface LessonViewProps {
  lesson: Lesson | undefined
  onStartQuiz: () => void
}

const LESSON_CONTENT: Record<number, { content: string; examples: string[] }> = {
  1: {
    content: `Variables are containers for storing data values. In JavaScript, you can declare variables using three keywords:
    
    • var - Function-scoped, can be redeclared
    • let - Block-scoped, can be reassigned
    • const - Block-scoped, cannot be reassigned
    
    JavaScript has several data types:
    • String - Text data
    • Number - Numeric data
    • Boolean - true or false
    • Object - Collections of key-value pairs
    • Array - Ordered lists of values
    • undefined - Variable declared but not assigned
    • null - Intentional absence of value`,
    examples: [
      'let name = "John";',
      'const age = 25;',
      'var isActive = true;',
    ],
  },
  2: {
    content: `Functions are reusable blocks of code that perform a specific task. You can define functions in several ways:
    
    • Function Declaration: function myFunc() {}
    • Function Expression: const myFunc = function() {}
    • Arrow Function: const myFunc = () => {}
    
    Functions can accept parameters and return values. They help organize code and make it reusable.`,
    examples: [
      'function greet(name) { return `Hello, ${name}!`; }',
      'const add = (a, b) => a + b;',
    ],
  },
  3: {
    content: `Arrays are ordered lists of values, while Objects are collections of key-value pairs.
    
    Arrays use square brackets [] and are indexed starting from 0.
    Objects use curly braces {} and store data as properties.
    
    Both are fundamental data structures in JavaScript and can be nested.`,
    examples: [
      'const fruits = ["apple", "banana", "orange"];',
      'const person = { name: "John", age: 25 };',
    ],
  },
  4: {
    content: `Arrow functions (=>) are a concise way to write functions in ES6. They have a shorter syntax and automatically bind 'this' to the surrounding context.
    
    Arrow functions are great for:
    • Callback functions
    • Array methods (map, filter, reduce)
    • Event handlers
    
    Note: Arrow functions don't have their own 'this' binding.`,
    examples: [
      'const square = (x) => x * x;',
      'const numbers = [1, 2, 3].map(n => n * 2);',
    ],
  },
  5: {
    content: `Async/await is a modern way to handle asynchronous operations in JavaScript. It makes asynchronous code look and behave more like synchronous code.
    
    • async functions always return a Promise
    • await pauses execution until the Promise resolves
    • Use try/catch for error handling
    
    This is much cleaner than using .then() chains!`,
    examples: [
      'async function fetchData() { const data = await fetch(url); return data.json(); }',
    ],
  },
}

export function LessonView({ lesson, onStartQuiz }: LessonViewProps) {
  if (!lesson) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Select a lesson from the sidebar
      </div>
    )
  }

  const content = LESSON_CONTENT[lesson.id] || {
    content: 'Lesson content coming soon...',
    examples: [],
  }

  return (
    <div className="bg-card rounded-lg p-8 h-full overflow-auto">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">{lesson.section}</div>
        <h2 className="text-3xl font-bold mb-4">{lesson.title}</h2>
      </div>

      <div className="prose prose-sm max-w-none mb-8">
        <div className="whitespace-pre-line text-foreground leading-relaxed">
          {content.content}
        </div>
      </div>

      {content.examples.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Examples:</h3>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            {content.examples.map((example, index) => (
              <code key={index} className="block text-sm font-mono text-foreground">
                {example}
              </code>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={onStartQuiz}
        className="bg-primary hover:bg-primary/90"
        size="lg"
      >
        Start Quiz
      </Button>
    </div>
  )
}

