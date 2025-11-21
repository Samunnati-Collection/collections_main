import React from 'react'
import Dashboard from './components/Dashboard'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Samunnati Collections — Internal Dashboard</h1>
        <Dashboard />
      </div>
    </div>
  )
}
