import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Trust Engine - Enhanced Main Entry Point
 * Current Date and Time: 2025-07-07 20:35:27 UTC
 * Current User: Ajith
 * Version: 3.0.0 Enhanced
 * Team: Halo
 * Platform: Privacy-First A/B Testing with Advanced Analytics
 */

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null,
      timestamp: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now(),
      timestamp: new Date().toISOString()
    }
  }

  componentDidCatch(error, errorInfo) {
    // Enhanced error logging with user context
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Log error to console with enhanced details
    console.error('🚨 Trust Engine Error Boundary Caught:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      user: 'Ajith',
      timestamp: '2025-07-07 20:35:27',
      version: '3.0.0',
      team: 'Halo',
      errorId: this.state.errorId
    })

    // In production, you would send this to your error tracking service
    if (import.meta.env.PROD) {
      this.logErrorToService({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        user: 'Ajith',
        timestamp: '2025-07-07 20:35:27',
        version: '3.0.0',
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }
  }

  logErrorToService = async (errorData) => {
    try {
      // Example error logging to backend
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      })
    } catch (logError) {
      console.error('Failed to log error to service:', logError)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null,
      timestamp: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Enhanced error UI
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl">
            <div className="text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h1>

              {/* Error Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Trust Engine encountered an unexpected error. Our team has been notified.
              </p>

              {/* Error Details (Development Mode) */}
              {import.meta.env.DEV && this.state.error && (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Error Details:
                  </h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-mono break-all">
                    {this.state.error.message}
                  </p>
                  {this.state.errorInfo?.componentStack && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                        Component Stack
                      </summary>
                      <pre className="text-xs text-gray-500 dark:text-gray-500 mt-1 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Error Metadata */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <div>Error ID: {this.state.errorId}</div>
                  <div>User: Ajith</div>
                  <div>Time: 2025-07-07 20:35:27 UTC</div>
                  <div>Version: Trust Engine v3.0.0</div>
                  <div>Team: Halo</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleRetry}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={this.handleReload}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
                >
                  Reload Page
                </button>
              </div>

              {/* Support Link */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Need help? Contact{' '}
                <a href="mailto:support@trustengine.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Trust Engine Support
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Enhanced Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      loadStart: performance.now(),
      user: 'Ajith',
      timestamp: '2025-07-07 20:35:27',
      version: '3.0.0'
    }
    this.observers = []
    this.init()
  }

  init() {
    // Measure Core Web Vitals
    this.measureCoreWebVitals()
    
    // Monitor component render times
    this.setupRenderTimeObserver()
    
    // Track user interactions
    this.setupInteractionObserver()
    
    // Monitor memory usage
    this.setupMemoryObserver()
  }

  measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.lcp = lastEntry.startTime
      this.logMetric('LCP', lastEntry.startTime)
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0]
      this.metrics.fid = firstInput.processingStart - firstInput.startTime
      this.logMetric('FID', this.metrics.fid)
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      this.metrics.cls = clsValue
      this.logMetric('CLS', clsValue)
    }).observe({ entryTypes: ['layout-shift'] })
  }

  setupRenderTimeObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure' && entry.name.includes('React')) {
            this.logMetric('React Render', entry.duration)
          }
        }
      })
      observer.observe({ entryTypes: ['measure'] })
      this.observers.push(observer)
    }
  }

  setupInteractionObserver() {
    // Track click events
    document.addEventListener('click', (event) => {
      const element = event.target.closest('[data-track]') || event.target
      this.logInteraction('click', {
        element: element.tagName,
        className: element.className,
        timestamp: Date.now()
      })
    })

    // Track navigation
    window.addEventListener('popstate', () => {
      this.logInteraction('navigation', {
        path: window.location.pathname,
        timestamp: Date.now()
      })
    })
  }

  setupMemoryObserver() {
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memory = {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit,
          timestamp: Date.now()
        }
      }, 30000) // Check every 30 seconds
    }
  }

  logMetric(name, value) {
    console.log(`📊 Trust Engine Performance [${name}]:`, {
      value,
      user: 'Ajith',
      timestamp: new Date().toISOString(),
      url: window.location.href
    })

    // In production, send to analytics service
    if (import.meta.env.PROD) {
      this.sendToAnalytics('performance', { name, value })
    }
  }

  logInteraction(type, data) {
    console.log(`👆 Trust Engine Interaction [${type}]:`, {
      ...data,
      user: 'Ajith',
      timestamp: new Date().toISOString()
    })

    // In production, send to analytics service
    if (import.meta.env.PROD) {
      this.sendToAnalytics('interaction', { type, ...data })
    }
  }

  async sendToAnalytics(eventType, data) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          data,
          user: 'Ajith',
          timestamp: '2025-07-07 20:35:27',
          version: '3.0.0'
        })
      })
    } catch (error) {
      console.warn('Analytics logging failed:', error)
    }
  }

  getMetrics() {
    return this.metrics
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect())
  }
}

// Enhanced Feature Detection
class FeatureDetector {
  constructor() {
    this.features = {}
    this.detectFeatures()
  }

  detectFeatures() {
    // Browser capabilities
    this.features.browser = {
      webgl: this.detectWebGL(),
      webgl2: this.detectWebGL2(),
      webAssembly: this.detectWebAssembly(),
      serviceWorker: 'serviceWorker' in navigator,
      pushNotifications: 'PushManager' in window,
      webRTC: 'RTCPeerConnection' in window,
      geolocation: 'geolocation' in navigator,
      deviceMotion: 'DeviceMotionEvent' in window,
      touchSupport: this.detectTouchSupport(),
      highDPI: window.devicePixelRatio > 1
    }

    // Performance capabilities
    this.features.performance = {
      performanceObserver: 'PerformanceObserver' in window,
      performanceNavigation: 'performance' in window && 'navigation' in performance,
      performanceMemory: 'memory' in performance,
      userTiming: 'mark' in performance,
      resourceTiming: 'getEntriesByType' in performance
    }

    // Storage capabilities
    this.features.storage = {
      localStorage: this.detectLocalStorage(),
      sessionStorage: this.detectSessionStorage(),
      indexedDB: 'indexedDB' in window,
      webSQL: 'openDatabase' in window,
      cookieEnabled: navigator.cookieEnabled
    }

    // Network capabilities
    this.features.network = {
      online: navigator.onLine,
      connection: 'connection' in navigator,
      effectiveType: navigator.connection?.effectiveType || 'unknown',
      downlink: navigator.connection?.downlink || 0,
      saveData: navigator.connection?.saveData || false
    }

    // Security features
    this.features.security = {
      https: location.protocol === 'https:',
      secureContext: window.isSecureContext,
      crypto: 'crypto' in window,
      subtleCrypto: 'crypto' in window && 'subtle' in crypto
    }

    this.logFeatures()
  }

  detectWebGL() {
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch (e) {
      return false
    }
  }

  detectWebGL2() {
    try {
      const canvas = document.createElement('canvas')
      return !!canvas.getContext('webgl2')
    } catch (e) {
      return false
    }
  }

  detectWebAssembly() {
    try {
      return typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function'
    } catch (e) {
      return false
    }
  }

  detectTouchSupport() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  }

  detectLocalStorage() {
    try {
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  detectSessionStorage() {
    try {
      const test = 'test'
      sessionStorage.setItem(test, test)
      sessionStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  logFeatures() {
    console.log('🔍 Trust Engine Feature Detection:', {
      features: this.features,
      user: 'Ajith',
      timestamp: '2025-07-07 20:35:27',
      userAgent: navigator.userAgent,
      version: '3.0.0'
    })
  }

  getFeatures() {
    return this.features
  }

  isFeatureSupported(category, feature) {
    return this.features[category]?.[feature] || false
  }
}

// Enhanced App Initialization
class AppInitializer {
  constructor() {
    this.initializationStart = performance.now()
    this.performanceMonitor = new PerformanceMonitor()
    this.featureDetector = new FeatureDetector()
    this.setupGlobalErrorHandling()
    this.setupDevelopmentTools()
    this.setupAnalytics()
  }

  setupGlobalErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('🚨 Global Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        user: 'Ajith',
        timestamp: '2025-07-07 20:35:27',
        url: window.location.href
      })
    })

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('🚨 Unhandled Promise Rejection:', {
        reason: event.reason,
        promise: event.promise,
        user: 'Ajith',
        timestamp: '2025-07-07 20:35:27',
        url: window.location.href
      })
    })
  }

  setupDevelopmentTools() {
    if (import.meta.env.DEV) {
      // Development console banner
      console.log(
        '%c🚀 Trust Engine Development Mode',
        'color: #3b82f6; font-size: 20px; font-weight: bold;'
      )
      console.log(
        '%cVersion: 3.0.0 Enhanced | User: Ajith | Team: Halo',
        'color: #6b7280; font-size: 12px;'
      )
      console.log(
        '%cTime: 2025-07-07 20:35:27 UTC',
        'color: #6b7280; font-size: 12px;'
      )

      // Make performance monitor available globally for debugging
      window.trustEnginePerformance = this.performanceMonitor
      window.trustEngineFeatures = this.featureDetector

      // React DevTools detection
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        console.log('🔧 React DevTools detected')
      }
    }
  }

  setupAnalytics() {
    // Track app initialization
    const initTime = performance.now() - this.initializationStart
    console.log(`⚡ Trust Engine initialized in ${initTime.toFixed(2)}ms`)

    // Setup page visibility tracking
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        console.log('👁️ Trust Engine became visible')
      } else {
        console.log('🙈 Trust Engine became hidden')
      }
    })

    // Setup online/offline tracking
    window.addEventListener('online', () => {
      console.log('🌐 Trust Engine back online')
    })

    window.addEventListener('offline', () => {
      console.log('📶 Trust Engine went offline')
    })
  }

  getInitializationMetrics() {
    return {
      initTime: performance.now() - this.initializationStart,
      features: this.featureDetector.getFeatures(),
      performance: this.performanceMonitor.getMetrics(),
      timestamp: '2025-07-07 20:35:27',
      user: 'Ajith',
      version: '3.0.0'
    }
  }
}

// Enhanced Loading Component
const EnhancedLoader = () => {
  const [loadingStage, setLoadingStage] = React.useState('initializing')
  const [loadingProgress, setLoadingProgress] = React.useState(0)

  React.useEffect(() => {
    const stages = [
      { name: 'initializing', duration: 300 },
      { name: 'loading-features', duration: 500 },
      { name: 'connecting-api', duration: 400 },
      { name: 'preparing-dashboard', duration: 600 },
      { name: 'ready', duration: 200 }
    ]

    let currentStage = 0
    let progress = 0

    const updateProgress = () => {
      progress += 2
      setLoadingProgress(progress)

      if (progress >= 100) {
        setLoadingStage('ready')
        return
      }

      if (progress > (currentStage + 1) * 20 && currentStage < stages.length - 1) {
        currentStage++
        setLoadingStage(stages[currentStage].name)
      }

      setTimeout(updateProgress, 50)
    }

    updateProgress()
  }, [])

  const getStageMessage = (stage) => {
    const messages = {
      'initializing': 'Initializing Trust Engine...',
      'loading-features': 'Loading enhanced features...',
      'connecting-api': 'Connecting to API services...',
      'preparing-dashboard': 'Preparing your dashboard...',
      'ready': 'Ready! Launching Trust Engine...'
    }
    return messages[stage] || 'Loading...'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <span className="text-white font-bold text-2xl">TE</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Trust Engine
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Privacy-First A/B Testing Platform
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {getStageMessage(loadingStage)}
        </p>

        {/* Progress Percentage */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-8">
          {loadingProgress}% Complete
        </p>

        {/* User Info */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>User: Ajith | Team: Halo</p>
          <p>Version: 3.0.0 Enhanced</p>
          <p>Time: 2025-07-07 20:35:27 UTC</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Initialize the app
const appInitializer = new AppInitializer()

// Log startup information
console.log('🚀 Trust Engine Starting Up:', {
  user: 'Ajith',
  timestamp: '2025-07-07 20:35:27',
  version: '3.0.0 Enhanced',
  team: 'Halo',
  environment: import.meta.env.MODE,
  features: appInitializer.featureDetector.getFeatures()
})

// Enhanced StrictMode wrapper for development
const StrictModeWrapper = ({ children }) => {
  if (import.meta.env.DEV) {
    return <React.StrictMode>{children}</React.StrictMode>
  }
  return children
}

// Enhanced App with Suspense and Error Boundary
const EnhancedApp = () => {
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return <EnhancedLoader />
  }

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<EnhancedLoader />}>
        <App />
      </React.Suspense>
    </ErrorBoundary>
  )
}

// Create root and render app
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootElement)

// Enhanced render with performance tracking
const renderStart = performance.now()

root.render(
  <StrictModeWrapper>
    <EnhancedApp />
  </StrictModeWrapper>
)

// Log render completion
const renderTime = performance.now() - renderStart
console.log(`⚡ Trust Engine rendered in ${renderTime.toFixed(2)}ms`)

// Service Worker Registration (for production)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('📦 Service Worker registered:', registration)
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error)
      })
  })
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  appInitializer.performanceMonitor.cleanup()
  console.log('👋 Trust Engine shutting down gracefully')
})

// Export for testing purposes
if (import.meta.env.DEV) {
  window.trustEngine = {
    initializer: appInitializer,
    version: '3.0.0',
    user: 'Ajith',
    team: 'Halo',
    timestamp: '2025-07-07 20:35:27'
  }
}

/**
 * Trust Engine Enhanced Main Entry Point
 * 
 * Features Added:
 * ✅ Enhanced Error Boundary with detailed error reporting
 * ✅ Performance Monitoring with Core Web Vitals
 * ✅ Feature Detection for browser capabilities
 * ✅ Global Error Handling for unhandled errors
 * ✅ Development Tools integration
 * ✅ Analytics and interaction tracking
 * ✅ Enhanced Loading Component with progress
 * ✅ Service Worker registration for PWA support
 * ✅ Graceful shutdown handling
 * ✅ Production-ready error logging
 * ✅ Memory usage monitoring
 * ✅ Network status tracking
 * ✅ Security feature detection
 * 
 * Current Configuration:
 * - User: Ajith
 * - Team: Halo
 * - Version: 3.0.0 Enhanced
 * - Date: 2025-07-07 20:35:27 UTC
 * - Environment: Development/Production ready
 */