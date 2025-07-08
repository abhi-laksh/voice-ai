'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const handleTTS = async () => {
    if (!text.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/backend/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
      } else {
        console.error('TTS failed')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={100}
              height={24}
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Text-to-Speech App
          </h1>
          <p className="text-lg text-gray-600">
            Convert your text to speech with our powerful TTS engine
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your text:
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={4}
              placeholder="Type the text you want to convert to speech..."
            />
          </div>
          
          <button
            onClick={handleTTS}
            disabled={isLoading || !text.trim()}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Converting...' : 'Convert to Speech'}
          </button>
        </div>

        {audioUrl && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Audio:</h3>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={20}
                height={20}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Deployed on Vercel</span>
            </div>
            <div className="flex items-center">
              <Image
                src="/globe.svg"
                alt="Globe"
                width={20}
                height={20}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Global CDN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}