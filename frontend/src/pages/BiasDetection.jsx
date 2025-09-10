import React, { useState, useMemo } from "react"
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { useApp } from "../App"
import { 
  AlertTriangle, CheckCircle, Users, Eye, Target, Shield,
  Download, RefreshCw, Filter, TrendingUp, TrendingDown
} from "lucide-react"
import { motion } from "framer-motion"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toFixed(2)}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

const BiasMetricCard = ({ title, value, severity, icon: Icon, description }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${getSeverityColor(severity)}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(value * 100).toFixed(1)}%
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getSeverityColor(severity)}`}>
            {severity === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {severity === 'medium' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {severity === 'low' && <CheckCircle className="w-3 h-3 mr-1" />}
            {severity.toUpperCase()} RISK
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const BiasDetection = () => {
  const { state } = useApp()
  const [selectedVariant, setSelectedVariant] = useState('all')
  
  // Enhanced bias data with detailed metrics
  const biasData = useMemo(() => {
    return state.data.map(item => ({
      variant: item.variant,
      gender: (item.gender_bias || 0.05) * 100,
      age: (item.age_bias || 0.03) * 100,
      location: (item.location_bias || 0.02) * 100,
      overall: item.bias * 100,
      fairnessScore: (1 - item.bias) * 100
    }))
  }, [state.data])

  const aggregatedBias = useMemo(() => {
    const total = state.data.length
    return {
      gender: state.data.reduce((acc, item) => acc + (item.gender_bias || 0.05), 0) / total,
      age: state.data.reduce((acc, item) => acc + (item.age_bias || 0.03), 0) / total,
      location: state.data.reduce((acc, item) => acc + (item.location_bias || 0.02), 0) / total,
      overall: state.data.reduce((acc, item) => acc + item.bias, 0) / total
    }
  }, [state.data])

  const getSeverity = (value) => {
    if (value > 0.15) return 'high'
    if (value > 0.08) return 'medium'
    return 'low'
  }

  const biasIssues = useMemo(() => {
    const issues = []
    state.data.forEach(variant => {
      if ((variant.gender_bias || 0.05) > 0.1) {
        issues.push({
          variant: variant.variant,
          type: 'Gender Bias',
          value: (variant.gender_bias || 0.05) * 100,
          severity: 'high',
          description: 'Discriminatory ad delivery patterns detected'
        })
      }
      if ((variant.location_bias || 0.02) > 0.1) {
        issues.push({
          variant: variant.variant,
          type: 'Location Bias',
          value: (variant.location_bias || 0.02) * 100,
          severity: 'medium',
          description: 'Geographic targeting disparities found'
        })
      }
    })
    return issues
  }, [state.data])

  const radarData = biasData.map(item => ({
    variant: `Variant ${item.variant}`,
    Gender: Math.max(0, 100 - item.gender),
    Age: Math.max(0, 100 - item.age),
    Location: Math.max(0, 100 - item.location),
    Overall: Math.max(0, 100 - item.overall)
  }))

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🛡️ Bias Detection & Fairness Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered analysis to ensure ethical and inclusive marketing
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Variants</option>
            {state.data.map(item => (
              <option key={item.variant} value={item.variant}>Variant {item.variant}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bias Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BiasMetricCard
          title="Gender Bias"
          value={aggregatedBias.gender}
          severity={getSeverity(aggregatedBias.gender)}
          icon={Users}
          description="Representation across gender groups"
        />
        <BiasMetricCard
          title="Age Bias"
          value={aggregatedBias.age}
          severity={getSeverity(aggregatedBias.age)}
          icon={Eye}
          description="Age group discrimination detection"
        />
        <BiasMetricCard
          title="Location Bias"
          value={aggregatedBias.location}
          severity={getSeverity(aggregatedBias.location)}
          icon={Target}
          description="Geographic targeting fairness"
        />
        <BiasMetricCard
          title="Overall Bias"
          value={aggregatedBias.overall}
          severity={getSeverity(aggregatedBias.overall)}
          icon={Shield}
          description="Aggregate fairness score"
        />
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fairness Radar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fairness Score Radar</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Fairness Score (higher = better)</span>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                />
                {state.data.map((item, index) => (
                  <Radar
                    key={item.variant}
                    name={`Variant ${item.variant}`}
                    dataKey={`Variant ${item.variant}`}
                    stroke={['#3b82f6', '#8b5cf6', '#10b981'][index]}
                    fill={['#3b82f6', '#8b5cf6', '#10b981'][index]}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bias Breakdown Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bias Breakdown by Variant</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={biasData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="variant" 
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
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="gender" name="Gender Bias" fill="#ef4444" radius={[2, 2, 0, 0]} />
                <Bar dataKey="age" name="Age Bias" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                <Bar dataKey="location" name="Location Bias" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Issues & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detected Issues */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detected Issues</h3>
            <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-full">
              {biasIssues.length} Issues
            </span>
          </div>

          <div className="space-y-4">
            {biasIssues.length > 0 ? biasIssues.map((issue, index) => (
              <div key={index} className="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900 dark:text-red-300">
                        {issue.type} - Variant {issue.variant}
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                        {issue.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">
                    {issue.value.toFixed(1)}%
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">No bias issues detected</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400">AI Active</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-300">
                    Optimize Variant C
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Variant C shows the lowest bias (3%) and highest trust score. Consider allocating more budget here.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-300">
                    Review Variant B Creative
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                    High gender bias detected. Consider using more inclusive language and imagery.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-300">
                    Expand Inclusive Targeting
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Add diverse audience segments to improve representation and reduce bias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BiasDetection