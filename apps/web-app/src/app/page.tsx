'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<'unknown' | 'healthy' | 'unhealthy'>('unknown')

  // Check API health
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await fetch('http://localhost:8000/health')
        if (response.ok) {
          setApiStatus('healthy')
        } else {
          setApiStatus('unhealthy')
        }
      } catch (error) {
        setApiStatus('unhealthy')
      }
    }

    checkApiHealth()
  }, [])

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="flex justify-center items-center mb-4">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
            className="dark:invert"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Full-Stack Monorepo</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A modern full-stack application built with Next.js frontend and FastAPI backend
        </p>
      </header>

      {/* API Status */}
      <div className="mb-8">
        <div className="card max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold mb-2">API Status</h2>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              apiStatus === 'healthy' ? 'bg-green-500' : 
              apiStatus === 'unhealthy' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className="capitalize">{apiStatus}</span>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Users from API</h2>
        
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2">Loading users...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded max-w-md mx-auto">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="card">
                <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="mb-4">
            <Image
              src="/globe.svg"
              alt="Globe"
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Next.js Frontend</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Modern React framework with TypeScript, Tailwind CSS, and server-side rendering
          </p>
        </div>

        <div className="card text-center">
          <div className="mb-4">
            <Image
              src="/file.svg"
              alt="File"
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">FastAPI Backend</h3>
          <p className="text-gray-600 dark:text-gray-300">
            High-performance Python API with automatic OpenAPI documentation
          </p>
        </div>

        <div className="card text-center">
          <div className="mb-4">
            <Image
              src="/window.svg"
              alt="Window"
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Docker Ready</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Containerized deployment with Docker Compose for easy orchestration
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 dark:text-gray-300">
        <p>Built with ❤️ using Next.js, FastAPI, and Docker</p>
      </footer>
    </div>
  )
}