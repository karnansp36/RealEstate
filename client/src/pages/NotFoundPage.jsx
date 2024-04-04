import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div>
       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-600 hover:underline">Go back to homepage</Link>
        </div>
    </div>
  )
}
