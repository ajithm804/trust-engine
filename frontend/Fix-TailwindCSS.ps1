# Trust Engine - Tailwind CSS Fix Script
# User: Ajith | Time: 2025-07-07 10:39:56 UTC

Write-Host "🔧 Fixing Tailwind CSS PostCSS Plugin Issue" -ForegroundColor Cyan
Write-Host "User: Ajith | Time: 2025-07-07 10:39:56" -ForegroundColor Gray
Write-Host "================================================" -ForegroundColor Gray

Write-Host "Step 1: Installing correct PostCSS plugin..." -ForegroundColor Yellow
npm install -D @tailwindcss/postcss

Write-Host "Step 2: Removing old files..." -ForegroundColor Yellow
if (Test-Path "postcss.config.js") { Remove-Item "postcss.config.js" }
if (Test-Path "tailwind.config.js") { Remove-Item "tailwind.config.js" }
if (Test-Path "src\App.css") { Remove-Item "src\App.css" }

Write-Host "Step 3: Creating PostCSS config..." -ForegroundColor Yellow
@"
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
"@ | Out-File -FilePath "postcss.config.js" -Encoding UTF8

Write-Host "Step 4: Creating Tailwind config..." -ForegroundColor Yellow
@"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
"@ | Out-File -FilePath "tailwind.config.js" -Encoding UTF8

Write-Host "Step 5: Updating App.jsx..." -ForegroundColor Yellow
@"
import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Trust Engine
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Privacy-First A/B Testing Platform
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-green-600 font-semibold">
            ✅ Frontend is working!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Team Halo | Ajith | 2025-07-07 10:39:56
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
"@ | Out-File -FilePath "src\App.jsx" -Encoding UTF8

Write-Host "✅ Fix complete! Try running npm run dev again." -ForegroundColor Green
