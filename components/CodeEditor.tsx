'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function CodeEditor() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Auto-scroll output to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const runCode = () => {
    if (!code.trim()) {
      setOutput('Please write some code first')
      return
    }

    setIsRunning(true)
    setOutput('')
    
    // Capture console.log output
    const logs: string[] = []
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn
    
    try {
      // Override console methods to capture output
      console.log = (...args) => {
        const formatted = args.map((arg) => {
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2)
            } catch {
              return String(arg)
            }
          }
          return String(arg)
        }).join(' ')
        logs.push(formatted)
        originalLog(...args)
      }

      console.error = (...args) => {
        const formatted = args.map((arg) => {
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2)
            } catch {
              return String(arg)
            }
          }
          return String(arg)
        }).join(' ')
        logs.push(`Error: ${formatted}`)
        originalError(...args)
      }

      console.warn = (...args) => {
        const formatted = args.map((arg) => {
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2)
            } catch {
              return String(arg)
            }
          }
          return String(arg)
        }).join(' ')
        logs.push(`Warning: ${formatted}`)
        originalWarn(...args)
      }

      // Execute the code in a try-catch to handle errors
      const result = eval(code)
      
      // If code returns a value and no console output, show the result
      if (logs.length === 0 && result !== undefined) {
        logs.push(String(result))
      }

      setOutput(logs.join('\n') || 'Code executed successfully (no output)')
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : String(error)
      setOutput(`Error: ${errorMessage}`)
    } finally {
      // Always restore console methods
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
      setIsRunning(false)
    }
  }

  const clearCode = () => {
    setCode('')
    setOutput('')
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <h3 className="font-semibold text-sm">Code Sandbox</h3>
        <div className="flex gap-2">
          <Button
            onClick={clearCode}
            variant="outline"
            size="sm"
            disabled={isRunning}
          >
            Clear
          </Button>
          <Button
            onClick={runCode}
            disabled={isRunning}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      <div className="flex-1 relative border-b border-border bg-muted min-h-0">
        {!code && (
          <div className="absolute inset-0 p-4 pointer-events-none text-muted-foreground/60 font-mono text-sm whitespace-pre z-10">
            {`// Write your JavaScript code here
console.log("Hello, World!");`}
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder=""
          className="w-full h-full p-4 bg-transparent text-foreground font-mono text-sm resize-none focus:outline-none relative z-20"
          style={{ minHeight: '200px' }}
        />
      </div>

      <div 
        ref={outputRef}
        className="flex-1 p-4 bg-muted text-sm font-mono overflow-auto min-h-0"
        style={{ maxHeight: '300px' }}
      >
        <div className="text-foreground whitespace-pre-wrap break-words">
          {output || <span className="text-muted-foreground">Output will appear here...</span>}
        </div>
      </div>
    </div>
  )
}

