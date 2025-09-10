import React, { useState, useEffect, createContext, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom"
import { 
  Moon, Sun, Menu, X, Bell, Search, Settings, ChevronDown, 
  MoreHorizontal, RefreshCw, Download, Calendar, Filter,
  Home, Shield, Brain, BarChart3, Target, Users, AlertTriangle,
  CheckCircle, TrendingUp, Activity, Database, FileText, Eye,
  Zap, Globe, Lock, UserCheck, PieChart, Layout
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Import all page components
import Dashboard from "./pages/Dashboard"
import BiasDetection from "./pages/BiasDetection"
import ABTestSimulator from "./pages/ABTestSimulator"
import PersonaGenerator from "./pages/PersonaGenerator"
import CampaignSetup from "./pages/CampaignSetup"
import ExplainableAI from "./pages/ExplainableAI"
import FairnessAnalytics from "./pages/FairnessAnalytics"
import PrivacyGuardian from "./pages/PrivacyGuardian"
import ResultsDashboard from "./pages/ResultsDashboard"
import AdTargetingCompliance from "./pages/AdTargetingCompliance"
import VariantCheck from "./pages/VariantCheck"
import DataExport from "./pages/DataExport"

// Built-in Toast System (No external dependencies)
const ToastContext = createContext()

const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, toast])
    
    setTimeout(() => {
      removeToast(id)
    }, duration)
    
    return id
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const toast = {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    info: (message, duration) => addToast(message, 'info', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
  }

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[60] space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            transition={{ duration: 0.2 }}
            className={`
              max-w-sm w-full bg-white dark:bg-gray-800 border rounded-xl shadow-lg p-4 flex items-center space-x-3
              ${toast.type === 'success' ? 'border-green-200 dark:border-green-800' :
                toast.type === 'error' ? 'border-red-200 dark:border-red-800' :
                toast.type === 'warning' ? 'border-yellow-200 dark:border-yellow-800' :
                'border-blue-200 dark:border-blue-800'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${toast.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                toast.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                toast.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                'bg-blue-100 dark:bg-blue-900/30'
              }
            `}>
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
              {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
              {toast.type === 'info' && <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            </div>
            
            <div className="flex-1">
              <p className={`
                text-sm font-medium
                ${toast.type === 'success' ? 'text-green-900 dark:text-green-300' :
                  toast.type === 'error' ? 'text-red-900 dark:text-red-300' :
                  toast.type === 'warning' ? 'text-yellow-900 dark:text-yellow-300' :
                  'text-blue-900 dark:text-blue-300'
                }
              `}>
                {toast.message}
              </p>
            </div>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Global App Context
const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}

// Enhanced sample data with complete metrics
const enhancedSampleData = [
  { 
    variant: "A", 
    trustScore: 82, 
    CTR: 3.2, 
    bias: 0.08, 
    compliance: 95,
    impressions: 125000,
    clicks: 4000,
    conversions: 320,
    revenue: 15600,
    gender_bias: 0.05,
    age_bias: 0.03,
    location_bias: 0.02,
    gdpr_compliant: true,
    ccpa_compliant: true,
    timestamp: "2025-07-07T21:41:43Z",
    fairness_score: 87,
    privacy_risk_score: 2,
    audience_segments: ["Gen Z Techies", "Urban Professionals"],
    campaign_name: "Summer Launch 2025",
    platform: "Google Ads",
    status: "active"
  },
  { 
    variant: "B", 
    trustScore: 74, 
    CTR: 2.6, 
    bias: 0.18, 
    compliance: 88,
    impressions: 118000,
    clicks: 3068,
    conversions: 245,
    revenue: 11270,
    gender_bias: 0.12,
    age_bias: 0.08,
    location_bias: 0.15,
    gdpr_compliant: true,
    ccpa_compliant: false,
    timestamp: "2025-07-07T21:41:43Z",
    fairness_score: 72,
    privacy_risk_score: 6,
    audience_segments: ["Eco Moms EU", "Digital Nomads"],
    campaign_name: "Brand Awareness Q3",
    platform: "Facebook Ads",
    status: "needs_review"
  },
  { 
    variant: "C", 
    trustScore: 90, 
    CTR: 3.9, 
    bias: 0.03, 
    compliance: 98,
    impressions: 132000,
    clicks: 5148,
    conversions: 463,
    revenue: 23150,
    gender_bias: 0.02,
    age_bias: 0.01,
    location_bias: 0.01,
    gdpr_compliant: true,
    ccpa_compliant: true,
    timestamp: "2025-07-07T21:41:43Z",
    fairness_score: 94,
    privacy_risk_score: 1,
    audience_segments: ["Gen Z Techies", "Urban Professionals", "Eco Moms EU"],
    campaign_name: "Product Demo Series",
    platform: "YouTube Ads",
    status: "optimized"
  }
]

// App Layout Component - FIXED SIDEBAR RESPONSIVENESS
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { state } = useApp()

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('trust-engine-sidebar')
        const menuButton = document.getElementById('mobile-menu-button')
        
        if (sidebar && !sidebar.contains(event.target) && 
            menuButton && !menuButton.contains(event.target)) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sidebarOpen])

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [window.location.pathname])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  return (
    <div className={`flex h-screen ${state.darkMode ? 'dark' : ''} overflow-hidden relative`}>
      <TrustEngineSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <TrustEngineHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

// FIXED Enhanced Sidebar Component with proper mobile behavior
const TrustEngineSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  const { state } = useApp()
  
  const navigation = [
    {
      category: "Analytics",
      items: [
        { name: "Dashboard", href: "/", icon: Layout, color: "text-blue-600", badge: null },
        { name: "Results", href: "/results", icon: BarChart3, color: "text-green-600", badge: "new" },
        { name: "Campaign Setup", href: "/campaign-setup", icon: Target, color: "text-purple-600", badge: null }
      ]
    },
    {
      category: "AI & Testing", 
      items: [
        { name: "Bias Detection", href: "/bias-detection", icon: Shield, color: "text-red-600", badge: "2" },
        { name: "Explainable AI", href: "/explainable-ai", icon: Brain, color: "text-indigo-600", badge: null },
        { name: "Fairness Analytics", href: "/fairness-analytics", icon: CheckCircle, color: "text-emerald-600", badge: null },
        { name: "A/B Testing", href: "/ab-testing", icon: Activity, color: "text-orange-600", badge: null }
      ]
    },
    {
      category: "Privacy & Compliance",
      items: [
        { name: "Privacy Guardian", href: "/privacy-guardian", icon: Lock, color: "text-cyan-600", badge: null },
        { name: "Ad Targeting", href: "/ad-targeting", icon: Eye, color: "text-pink-600", badge: null },
        { name: "Variant Check", href: "/variant-check", icon: UserCheck, color: "text-teal-600", badge: null }
      ]
    },
    {
      category: "Data & Insights",
      items: [
        { name: "Persona Generator", href: "/persona-generator", icon: Users, color: "text-violet-600", badge: null },
        { name: "Data Export", href: "/data-export", icon: Download, color: "text-amber-600", badge: null }
      ]
    }
  ]

  const handleLinkClick = () => {
    // Always close sidebar on mobile when clicking a link
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Enhanced Mobile backdrop with proper z-index */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            style={{ zIndex: 40 }}
          />
        )}
      </AnimatePresence>
      
      {/* Enhanced Sidebar with improved mobile behavior */}
      <div
        id="trust-engine-sidebar"
        className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          lg:translate-x-0 lg:static lg:inset-0 lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ zIndex: 50 }}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Logo Section with proper close button */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-lg">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                <span className="text-blue-600 font-bold text-lg">TE</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Trust Engine</h1>
                <p className="text-xs text-blue-100">v3.0.0 • Ajith</p>
              </div>
            </motion.div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-white hover:text-blue-200 transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Enhanced Navigation with improved animations */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {navigation.map((section, sectionIndex) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  {section.category}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.href
                    const Icon = item.icon
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={handleLinkClick}
                        className={`group relative flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 shadow-sm"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? item.color : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className={`ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                            item.badge === "new" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="activeDot"
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </nav>

          {/* Enhanced Footer with system status */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏆</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Team Halo</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ajith</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>API Status</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${state.apiConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                  <span>{state.apiConnected ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Version</span>
                <span>3.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated</span>
                <span>2025-07-07</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Enhanced Header Component with improved mobile menu button
const TrustEngineHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { state, actions } = useApp()
  const { toast } = useToast()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  
  const getPageTitle = () => {
    const pathMap = {
      '/': 'Dashboard Overview',
      '/bias-detection': 'Bias Detection',
      '/ab-testing': 'A/B Testing',
      '/persona-generator': 'Persona Generator',
      '/campaign-setup': 'Campaign Setup',
      '/explainable-ai': 'Explainable AI',
      '/fairness-analytics': 'Fairness Analytics', 
      '/privacy-guardian': 'Privacy Guardian',
      '/results': 'Results Dashboard',
      '/ad-targeting': 'Ad Targeting Compliance',
      '/variant-check': 'Variant Check',
      '/data-export': 'Data Export'
    }
    return pathMap[location.pathname] || 'Trust Engine'
  }

  const notifications = [
    { id: 1, type: "alert", message: "Bias detected in Variant B", time: "2 min ago" },
    { id: 2, type: "success", message: "Campaign C optimized successfully", time: "1 hour ago" },
    { id: 3, type: "info", message: "New personas generated", time: "3 hours ago" }
  ]
  
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left section with improved mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            id="mobile-menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={sidebarOpen}
          >
            <motion.div
              animate={{ rotate: sidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.h1 
              key={location.pathname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              {getPageTitle()}
            </motion.h1>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Privacy-First Marketing Analytics
            </span>
          </div>

          {/* Mobile page title */}
          <div className="md:hidden">
            <motion.h1 
              key={location.pathname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-semibold text-gray-900 dark:text-white truncate"
            >
              {getPageTitle().split(' ')[0]}
            </motion.h1>
          </div>
        </div>

        {/* Center section - Enhanced Search (hidden on mobile) */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search campaigns, variants, personas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right section with responsive design */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Enhanced API Status - hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              state.apiConnected ? "bg-green-400" : "bg-red-400"
            }`} />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {state.apiConnected ? "API" : "Offline"}
            </span>
          </div>

          {/* Current Time - hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
            <Calendar className="w-3 h-3" />
            <span>21:41:43</span>
          </div>

          {/* Enhanced Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'alert' ? 'bg-red-400' :
                            notification.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={actions.toggleDarkMode}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <AnimatePresence mode="wait">
              {state.darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Quick Actions - hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Dashboard refreshed!')}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </motion.button>
          </div>

          {/* Enhanced User menu - simplified on mobile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-medium text-sm">C</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Ajith</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Team Halo</p>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  )
}

// Enhanced Main App Component
function App() {
  const [state, setState] = useState({
    // User information
    user: { 
      name: "Ajith", 
      team: "Halo",
      email: "claude@teamhalo.com",
      lastLogin: "2025-07-07 21:41:43 UTC",
      preferences: {
        theme: "light",
        notifications: true,
        autoRefresh: true
      }
    },
    
    // System state
    loading: false,
    apiConnected: false,
    darkMode: false,
    sidebarCollapsed: false,
    
    // Enhanced data with all new features
    data: enhancedSampleData,
    campaigns: enhancedSampleData,
    personas: [],
    abTests: [],
    biasAnalyses: [],
    complianceReports: [],
    
    // Real-time metrics
    metrics: {
      totalCampaigns: 15,
      activeCampaigns: 8,
      biasChecks: 89,
      abTests: 12,
      personas: 2150,
      complianceScore: 94.2,
      apiCallsToday: 1247,
      uptime: "99.97%",
      totalImpressions: 1090000,
      totalRevenue: 98200,
      averageCTR: 3.3,
      averageTrustScore: 85.3
    }
  })

  const actions = {
    // Basic state actions
    setLoading: (loading) => setState(prev => ({ ...prev, loading })),
    setApiConnected: (connected) => setState(prev => ({ ...prev, apiConnected: connected })),
    
    // Theme actions with localStorage persistence
    toggleDarkMode: () => {
      setState(prev => {
        const newDarkMode = !prev.darkMode
        localStorage.setItem('trustEngine_darkMode', JSON.stringify(newDarkMode))
        document.documentElement.classList.toggle("dark", newDarkMode)
        return { ...prev, darkMode: newDarkMode }
      })
    },
    
    // Data actions
    setData: (data) => setState(prev => ({ ...prev, data, campaigns: data })),
    setCampaigns: (campaigns) => setState(prev => ({ ...prev, campaigns })),
    setPersonas: (personas) => setState(prev => ({ ...prev, personas })),
    setAbTests: (abTests) => setState(prev => ({ ...prev, abTests })),
  }

  // Enhanced API connection check
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/health")
        if (response.ok) {
          actions.setApiConnected(true)
        }
      } catch (error) {
        console.log("API not connected:", error)
        actions.setApiConnected(false)
      }
    }
    
    checkApiConnection()
    const interval = setInterval(checkApiConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  // Initialize theme from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('trustEngine_darkMode')
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode)
      setState(prev => ({ ...prev, darkMode: isDark }))
      document.documentElement.classList.toggle("dark", isDark)
    }
  }, [])

  return (
    <ToastProvider>
      <AppContext.Provider value={{ state, actions }}>
        <Router>
          <div className={`min-h-screen ${state.darkMode ? "dark" : ""}`}>
            <AppLayout>
              <Routes>
                {/* Core Features */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/results" element={<ResultsDashboard />} />
                <Route path="/campaign-setup" element={<CampaignSetup />} />
                
                {/* AI & Analysis */}
                <Route path="/bias-detection" element={<BiasDetection />} />
                <Route path="/explainable-ai" element={<ExplainableAI />} />
                <Route path="/fairness-analytics" element={<FairnessAnalytics />} />
                <Route path="/ab-testing" element={<ABTestSimulator />} />
                
                {/* Privacy & Compliance */}
                <Route path="/privacy-guardian" element={<PrivacyGuardian />} />
                <Route path="/ad-targeting" element={<AdTargetingCompliance />} />
                <Route path="/variant-check" element={<VariantCheck />} />
                
                {/* Data & Insights */}
                <Route path="/persona-generator" element={<PersonaGenerator />} />
                <Route path="/data-export" element={<DataExport />} />
                
                {/* 404 fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
            
            {/* Enhanced Global Loading Overlay */}
            <AnimatePresence>
              {state.loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]"
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center space-y-4 shadow-2xl"
                  >
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-gray-900 dark:text-white font-medium">Loading Trust Engine...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Initializing analytics dashboard</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Enhanced Status Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 z-30">
              <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Trust Engine v3.0.0</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Team Halo</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-medium">Ajith</span>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline">2025-07-07 21:41:43 UTC</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="hidden sm:inline">API:</span>
                    <span className={state.apiConnected ? 'text-green-600' : 'text-red-600'}>
                      {state.apiConnected ? '✅' : '❌'}
                      <span className="hidden sm:inline ml-1">{state.apiConnected ? 'Online' : 'Offline'}</span>
                    </span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Compliance: {state.metrics.complianceScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    </ToastProvider>
  )
}

export default App