import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JavaScript Sensei Lite',
  description: 'Master the fundamentals of JavaScript with interactive lessons and quizzes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
