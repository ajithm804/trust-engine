import React from 'react'
import { useApp } from '../App'

const Header = () => {
  const { state } = useApp()
  
  const statusDot = state.apiConnected 
    ? 'w-2 h-2 rounded-full bg-green-400' 
    : 'w-2 h-2 rounded-full bg-red-400'
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Privacy-First A/B Testing Platform
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={statusDot}></div>
              <span className="text-sm text-gray-600">
                {state.apiConnected ? '✅ Connected' : '❌ Disconnected'}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              👤 {state.user.name} | {state.user.team}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
