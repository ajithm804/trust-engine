import React, { useState, useMemo, useEffect, useCallback } from "react"
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList, ComposedChart
} from "recharts"
import { useApp } from "../App"
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, Users, Target, 
  DollarSign, Filter, Download, Calendar, ChevronDown, MoreHorizontal,
  Play, Pause, Settings, RefreshCw, Search, Bell, Zap, Shield, Brain,
  Lock, Globe, Activity, FileText, Plus, ArrowRight, Maximize2, X,
  Share2, BarChart3, MousePointer, Clock, Smartphone, Monitor, Tablet,
  Wifi, WifiOff, Loader
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"
import jsPDF from "jspdf"
import { saveAs } from "file-saver"

// Enhanced Dynamic Data Service with Gemini AI Integration
class EnhancedDynamicDataService {
  constructor() {
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || null
    this.isOnline = navigator.onLine
    this.lastUpdate = null
    this.updateQueue = []
    this.isUpdating = false
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true
      console.log('🌐 Enhanced Data Service: Online - Gemini AI Active')
      this.processUpdateQueue()
    })
    
    window.addEventListener('offline', () => {
      this.isOnline = false
      console.log('📴 Enhanced Data Service: Offline - Intelligent Mock Mode')
    })
  }

  async generateDynamicMetrics(currentData, timeframe = '24h') {
    const timestamp = new Date().toISOString()
    
    if (!this.isOnline || !this.apiKey) {
      console.log('🔄 Using enhanced intelligent mock data generation')
      return this.generateAdvancedMockData(currentData, timestamp)
    }

    try {
      const prompt = this.createAdvancedMetricsPrompt(currentData, timeframe, timestamp)
      const response = await this.callGeminiAPI(prompt)
      
      if (response && response.candidates && response.candidates[0]) {
        const generatedData = this.parseGeminiResponse(response.candidates[0].content.parts[0].text)
        this.lastUpdate = timestamp
        return this.enhanceWithRealTimeVariations(generatedData, timestamp)
      }
    } catch (error) {
      console.error('❌ Gemini API Error:', error)
      return this.generateAdvancedMockData(currentData, timestamp)
    }
    
    return this.generateAdvancedMockData(currentData, timestamp)
  }

  createAdvancedMetricsPrompt(currentData, timeframe, timestamp) {
    const currentHour = new Date().getHours()
    const dayOfWeek = new Date().getDay()
    
    return `Generate realistic marketing analytics data for Trust Engine dashboard.
Current context:
- Time: ${timestamp}
- Hour: ${currentHour} (business hours: ${currentHour >= 9 && currentHour <= 17})
- Day: ${dayOfWeek} (weekend: ${dayOfWeek === 0 || dayOfWeek === 6})
- Timeframe: ${timeframe}

Generate 3 campaign variants (A, B, C) with dynamic variations.

Return ONLY valid JSON array:
[
  {
    "variant": "A",
    "trustScore": number,
    "CTR": number,
    "bias": number,
    "compliance": number,
    "impressions": number,
    "clicks": number,
    "conversions": number,
    "revenue": number,
    "gender_bias": number,
    "age_bias": number,
    "location_bias": number,
    "gdpr_compliant": boolean,
    "ccpa_compliant": boolean,
    "timestamp": "${timestamp}",
    "fairness_score": number,
    "privacy_risk_score": number,
    "audience_segments": array,
    "campaign_name": string,
    "platform": string,
    "status": string,
    "device_breakdown": {"mobile": number, "desktop": number, "tablet": number},
    "geographic_performance": {"us": number, "eu": number, "apac": number},
    "optimization_score": number,
    "predicted_performance": number,
    "anomaly_detected": boolean,
    "quality_score": number
  }
]`
  }

  async callGeminiAPI(prompt) {
    const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status}`)
    }

    return await response.json()
  }

  parseGeminiResponse(text) {
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      throw new Error('No valid JSON found in response')
    } catch (error) {
      console.error('❌ Failed to parse Gemini response:', error)
      return null
    }
  }

  generateAdvancedMockData(currentData, timestamp) {
    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.getDay()
    const isBusinessHours = hour >= 9 && hour <= 17
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    const timeMultiplier = isBusinessHours ? (1.2 + Math.sin(hour / 24 * Math.PI * 2) * 0.3) : 0.8
    const weekendMultiplier = isWeekend ? 0.7 : 1.1
    const combinedMultiplier = timeMultiplier * weekendMultiplier
    
    const marketConditions = Math.sin(Date.now() / 10000000) * 0.2 + 1
    const seasonalTrend = Math.cos(now.getMonth() / 12 * Math.PI * 2) * 0.15 + 1
    
    const platforms = ['Google Ads', 'Facebook Ads', 'YouTube Ads', 'LinkedIn Ads', 'TikTok Ads']
    const campaignNames = [
      'Q4 Brand Awareness', 'Product Launch 2025', 'Holiday Campaign',
      'Spring Collection', 'Tech Demo Series', 'Customer Retention',
      'Mobile First Initiative', 'Video Creative Test', 'AI-Powered Targeting'
    ]
    
    const audienceSegments = [
      ['Gen Z Techies', 'Urban Professionals', 'Early Adopters'],
      ['Eco Moms EU', 'Digital Nomads', 'Health Conscious'],
      ['Enterprise Decision Makers', 'SMB Owners', 'Startup Founders'],
      ['Fashion Enthusiasts', 'Lifestyle Bloggers', 'Influencers']
    ]

    return ['A', 'B', 'C'].map((variant, index) => {
      const baseImpressions = Math.floor(
        (120000 + Math.random() * 80000) * 
        combinedMultiplier * 
        marketConditions * 
        seasonalTrend *
        (1 + index * 0.1)
      )
      
      const baseCTR = (
        2.1 + 
        Math.random() * 2.4 + 
        (index * 0.3) +
        (isBusinessHours ? 0.3 : -0.2) +
        (Math.sin(hour / 24 * Math.PI * 2) * 0.4)
      ) * combinedMultiplier

      const clicks = Math.floor(baseImpressions * (baseCTR / 100))
      const conversionRate = (0.08 + Math.random() * 0.12) * (1 + index * 0.05)
      const conversions = Math.floor(clicks * conversionRate)
      const avgOrderValue = 45 + Math.random() * 35 + (index * 10)
      const revenue = Math.floor(conversions * avgOrderValue * seasonalTrend)
      
      const baseTrustScore = 75 + Math.random() * 20 + (index * 3)
      const trustScore = Math.max(70, Math.min(95, 
        Math.floor(baseTrustScore + Math.sin(Date.now() / 1000000) * 5)
      ))
      
      const timeBiasAdjustment = isBusinessHours ? -0.02 : 0.01
      const genderBias = Math.max(0.01, Math.min(0.25, 
        (Math.random() * 0.15) + timeBiasAdjustment + (index * 0.02)
      ))
      
      const mobileShare = 60 + Math.random() * 25 + (isWeekend ? 10 : 0)
      const desktopShare = Math.min(35, 100 - mobileShare - 5)
      const tabletShare = 100 - mobileShare - desktopShare
      
      const usPerformance = 40 + Math.random() * 20
      const euPerformance = 35 + Math.random() * 15
      const apacPerformance = 100 - usPerformance - euPerformance
      
      const qualityScore = Math.floor(70 + Math.random() * 30)
      const optimizationScore = Math.floor(trustScore * 0.8 + Math.random() * 20)
      const anomalyDetected = Math.random() < 0.1
      const predictedPerformance = Math.floor(
        (baseCTR * 1.05 + Math.random() * 0.5 - 0.25) * 100
      ) / 100

      return {
        variant,
        trustScore,
        CTR: parseFloat(baseCTR.toFixed(1)),
        bias: parseFloat((genderBias * 0.7 + Math.random() * 0.05).toFixed(3)),
        compliance: Math.floor(88 + Math.random() * 10 + (trustScore > 85 ? 2 : 0)),
        impressions: baseImpressions,
        clicks,
        conversions,
        revenue,
        gender_bias: parseFloat(genderBias.toFixed(3)),
        age_bias: parseFloat((Math.random() * 0.12).toFixed(3)),
        location_bias: parseFloat((Math.random() * 0.10).toFixed(3)),
        gdpr_compliant: Math.random() > 0.15,
        ccpa_compliant: Math.random() > 0.20,
        timestamp,
        fairness_score: Math.floor(75 + Math.random() * 20),
        privacy_risk_score: Math.floor(1 + Math.random() * 7),
        audience_segments: audienceSegments[index] || audienceSegments[0],
        campaign_name: campaignNames[Math.floor(Math.random() * campaignNames.length)],
        platform: platforms[index % platforms.length],
        status: ['active', 'optimized', 'needs_review', 'paused'][Math.floor(Math.random() * 4)],
        device_breakdown: {
          mobile: Math.round(mobileShare),
          desktop: Math.round(desktopShare),
          tablet: Math.round(tabletShare)
        },
        geographic_performance: {
          us: Math.round(usPerformance),
          eu: Math.round(euPerformance),
          apac: Math.round(apacPerformance)
        },
        optimization_score: optimizationScore,
        predicted_performance: predictedPerformance,
        anomaly_detected: anomalyDetected,
        quality_score: qualityScore
      }
    })
  }

  generateAdvancedTimeSeriesData(days = 7, currentTimestamp) {
    const data = []
    const now = new Date(currentTimestamp)
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const multiplier = isWeekend ? 0.7 : 1.0
      
      const dailyTrend = Math.sin(i / days * Math.PI) * 0.3 + 1
      const marketNoise = (Math.random() - 0.5) * 0.4 + 1
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        variantA: parseFloat((2.8 + Math.random() * 1.0) * multiplier * dailyTrend).toFixed(1),
        variantB: parseFloat((2.2 + Math.random() * 1.0) * multiplier * dailyTrend).toFixed(1),
        variantC: parseFloat((3.5 + Math.random() * 1.0) * multiplier * dailyTrend).toFixed(1),
        trustA: Math.floor((78 + Math.random() * 10) * multiplier),
        trustB: Math.floor((70 + Math.random() * 10) * multiplier),
        trustC: Math.floor((85 + Math.random() * 10) * multiplier),
        impressions: Math.floor((140000 + Math.random() * 40000) * multiplier * marketNoise),
        revenue: Math.floor((12000 + Math.random() * 8000) * multiplier * dailyTrend),
        clicks: Math.floor((4800 + Math.random() * 1600) * multiplier),
        conversions: Math.floor((380 + Math.random() * 200) * multiplier),
        qualityScore: Math.floor(75 + Math.random() * 20),
        competitorIndex: parseFloat((0.8 + Math.random() * 0.4).toFixed(2)),
        marketSentiment: parseFloat((0.5 + Math.random() * 0.5).toFixed(2))
      })
    }
    
    return data
  }

  async processUpdateQueue() {
    if (this.isUpdating || this.updateQueue.length === 0) return
    
    this.isUpdating = true
    try {
      for (const update of this.updateQueue) {
        await update()
      }
      this.updateQueue = []
    } catch (error) {
      console.error('❌ Error processing update queue:', error)
    } finally {
      this.isUpdating = false
    }
  }

  queueUpdate(updateFunction) {
    this.updateQueue.push(updateFunction)
    if (this.isOnline) {
      this.processUpdateQueue()
    }
  }

  generateInsights(data, selectedMetric) {
    const insights = {
      ctr: [
        "Variant C consistently outperforms with 18% higher CTR",
        "Mobile traffic shows 23% better engagement",
        "Business hours see 34% CTR improvement",
        "AI recommends 60% budget shift to Variant C"
      ],
      trust: [
        "Trust scores correlate with 15% conversion uplift",
        "GDPR compliance improves trust by 12 points",
        "Variant B needs immediate bias review",
        "Weekend trust scores drop 8% on average"
      ],
      revenue: [
        "Revenue per visitor increased 23% this week",
        "Geographic expansion to APAC shows promise",
        "Predicted 15% growth next quarter",
        "ROI optimization suggests platform reallocation"
      ]
    }
    
    return insights[selectedMetric] || insights.ctr
  }
}

// Initialize Enhanced Dynamic Data Service
const enhancedDataService = new EnhancedDynamicDataService()

// Enhanced Custom Tooltip with real-time data annotations
const CustomTooltip = ({ active, payload, label, dark }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className={`rounded-xl border backdrop-blur-md p-4 shadow-2xl max-w-xs ${
          dark 
            ? "bg-gray-900/95 border-gray-600 text-white" 
            : "bg-white/95 border-gray-200 text-gray-900"
        }`}
      >
        <p className="font-semibold mb-3 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600 pb-2">
          {label}
        </p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm border border-white/20" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{entry.name}</span>
              </div>
              <span className="text-sm font-bold tabular-nums" style={{ color: entry.color }}>
                {typeof entry.value === "number" ? 
                  (entry.name.includes('$') || entry.dataKey === 'revenue' ? 
                    `$${entry.value.toLocaleString()}` : 
                    entry.value.toLocaleString()
                  ) : entry.value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Updated: {new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' })} UTC
          </p>
          <div className="flex items-center space-x-1 mt-1">
            {navigator.onLine ? (
              <>
                <Wifi className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400">
                  {enhancedDataService.apiKey ? 'Gemini AI' : 'Mock Data'}
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-orange-600 dark:text-orange-400">Offline Mode</span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    )
  }
  return null
}

// Enhanced Real-time Status Indicator

const RealTimeStatusIndicator = ({ isUpdating, lastUpdate, hasAnomalies, dataSource }) => {
  const [apiStatus, setApiStatus] = useState('checking')
  
  useEffect(() => {
    const checkAPIStatus = async () => {
      try {
        // Try to reach your backend API (when it exists)
        const response = await fetch('/api/health', { 
          method: 'GET',
          timeout: 2000 
        })
        if (response.ok) {
          setApiStatus('online')
        } else {
          setApiStatus('offline')
        }
      } catch (error) {
        // API is not available - this is expected since we haven't set up backend yet
        setApiStatus('frontend-only')
      }
    }
    
    checkAPIStatus()
    const interval = setInterval(checkAPIStatus, 30000) // Check every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const getStatusInfo = () => {
    switch (apiStatus) {
      case 'online':
        return { 
          color: 'bg-green-500', 
          text: 'API Online', 
          description: 'Backend Connected' 
        }
      case 'offline':
        return { 
          color: 'bg-red-500', 
          text: 'API Offline', 
          description: 'Backend Unavailable' 
        }
      case 'frontend-only':
        return { 
          color: 'bg-blue-500', 
          text: 'Frontend Mode', 
          description: 'Enhanced Mock Data' 
        }
      default:
        return { 
          color: 'bg-yellow-500', 
          text: 'Checking...', 
          description: 'Status Unknown' 
        }
    }
  }

  const status = getStatusInfo()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg backdrop-blur-sm z-40"
    >
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isUpdating ? 'bg-blue-500 animate-pulse' : `${status.color} ${apiStatus === 'frontend-only' ? 'animate-pulse' : ''}`
            }`} />
            <span className="text-xs font-medium text-gray-900 dark:text-white">
              {isUpdating ? 'Updating...' : status.text}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {lastUpdate ? new Date(lastUpdate).toLocaleTimeString('en-US', { 
              timeZone: 'UTC',
              hour12: false 
            }) : '23:00:54'} UTC
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Brain className="w-3 h-3 text-purple-500" />
          <span className="text-xs text-purple-600 dark:text-purple-400">
            {status.description}
          </span>
        </div>
        
        {hasAnomalies && (
          <div className="flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span className="text-xs text-red-600 dark:text-red-400">
              Anomalies Detected
            </span>
          </div>
        )}
        
        {apiStatus === 'frontend-only' && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
              ✨ Frontend Demo Mode
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              All features working with enhanced mock data
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Enhanced Premium Metric Card with advanced features
const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend, 
  color = "blue", 
  subtitle, 
  chart, 
  alert,
  onClick,
  exportData,
  detailsModal = false,
  isUpdating = false,
  lastUpdate,
  anomalyDetected = false,
  predictedValue = null
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const isPositive = trend === "up"
  
  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-950/40 dark:via-blue-900/30 dark:to-blue-950/40",
      icon: "text-blue-600 dark:text-blue-400",
      accent: "bg-gradient-to-r from-blue-500 to-blue-600",
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:border-blue-300 dark:hover:border-blue-600"
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-50 dark:from-emerald-950/40 dark:via-emerald-900/30 dark:to-emerald-950/40",
      icon: "text-emerald-600 dark:text-emerald-400",
      accent: "bg-gradient-to-r from-emerald-500 to-green-600",
      border: "border-emerald-200 dark:border-emerald-800",
      hover: "hover:border-emerald-300 dark:hover:border-emerald-600"
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 via-violet-100 to-purple-50 dark:from-purple-950/40 dark:via-purple-900/30 dark:to-purple-950/40",
      icon: "text-purple-600 dark:text-purple-400",
      accent: "bg-gradient-to-r from-purple-500 to-violet-600",
      border: "border-purple-200 dark:border-purple-800",
      hover: "hover:border-purple-300 dark:hover:border-purple-600"
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 via-amber-100 to-orange-50 dark:from-orange-950/40 dark:via-orange-900/30 dark:to-orange-950/40",
      icon: "text-orange-600 dark:text-orange-400",
      accent: "bg-gradient-to-r from-orange-500 to-amber-600",
      border: "border-orange-200 dark:border-orange-800",
      hover: "hover:border-orange-300 dark:hover:border-orange-600"
    },
  }

  const handleExport = () => {
    if (exportData) {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Metric,Value,Change,Trend,Timestamp,Predicted,Anomaly\n" +
        `${title},${value},${change}%,${trend},${lastUpdate || new Date().toISOString()},${predictedValue || 'N/A'},${anomalyDetected}`
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `${title.replace(/\s/g, '_')}_export.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success(`${title} data exported successfully!`)
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={onClick}
        className={`group relative bg-white dark:bg-gray-800 rounded-2xl border ${colorClasses[color].border} ${colorClasses[color].hover} p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
          isUpdating ? 'ring-2 ring-blue-500/50 ring-opacity-75 animate-pulse' : ''
        } ${
          anomalyDetected ? 'ring-2 ring-red-500/50' : ''
        }`}
      >
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colorClasses[color].bg}`} />
        
        {/* Anomaly indicator */}
        {anomalyDetected && (
          <div className="absolute top-2 left-2">
            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
        )}
        
        {/* Real-time update indicator */}
        {isUpdating && (
          <div className="absolute top-2 right-2">
            <Loader className="w-4 h-4 text-blue-500 animate-spin" />
          </div>
        )}
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-xl ${colorClasses[color].bg} ring-1 ring-white/20 shadow-sm`}>
                <Icon className={`w-6 h-6 ${colorClasses[color].icon}`} />
              </div>
              <div className={`w-1 h-8 rounded-full ${colorClasses[color].accent} opacity-80`} />
              {alert && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
              )}
            </div>
            
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 tracking-wide">{title}</p>
            <motion.p 
              key={value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-1 tabular-nums"
            >
              {value}
            </motion.p>
            
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
            
            {change !== undefined && (
              <div className="flex items-center mt-4 space-x-2">
                <motion.div 
                  key={change}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    isPositive 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(change)}%</span>
                </motion.div>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last period</span>
              </div>
            )}
            
            {predictedValue && (
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                Predicted: {predictedValue}
              </div>
            )}
            
            {lastUpdate && (
              <div className="mt-2 flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                <span>Updated: {new Date(lastUpdate).toLocaleTimeString('en-US', { 
                  timeZone: 'UTC', 
                  hour12: false 
                })} UTC</span>
                {navigator.onLine && (
                  <span className="text-purple-600 dark:text-purple-400">
                    • {enhancedDataService.apiKey ? 'Gemini AI' : 'Enhanced Mock'}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {chart && (
            <div className="w-20 h-16 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              {chart}
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
          {detailsModal && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(true)
              }}
              className="p-1.5 bg-white/80 dark:bg-gray-700/80 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <Maximize2 className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleExport()
            }}
            className="p-1.5 bg-white/80 dark:bg-gray-700/80 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title} Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
                  <div className="text-gray-500 dark:text-gray-400">{subtitle}</div>
                  {predictedValue && (
                    <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                      Next period prediction: {predictedValue}
                    </div>
                  )}
                  {lastUpdate && (
                    <div className="text-xs text-gray-400 mt-2">
                      Last updated: {new Date(lastUpdate).toLocaleString('en-US', { timeZone: 'UTC' })} UTC
                    </div>
                  )}
                </div>
                {chart && (
                  <div className="h-32">
                    {chart}
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleExport}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Export Real-time Data
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Enhanced Campaign Overview Component
const CampaignOverview = ({ data, onCampaignClick }) => {
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  
  const totalCampaigns = data.length
  const activeCampaigns = data.filter(d => d.trustScore > 80).length
  const pendingCampaigns = Math.floor(totalCampaigns * 0.3)
  const cancelledCampaigns = Math.floor(totalCampaigns * 0.1)
  const successRate = Math.round((activeCampaigns / totalCampaigns) * 100)

  const platforms = [
    { name: "Google", color: "#4285f4", campaigns: Math.floor(totalCampaigns * 0.4), active: true },
    { name: "Facebook", color: "#1877f2", campaigns: Math.floor(totalCampaigns * 0.35), active: true },
    { name: "YouTube", color: "#ff0000", campaigns: Math.floor(totalCampaigns * 0.25), active: false }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Campaign Status</h3>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-xs text-gray-500">Updated</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-gray-900 dark:text-white mb-2 tabular-nums"
        >
          {totalCampaigns}
        </motion.div>
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Campaigns</div>
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Updated: 2025-07-07 22:52:15 UTC
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center mb-6">
        {[
          { label: "Active", value: activeCampaigns, color: "green", icon: CheckCircle },
          { label: "Pending", value: pendingCampaigns, color: "yellow", icon: Clock },
          { label: "Paused", value: cancelledCampaigns, color: "red", icon: Pause },
          { label: "Success Rate", value: `${successRate}%`, color: "blue", icon: Target }
        ].map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg cursor-pointer hover:shadow-md transition-all ${
              stat.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' :
              stat.color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30' :
              stat.color === 'red' ? 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' :
              'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
            }`}
            onClick={() => onCampaignClick && onCampaignClick(stat.label.toLowerCase())}
          >
            <div className="flex items-center justify-center mb-2">
              <stat.icon className={`w-4 h-4 ${
                stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
                'text-blue-600 dark:text-blue-400'
              }`} />
            </div>
            <div className={`text-lg font-bold ${
              stat.color === 'green' ? 'text-green-700 dark:text-green-400' :
              stat.color === 'yellow' ? 'text-yellow-700 dark:text-yellow-400' :
              stat.color === 'red' ? 'text-red-700 dark:text-red-400' :
              'text-blue-700 dark:text-blue-400'
            } tabular-nums`}>{stat.value}</div>
            <div className={`text-xs ${
              stat.color === 'green' ? 'text-green-600 dark:text-green-500' :
              stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-500' :
              stat.color === 'red' ? 'text-red-600 dark:text-red-500' :
              'text-blue-600 dark:text-blue-500'
            }`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform Distribution</div>
          <button 
            onClick={() => toast.success("Platform analytics opened!")}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            View Details
          </button>
        </div>
        {platforms.map((platform, index) => (
          <motion.div 
            key={platform.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => setSelectedPlatform(platform.name)}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm" 
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{platform.name}</span>
              </div>
              {platform.active && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Live
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
                {platform.campaigns}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Enhanced Marketing Funnel Component
const MarketingFunnel = ({ data, onStageClick }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  
  const funnelData = [
    { 
      name: "Impressions", 
      value: 1000000, 
      fill: "#3b82f6", 
      percentage: 100,
      dropOff: 0,
      cost: 2.5,
      conversionRate: 100,
      devices: { mobile: 65, desktop: 25, tablet: 10 }
    },
    { 
      name: "Clicks", 
      value: 35000, 
      fill: "#8b5cf6", 
      percentage: 3.5,
      dropOff: 96.5,
      cost: 0.71,
      conversionRate: 3.5,
      devices: { mobile: 70, desktop: 22, tablet: 8 }
    },
    { 
      name: "Leads", 
      value: 5250, 
      fill: "#10b981", 
      percentage: 15,
      dropOff: 85,
      cost: 4.76,
      conversionRate: 15,
      devices: { mobile: 60, desktop: 30, tablet: 10 }
    },
    { 
      name: "Conversions", 
      value: 1050, 
      fill: "#f59e0b", 
      percentage: 20,
      dropOff: 80,
      cost: 23.81,
      conversionRate: 20,
      devices: { mobile: 55, desktop: 35, tablet: 10 }
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Marketing Funnel Analysis</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="text-xs bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-300"
          >
            <option value="1d">24h</option>
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
          </select>
          <button 
            onClick={() => toast.success("Funnel analysis exported!")}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {funnelData.map((item, index) => (
          <motion.div 
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm" 
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                {item.devices && (
                  <div className="flex items-center space-x-1 ml-2">
                    <Smartphone className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{item.devices.mobile}%</span>
                    <Monitor className="w-3 h-3 text-gray-400 ml-1" />
                    <span className="text-xs text-gray-500">{item.devices.desktop}%</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
                  {item.value.toLocaleString()}
                </span>
                {index > 0 && (
                  <span className="text-xs text-red-500 font-medium">
                    -{item.dropOff}% drop
                  </span>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 cursor-pointer hover:h-5 transition-all"
                   onClick={() => onStageClick && onStageClick(item.name, item)}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - (index * 15)}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-full rounded-full shadow-sm transition-all duration-500 hover:shadow-md"
                  style={{ backgroundColor: item.fill }}
                />
              </div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <span className="text-xs font-medium text-white drop-shadow-sm">
                  {item.percentage}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Cost per {item.name.slice(0, -1)}: ${item.cost}</span>
              {item.conversionRate && (
                <span>Conv. Rate: {item.conversionRate}%</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Enhanced Audience Segmentation Component
const AudienceSegmentation = ({ onSegmentClick, onGeneratePersonas }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  
  const segmentData = [
    { 
      name: "Gen Z Techies", 
      value: 35, 
      fill: "#3b82f6", 
      growth: "+12%", 
      size: "450K",
      ctr: 4.2,
      engagement: 8.7,
      devices: { mobile: 85, desktop: 10, tablet: 5 },
      interests: ["AI", "Gaming", "Crypto"]
    },
    { 
      name: "Eco Moms EU", 
      value: 25, 
      fill: "#10b981", 
      growth: "+8%", 
      size: "320K",
      ctr: 3.8,
      engagement: 9.2,
      devices: { mobile: 60, desktop: 30, tablet: 10 },
      interests: ["Sustainability", "Family", "Health"]
    },
    { 
      name: "Urban Professionals", 
      value: 20, 
      fill: "#8b5cf6", 
      growth: "+15%", 
      size: "280K",
      ctr: 3.1,
      engagement: 7.5,
      devices: { mobile: 70, desktop: 25, tablet: 5 },
      interests: ["Career", "Finance", "Productivity"]
    },
    { 
      name: "Digital Nomads", 
      value: 20, 
      fill: "#f59e0b", 
      growth: "+5%", 
      size: "180K",
      ctr: 2.9,
      engagement: 6.8,
      devices: { mobile: 80, desktop: 15, tablet: 5 },
      interests: ["Travel", "Remote Work", "Lifestyle"]
    }
  ]

  const handleGeneratePersonas = async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("New synthetic personas generated!")
      onGeneratePersonas && onGeneratePersonas()
    } catch (error) {
      toast.error("Failed to generate personas")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Synthetic Audience Segments</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleGeneratePersonas}
            disabled={isGenerating}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Generate New</span>
              </>
            )}
          </button>
          <button 
            onClick={() => toast.success("Audience insights exported!")}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                onCellClick={(entry, index) => onSegmentClick && onSegmentClick(segmentData[index])}
              >
                {segmentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {segmentData.map((segment, index) => (
            <motion.div 
              key={segment.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-all cursor-pointer"
              onClick={() => onSegmentClick && onSegmentClick(segment)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: segment.fill }} />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{segment.name}</span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{segment.growth}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Size</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">{segment.size}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">CTR</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">{segment.ctr}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Engagement</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">{segment.engagement}/10</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {segment.interests.map((interest, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component with all dynamic features
const Dashboard = () => {
  const { state } = useApp()
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("ctr")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  // Enhanced dynamic state
  const [dynamicData, setDynamicData] = useState(state.data || [])
  const [timeSeriesData, setTimeSeriesData] = useState([])
  const [lastUpdate, setLastUpdate] = useState(new Date().toISOString())
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateInterval, setUpdateInterval] = useState(null)
  const [insights, setInsights] = useState([])
  const [anomalies, setAnomalies] = useState([])
  const [dataSource, setDataSource] = useState('Enhanced Mock Data')

  // Real-time data refresh with enhanced features
  const refreshData = useCallback(async () => {
    setIsUpdating(true)
    setIsRefreshing(true)
    
    try {
      console.log('🔄 Refreshing dashboard with enhanced dynamic data...')
      
      const newData = await enhancedDataService.generateDynamicMetrics(dynamicData, timeRange)
      const newTimeSeriesData = enhancedDataService.generateAdvancedTimeSeriesData(7, new Date().toISOString())
      const newInsights = enhancedDataService.generateInsights(newData, selectedMetric)
      const newAnomalies = newData.filter(variant => variant.anomaly_detected)
      
      const source = navigator.onLine ? 
        (enhancedDataService.apiKey ? 'Gemini AI' : 'Enhanced Mock Data') : 
        'Offline Mode'
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setDynamicData(newData)
      setTimeSeriesData(newTimeSeriesData)
      setInsights(newInsights)
      setAnomalies(newAnomalies)
      setDataSource(source)
      setLastUpdate(new Date().toISOString())
      
      console.log('✅ Enhanced dashboard data refreshed successfully')
      toast.success(`Dashboard updated with ${source}!`)
      
      if (newAnomalies.length > 0) {
        toast.warning(`${newAnomalies.length} anomal${newAnomalies.length === 1 ? 'y' : 'ies'} detected!`)
      }
      
    } catch (error) {
      console.error('❌ Error refreshing enhanced data:', error)
      toast.error('Failed to refresh data. Using fallback data.')
    } finally {
      setIsUpdating(false)
      setIsRefreshing(false)
    }
    }, [dynamicData, timeRange, selectedMetric])

  // Enhanced auto-refresh setup
  useEffect(() => {
    if (updateInterval) {
      clearInterval(updateInterval)
    }

    const refreshIntervalTime = navigator.onLine ? 
      (enhancedDataService.apiKey ? 25000 : 30000) : 
      60000
    
    const newInterval = setInterval(() => {
      if (!isRefreshing) {
        refreshData()
      }
    }, refreshIntervalTime)
    
    setUpdateInterval(newInterval)
    
    return () => {
      if (newInterval) {
        clearInterval(newInterval)
      }
    }
  }, [refreshData, isRefreshing])

  // Initial enhanced data load
  useEffect(() => {
    const initializeEnhancedData = async () => {
      const initialTimeSeriesData = enhancedDataService.generateAdvancedTimeSeriesData(7, new Date().toISOString())
      setTimeSeriesData(initialTimeSeriesData)
      
      if (dynamicData.length === 0) {
        await refreshData()
      } else {
        const initialInsights = enhancedDataService.generateInsights(dynamicData, selectedMetric)
        setInsights(initialInsights)
      }
    }
    
    initializeEnhancedData()
  }, [])

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Dashboard: Back online - switching to enhanced mode')
      setDataSource(enhancedDataService.apiKey ? 'Gemini AI' : 'Enhanced Mock Data')
      refreshData()
    }
    
    const handleOffline = () => {
      console.log('📴 Dashboard: Gone offline - using offline mode')
      setDataSource('Offline Mode')
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [refreshData])

  // Enhanced insights update when metric changes
  useEffect(() => {
    if (dynamicData.length > 0) {
      const newInsights = enhancedDataService.generateInsights(dynamicData, selectedMetric)
      setInsights(newInsights)
    }
  }, [selectedMetric, dynamicData])

  const miniChartData = timeSeriesData.slice(-4)

  // Enhanced metrics calculations with real-time data
  const totalImpressions = dynamicData.reduce((sum, day) => sum + (day.impressions || 0), 0)
  const totalClicks = dynamicData.reduce((sum, day) => sum + (day.clicks || 0), 0)
  const totalRevenue = dynamicData.reduce((sum, day) => sum + (day.revenue || 0), 0)
  const totalConversions = dynamicData.reduce((sum, day) => sum + (day.conversions || 0), 0)
  const averageCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0.0"
  const averageTrustScore = dynamicData.length > 0 ? 
    (dynamicData.reduce((sum, variant) => sum + (variant.trustScore || 0), 0) / dynamicData.length).toFixed(1) : "0.0"

  // Enhanced export functionality
  const handleExport = async (format) => {
    try {
      setShowExportModal(false)
      
      const exportData = {
        totalImpressions,
        totalClicks,
        totalRevenue,
        totalConversions,
        averageCTR,
        averageTrustScore,
        timeRange,
        user: 'Ajith',
        timestamp: lastUpdate,
        dataSource,
        insights,
        anomalies: anomalies.length,
        variants: dynamicData
      }
      
      if (format === 'pdf') {
        const pdf = new jsPDF()
        pdf.setFontSize(20)
        pdf.text('Trust Engine Enhanced Dashboard Report', 20, 30)
        pdf.setFontSize(12)
        pdf.text(`Generated: ${new Date(lastUpdate).toLocaleString('en-US', { timeZone: 'UTC' })} UTC`, 20, 50)
        pdf.text(`User: Ajith`, 20, 65)
        pdf.text(`Data Source: ${dataSource}`, 20, 80)
        pdf.text(`Time Range: ${timeRange}`, 20, 95)
        
        // Add enhanced metrics
        pdf.text('Enhanced Key Metrics:', 20, 115)
        pdf.text(`Total Impressions: ${totalImpressions.toLocaleString()}`, 30, 130)
        pdf.text(`Average CTR: ${averageCTR}%`, 30, 145)
        pdf.text(`Total Revenue: $${totalRevenue.toLocaleString()}`, 30, 160)
        pdf.text(`Trust Score: ${averageTrustScore}`, 30, 175)
        pdf.text(`Anomalies Detected: ${anomalies.length}`, 30, 190)
        
        // Add AI insights
        if (insights.length > 0) {
          pdf.text('AI Insights:', 20, 210)
          insights.slice(0, 3).forEach((insight, index) => {
            const wrappedText = pdf.splitTextToSize(`• ${insight}`, 160)
            pdf.text(wrappedText, 30, 225 + (index * 20))
          })
        }
        
        pdf.save('trust-engine-enhanced-dashboard.pdf')
        toast.success('Enhanced PDF report generated successfully!')
        
      } else if (format === 'csv') {
        const csvData = [
          ['Metric', 'Value', 'Timestamp', 'Data Source', 'Anomaly Count'],
          ['Total Impressions', totalImpressions, lastUpdate, dataSource, anomalies.length],
          ['Average CTR', `${averageCTR}%`, lastUpdate, dataSource, anomalies.length],
          ['Total Revenue', `$${totalRevenue}`, lastUpdate, dataSource, anomalies.length],
          ['Trust Score', averageTrustScore, lastUpdate, dataSource, anomalies.length],
          ['Total Conversions', totalConversions, lastUpdate, dataSource, anomalies.length],
          ['User', 'Ajith', lastUpdate, 'System', 0],
          ['Generated By', 'Trust Engine v3.0.0 Enhanced', lastUpdate, 'System', 0],
          [],
          ['Enhanced Variant Details', '', '', '', ''],
          ...dynamicData.map(variant => [
            `Variant ${variant.variant}`,
            `Trust: ${variant.trustScore}, CTR: ${variant.CTR}%, Revenue: $${variant.revenue}`,
            variant.timestamp,
            dataSource,
            variant.anomaly_detected ? 1 : 0
          ])
        ]
        
        const csvContent = csvData.map(row => row.join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        saveAs(blob, `trust-engine-enhanced-dashboard-${new Date().toISOString().split('T')[0]}.csv`)
        
        toast.success('Enhanced CSV data exported successfully!')
      }
    } catch (error) {
      console.error('Enhanced export failed:', error)
      toast.error('Export failed. Please try again.')
    }
  }

  const handleRefresh = async () => {
    await refreshData()
  }

  const handleCampaignClick = (status) => {
    toast.info(`Opening ${status} campaigns view...`)
  }

  const handleStageClick = (stage, data) => {
    toast.info(`Analyzing ${stage} stage performance...`)
  }

  const handleSegmentClick = (segment) => {
    toast.info(`Opening detailed analysis for ${segment.name}...`)
  }

  const handleGeneratePersonas = () => {
    toast.success("Redirecting to Enhanced Persona Generator...")
  }

  const COLORS = {
    primary: "#3b82f6",
    secondary: "#8b5cf6", 
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    gray: "#6b7280"
  }

  // Enhanced time series data with fallback
  const enhancedTimeSeriesData = useMemo(() => {
    if (timeSeriesData.length === 0) {
      return [
        { date: "Jul 1", variantA: 3.1, variantB: 2.4, variantC: 3.7, trustA: 80, trustB: 72, trustC: 88, impressions: 145000, revenue: 12500, clicks: 4640, conversions: 465 },
        { date: "Jul 2", variantA: 3.3, variantB: 2.7, variantC: 3.8, trustA: 81, trustB: 73, trustC: 89, impressions: 152000, revenue: 13200, clicks: 5016, conversions: 502 },
        { date: "Jul 3", variantA: 3.0, variantB: 2.5, variantC: 3.9, trustA: 82, trustB: 74, trustC: 90, impressions: 138000, revenue: 11800, clicks: 4554, conversions: 410 },
        { date: "Jul 4", variantA: 3.4, variantB: 2.8, variantC: 4.1, trustA: 83, trustB: 75, trustC: 91, impressions: 168000, revenue: 15600, clicks: 6048, conversions: 624 },
        { date: "Jul 5", variantA: 3.2, variantB: 2.6, variantC: 3.9, trustA: 82, trustB: 74, trustC: 90, impressions: 155000, revenue: 14100, clicks: 5270, conversions: 564 },
        { date: "Jul 6", variantA: 3.5, variantB: 2.9, variantC: 4.0, trustA: 84, trustB: 76, trustC: 92, impressions: 171000, revenue: 16200, clicks: 6327, conversions: 648 },
        { date: "Jul 7", variantA: 3.2, variantB: 2.6, variantC: 3.9, trustA: 82, trustB: 74, trustC: 90, impressions: 159000, revenue: 14800, clicks: 5563, conversions: 592 },
      ]
    }
    return timeSeriesData
  }, [timeSeriesData])

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Enhanced Header with dynamic status indicators */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Trust Engine Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Privacy-first marketing analytics with enhanced AI insights
          </p>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Last updated: {new Date(lastUpdate).toLocaleString('en-US', { timeZone: 'UTC' })} UTC</span>
            <span>•</span>
            <span>User: Ajith</span>
            <span>•</span>
            <span>Team: Halo</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              {navigator.onLine ? (
                <>
                  <Brain className="w-3 h-3 text-purple-500" />
                  <span className="text-purple-600">{dataSource}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-orange-500" />
                  <span className="text-orange-600">Offline Mode</span>
                </>
              )}
            </div>
            {anomalies.length > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                  <span className="text-red-600">{anomalies.length} Anomal{anomalies.length === 1 ? 'y' : 'ies'}</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-3 mt-4 lg:mt-0"
        >
          <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border-none outline-none"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border-none outline-none"
            >
              <option value="ctr">CTR Focus</option>
              <option value="trust">Trust Score</option>
              <option value="revenue">Revenue</option>
              <option value="all">All Metrics</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </motion.div>
      </div>

      {/* Enhanced Key Metrics Grid with real-time data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Impressions"
          value={`${(totalImpressions / 1000000).toFixed(1)}M`}
          change={12.5}
          trend="up"
          icon={Eye}
          color="blue"
          subtitle="Across all variants"
          detailsModal={true}
          exportData={true}
          isUpdating={isUpdating}
          lastUpdate={lastUpdate}
          anomalyDetected={anomalies.some(a => a.impressions > 200000)}
          predictedValue={`${((totalImpressions * 1.125) / 1000000).toFixed(1)}M`}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miniChartData}>
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#3b82f6" 
                  fill="url(#blueGradient)" 
                  strokeWidth={2} 
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          }
          onClick={() => toast.info("Opening enhanced impressions analytics...")}
        />
        
        <MetricCard
          title="Average CTR"
          value={`${averageCTR}%`}
          change={8.3}
          trend="up"
          icon={MousePointer}
          color="green"
          subtitle="Cross-variant average"
          detailsModal={true}
          exportData={true}
          isUpdating={isUpdating}
          lastUpdate={lastUpdate}
          anomalyDetected={anomalies.some(a => a.CTR > 5.0)}
          predictedValue={`${(parseFloat(averageCTR) * 1.083).toFixed(1)}%`}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <Line 
                  type="monotone" 
                  dataKey="variantC" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={false}
                  strokeLinecap="round"
                />
              </LineChart>
            </ResponsiveContainer>
          }
          onClick={() => toast.info("Opening enhanced CTR analytics...")}
        />
        
        <MetricCard
          title="Trust Score"
          value={averageTrustScore}
          change={-2.1}
          trend="down"
          icon={Shield}
          color="purple"
          subtitle="Weighted average"
          alert={parseFloat(averageTrustScore) < 80}
          detailsModal={true}
          exportData={true}
          isUpdating={isUpdating}
          lastUpdate={lastUpdate}
          anomalyDetected={anomalies.some(a => a.trustScore < 75)}
          predictedValue={`${(parseFloat(averageTrustScore) * 0.979).toFixed(1)}`}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miniChartData}>
                <Area 
                  type="monotone" 
                  dataKey="trustC" 
                  stroke="#8b5cf6" 
                  fill="url(#purpleGradient)" 
                  strokeWidth={2} 
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          }
          onClick={() => toast.info("Opening enhanced trust analytics...")}
        />
        
        <MetricCard
          title="Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}K`}
          change={15.7}
          trend="up"
          icon={DollarSign}
          color="orange"
          subtitle="This period"
          detailsModal={true}
          exportData={true}
          isUpdating={isUpdating}
          lastUpdate={lastUpdate}
          anomalyDetected={anomalies.some(a => a.revenue > 30000)}
          predictedValue={`$${((totalRevenue * 1.157) / 1000).toFixed(1)}K`}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={miniChartData}>
                <Bar 
                  dataKey="revenue" 
                  fill="#f59e0b" 
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          }
          onClick={() => toast.info("Opening enhanced revenue analytics...")}
        />
      </div>

      {/* Enhanced Main Analytics Grid with real-time charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CampaignOverview 
          data={dynamicData} 
          onCampaignClick={handleCampaignClick}
        />
        
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enhanced Performance Trends</h3>
            <div className="flex items-center space-x-2">
              <button 
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedMetric === 'ctr' 
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
                onClick={() => setSelectedMetric('ctr')}
              >
                CTR
              </button>
              <button 
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedMetric === 'trust' 
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400'
                    : 'text-gray-600 hover:text-purple-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
                onClick={() => setSelectedMetric('trust')}
              >
                Trust Score
              </button>
              <button 
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedMetric === 'revenue' 
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                    : 'text-gray-600 hover:text-green-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}
                onClick={() => setSelectedMetric('revenue')}
              >
                Revenue
              </button>
              
              {/* Real-time data indicator */}
              <div className="flex items-center space-x-1 ml-4">
                {isUpdating ? (
                  <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                ) : navigator.onLine ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-orange-500" />
                )}
                <span className="text-xs text-gray-500">
                  {isUpdating ? 'Updating...' : navigator.onLine ? 'Live' : 'Offline'}
                </span>
              </div>
              
              <button 
                onClick={() => toast.success("Enhanced chart exported successfully!")}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-80 relative">
            {/* Loading overlay */}
            {isUpdating && (
              <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {navigator.onLine ? 'Fetching live data...' : 'Generating enhanced data...'}
                  </span>
                </div>
              </div>
            )}
            
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={enhancedTimeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip dark={darkMode} />} />
                <Legend />
                
                {selectedMetric === 'ctr' || selectedMetric === 'all' ? (
                  <>
                    <Area
                      type="monotone"
                      dataKey="variantA"
                      name="Variant A CTR"
                      stackId="1"
                      stroke={COLORS.primary}
                      fill="url(#colorA)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="variantB"
                      name="Variant B CTR"
                      stackId="1"
                      stroke={COLORS.secondary}
                      fill="url(#colorB)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="variantC"
                      name="Variant C CTR"
                      stackId="1"
                      stroke={COLORS.success}
                      fill="url(#colorC)"
                      strokeWidth={2}
                    />
                  </>
                ) : null}

                {selectedMetric === 'trust' ? (
                  <>
                    <Line
                      type="monotone"
                      dataKey="trustA"
                      name="Trust Score A"
                      stroke={COLORS.primary}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="trustB"
                      name="Trust Score B"
                      stroke={COLORS.secondary}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="trustC"
                      name="Trust Score C"
                      stroke={COLORS.success}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </>
                ) : null}

                {selectedMetric === 'revenue' ? (
                  <Bar
                    dataKey="revenue"
                    name="Daily Revenue"
                    fill={COLORS.warning}
                    radius={[4, 4, 0, 0]}
                  />
                ) : null}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Enhanced Chart Insights with real-time AI analysis */}
          <motion.div 
            key={lastUpdate}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                {navigator.onLine ? `Live ${dataSource} Analysis` : 'Enhanced Mock Analysis'}
              </span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                Updated {new Date(lastUpdate).toLocaleTimeString('en-US', { timeZone: 'UTC' })} UTC
              </span>
            </div>
            <div className="space-y-2">
              {insights.slice(0, 2).map((insight, index) => (
                <p key={index} className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                  • {insight}
                </p>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4 text-xs text-blue-600 dark:text-blue-400">
                <span>Confidence: {navigator.onLine ? '94%' : '87%'}</span>
                <span>•</span>
                <span>Next update: {new Date(Date.now() + 30000).toLocaleTimeString('en-US', { timeZone: 'UTC' })} UTC</span>
              </div>
              <button 
                onClick={() => toast.info('Opening detailed enhanced AI analysis...')}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                View Details →
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Advanced Analytics Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <MarketingFunnel 
          data={dynamicData} 
          onStageClick={handleStageClick}
        />
        <AudienceSegmentation 
          onSegmentClick={handleSegmentClick}
          onGeneratePersonas={handleGeneratePersonas}
        />
      </div>

      {/* Enhanced Compliance & Bias Analysis with real-time monitoring */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Enhanced Real-time Bias Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Fairness Analysis</h3>
            <div className="flex items-center space-x-2">
              {anomalies.filter(a => a.gender_bias > 0.15 || a.age_bias > 0.15).length > 0 ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {anomalies.filter(a => a.gender_bias > 0.15 || a.age_bias > 0.15).length} Bias Issues
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">All Clear</span>
                </>
              )}
              <button 
                onClick={() => toast.info("Opening enhanced bias report...")}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-72 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dynamicData.map((item, index) => ({
                variant: `Variant ${item.variant}`,
                Gender: Math.round((1 - (item.gender_bias || 0.05)) * 100),
                Age: Math.round((1 - (item.age_bias || 0.03)) * 100),
                Location: Math.round((1 - (item.location_bias || 0.02)) * 100),
                Overall: Math.round((1 - item.bias) * 100),
                fill: ['#3b82f6', '#8b5cf6', '#10b981'][index]
              }))}>
                <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-600" />
                <PolarAngleAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                />
                {dynamicData.map((item, index) => (
                  <Radar
                    key={item.variant}
                    name={`Variant ${item.variant}`}
                    dataKey="Overall"
                    stroke={['#3b82f6', '#8b5cf6', '#10b981'][index]}
                    fill={['#3b82f6', '#8b5cf6', '#10b981'][index]}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip content={<CustomTooltip dark={darkMode} />} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {dynamicData.map((variant, index) => {
              const highBias = (variant.gender_bias || 0) > 0.1 || (variant.age_bias || 0) > 0.1 || (variant.location_bias || 0) > 0.1
              
              return (
                <motion.div 
                  key={`${variant.variant}-${variant.timestamp}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${
                    highBias 
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                      : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  }`}
                  onClick={() => toast.info(`Opening enhanced bias analysis for Variant ${variant.variant}...`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        variant.variant === 'A' ? 'bg-blue-500' :
                        variant.variant === 'B' ? 'bg-purple-500' : 'bg-green-500'
                      }`}>
                        {variant.variant}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Variant {variant.variant}
                      </span>
                      {variant.anomaly_detected && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {highBias ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                            Review Required
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            Compliant
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Gender</div>
                      <div className={`font-bold ${
                        (variant.gender_bias || 0) > 0.1 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}>
                        {((1 - (variant.gender_bias || 0.05)) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Age</div>
                      <div className={`font-bold ${
                        (variant.age_bias || 0) > 0.1 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}>
                        {((1 - (variant.age_bias || 0.03)) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Location</div>
                      <div className={`font-bold ${
                        (variant.location_bias || 0) > 0.1 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}>
                        {((1 - (variant.location_bias || 0.02)) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Last checked: {new Date(variant.timestamp).toLocaleTimeString('en-US', { 
                      timeZone: 'UTC', 
                      hour12: false 
                    })} UTC</span>
                    <span>Risk level: {(variant.privacy_risk_score || 2) <= 3 ? 'Low' : 'Medium'}</span>
                  </div>
                </motion.div>
              )
            })}

            {/* Enhanced AI Bias Recommendation */}
            <motion.div 
              key={lastUpdate}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
                  {navigator.onLine ? `${dataSource} Bias Analysis` : 'Enhanced Mock Bias Analysis'}
                </span>
              </div>
              <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                {anomalies.filter(a => a.gender_bias > 0.1).length > 0
                  ? `High bias detected in ${anomalies.filter(a => a.gender_bias > 0.1).map(a => `Variant ${a.variant}`).join(', ')}. ${navigator.onLine ? 'AI recommends' : 'Suggest'} immediate audience targeting adjustment and creative review.`
                  : `All variants maintain acceptable bias levels. ${navigator.onLine ? `${dataSource} analysis shows` : 'Analysis shows'} consistent fairness across demographic segments. Continue current targeting strategy.`
                }
              </p>
              <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                Next bias scan: {new Date(Date.now() + 300000).toLocaleTimeString('en-US', { timeZone: 'UTC' })} UTC
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Real-time Compliance Dashboard */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enhanced Privacy Compliance</h3>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                {Math.round(dynamicData.reduce((sum, v) => sum + v.compliance, 0) / dynamicData.length)}% Compliant
              </span>
              <button 
                onClick={() => toast.info("Opening enhanced compliance dashboard...")}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Enhanced overall compliance score */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Compliance Score</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round(dynamicData.reduce((sum, v) => sum + v.compliance, 0) / dynamicData.length)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(dynamicData.reduce((sum, v) => sum + v.compliance, 0) / dynamicData.length)}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>GDPR: {Math.round(dynamicData.filter(v => v.gdpr_compliant).length / dynamicData.length * 100)}%</span>
              <span>CCPA: {Math.round(dynamicData.filter(v => v.ccpa_compliant).length / dynamicData.length * 100)}%</span>
              <span>SOC2: 95%</span>
              <span>Updated: {new Date(lastUpdate).toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })} UTC</span>
            </div>
          </div>

          <div className="space-y-4">
            {dynamicData.map((variant, index) => (
              <motion.div 
                key={`${variant.variant}-${variant.timestamp}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
                onClick={() => toast.info(`Opening enhanced compliance details for Variant ${variant.variant}`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      variant.variant === 'A' ? 'bg-blue-500' :
                      variant.variant === 'B' ? 'bg-purple-500' : 'bg-green-500'
                    }`} />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Variant {variant.variant}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {variant.campaign_name}
                    </span>
                    {variant.anomaly_detected && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {(variant.gdpr_compliant && variant.ccpa_compliant) ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-xs font-medium text-gray-500 tabular-nums">
                      {variant.compliance}% compliant
                    </span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">GDPR</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      variant.gdpr_compliant 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {variant.gdpr_compliant ? "✓ Compliant" : "✗ Non-compliant"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">CCPA</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      variant.ccpa_compliant 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {variant.ccpa_compliant ? "✓ Compliant" : "✗ Non-compliant"}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Trust Score</span>
                    <span className="font-bold text-gray-900 dark:text-white tabular-nums">{variant.trustScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${variant.trustScore}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-3 rounded-full transition-all duration-500 shadow-sm ${
                        variant.trustScore >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        variant.trustScore >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        'bg-gradient-to-r from-yellow-500 to-orange-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Enhanced privacy risk and quality indicators */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Privacy Risk</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      variant.privacy_risk_score <= 2 ? 'bg-green-500' :
                      variant.privacy_risk_score <= 5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {variant.privacy_risk_score <= 2 ? 'Low' :
                       variant.privacy_risk_score <= 5 ? 'Medium' : 'High'}
                    </span>
                  </div>
                </div>

                {/* Additional enhanced metrics */}
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Quality Score: {variant.quality_score || 'N/A'}</span>
                  <span>Optimization: {variant.optimization_score || 'N/A'}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced quick actions */}
          <div className="mt-6 flex space-x-2">
            <button 
              onClick={() => toast.info("Opening enhanced compliance report generator...")}
              className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              Generate Enhanced Report
            </button>
            <button 
              onClick={() => toast.info("Opening enhanced compliance settings...")}
              className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Export Modal with dynamic data options */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Enhanced Dashboard Data</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-gray-900 dark:text-white">Enhanced PDF Report</span>
                    {navigator.onLine && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {dataSource}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Complete dashboard summary with enhanced AI insights and real-time analysis
                  </p>
                  <button 
                    onClick={() => handleExport('pdf')}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Export Enhanced PDF
                  </button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Download className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900 dark:text-white">Enhanced CSV Data</span>
                    {navigator.onLine && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Real-time</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Raw enhanced metrics with anomaly detection and predictive data
                  </p>
                  <button 
                    onClick={() => handleExport('csv')}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Export Enhanced CSV
                  </button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900 dark:text-white">AI Analysis Report</span>
                    <span className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {navigator.onLine ? dataSource : 'Enhanced Mock'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {navigator.onLine ? 'Advanced AI insights and predictions' : 'Enhanced pattern analysis with predictions'}
                  </p>
                  <button 
                    onClick={() => {
                      setShowExportModal(false)
                      toast.info(`${navigator.onLine ? dataSource : 'Enhanced'} analysis report will be ready in 30 seconds`)
                    }}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Generate AI Report
                  </button>
                </div>
              </div>

                            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>• Data Source: {navigator.onLine ? dataSource : 'Enhanced Offline Mode'}</div>
                  <div>• Export includes: {timeRange} enhanced performance metrics</div>
                  <div>• Generated by: Ajith</div>
                  <div>• Timestamp: 2025-07-07 22:58:18 UTC</div>
                  <div>• Variants: {dynamicData.length} active campaigns</div>
                  <div>• Anomalies: {anomalies.length} detected</div>
                  <div>• Last refresh: {new Date(lastUpdate).toLocaleTimeString('en-US', { timeZone: 'UTC' })} UTC</div>
                  <div>• Quality Score: {dynamicData.length > 0 ? Math.round(dynamicData.reduce((sum, v) => sum + (v.quality_score || 85), 0) / dynamicData.length) : 'N/A'}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Real-time Status Indicator */}
      <RealTimeStatusIndicator 
        isUpdating={isUpdating} 
        lastUpdate={lastUpdate} 
        hasAnomalies={anomalies.length > 0}
        dataSource={dataSource}
      />

      {/* Enhanced Notification System for Real-time Events */}
      <AnimatePresence>
        {anomalies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-20 right-6 bg-white dark:bg-gray-800 border-l-4 border-red-500 rounded-r-xl p-4 shadow-lg max-w-sm z-40"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Real-time Anomaly Alert
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {anomalies.length} anomal{anomalies.length === 1 ? 'y' : 'ies'} detected in current data stream
                </p>
                <div className="space-y-1">
                  {anomalies.slice(0, 2).map((anomaly, index) => (
                    <div key={index} className="text-xs text-red-600 dark:text-red-400">
                      • Variant {anomaly.variant}: {anomaly.CTR > 5 ? 'High CTR' : anomaly.trustScore < 75 ? 'Low Trust' : 'Performance Issue'}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => toast.info('Opening anomaly investigation...')}
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Investigate →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Performance Insights Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg max-w-xs z-30"
      >
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Live Insights</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <div className="font-medium text-gray-900 dark:text-white mb-1">Top Performer</div>
              <div>Variant C: {dynamicData.length > 0 ? `${Math.max(...dynamicData.map(d => d.CTR || 0)).toFixed(1)}% CTR` : 'N/A'}</div>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <div className="font-medium text-gray-900 dark:text-white mb-1">Optimization Opportunity</div>
              <div>Budget reallocation could increase ROI by 15%</div>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <div className="font-medium text-gray-900 dark:text-white mb-1">Next AI Recommendation</div>
              <div>{new Date(Date.now() + 300000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })} UTC</div>
            </div>
          </div>
          
          <button 
            onClick={() => toast.info('Opening detailed insights panel...')}
            className="w-full text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            View All Insights
          </button>
        </div>
      </motion.div>

      {/* Enhanced Floating Action Menu */}
      <div className="fixed bottom-20 left-6 z-40">
        <div className="flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toast.info('Opening quick campaign creator...')}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={refreshData}
            disabled={isRefreshing}
            className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50"
          >
            <RefreshCw className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowExportModal(true)}
            className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <Download className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Data Quality Indicator */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-lg z-30"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              navigator.onLine ? 'bg-green-500 animate-pulse' : 'bg-orange-500'
            }`} />
            <span className="text-xs font-medium text-gray-900 dark:text-white">
              Data Quality: {navigator.onLine ? '99.7%' : '95.2%'}
            </span>
          </div>
          
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          
          <div className="flex items-center space-x-1">
            <Brain className="w-3 h-3 text-purple-600" />
            <span className="text-xs text-purple-600 dark:text-purple-400">
              {dataSource}
            </span>
          </div>
          
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })} UTC
            </span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Footer with System Information */}
      <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">System Status</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>Version: Trust Engine v3.0.0</div>
              <div>Build: 2025.07.07.22.58.18</div>
              <div>Uptime: {navigator.onLine ? '99.97%' : '95.23%'}</div>
              <div>Response Time: {navigator.onLine ? '< 100ms' : '< 200ms'}</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Data Pipeline</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>Source: {dataSource}</div>
              <div>Refresh Rate: {navigator.onLine ? '30s' : '60s'}</div>
              <div>Last Sync: {new Date(lastUpdate).toLocaleTimeString('en-US', { timeZone: 'UTC' })} UTC</div>
              <div>Records Processed: {(totalImpressions / 1000).toFixed(0)}K</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Performance</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>Active Campaigns: {dynamicData.length}</div>
              <div>Avg Quality Score: {dynamicData.length > 0 ? Math.round(dynamicData.reduce((sum, v) => sum + (v.quality_score || 85), 0) / dynamicData.length) : 'N/A'}</div>
              <div>Compliance Rate: {dynamicData.length > 0 ? Math.round(dynamicData.reduce((sum, v) => sum + v.compliance, 0) / dynamicData.length) : 'N/A'}%</div>
              <div>Anomalies: {anomalies.length} detected</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">User Session</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>User: Ajith</div>
              <div>Team: Halo</div>
              <div>Role: Analytics Lead</div>
              <div>Session: 2h 34m active</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Trust Engine. Privacy-first marketing analytics platform.
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <button 
              onClick={() => toast.info('Opening documentation...')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Documentation
            </button>
            <button 
              onClick={() => toast.info('Opening support...')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Support
            </button>
            <button 
              onClick={() => toast.info('Opening privacy policy...')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </button>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${
                navigator.onLine ? 'bg-green-500' : 'bg-orange-500'
              }`} />
              <span>{navigator.onLine ? 'All Systems Operational' : 'Limited Connectivity'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard