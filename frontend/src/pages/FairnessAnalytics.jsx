import React, { useState } from "react"
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts"
import { useApp } from "../App"
import { 
  Shield, Users, MapPin, Calendar, TrendingUp, 
  AlertTriangle, CheckCircle, Filter, Download, Eye
} from "lucide-react"
import { motion } from "framer-motion"

const FairnessAnalytics = () => {
  const { state } = useApp()
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("all")

  const fairnessData = [
    {
      variant: "A",
      genderFairness: 95,
      ageFairness: 97,
      locationFairness: 98,
      overallFairness: 92,
      genderBias: 0.05,
      ageBias: 0.03,
      locationBias: 0.02
    },
    {
      variant: "B",
      genderFairness: 82,
      ageFairness: 88,
      locationFairness: 85,
      overallFairness: 82,
      genderBias: 0.18,
      ageBias: 0.12,
      locationBias: 0.15
    },
    {
      variant: "C",
      genderFairness: 98,
      ageFairness: 99,
      locationFairness: 99,
      overallFairness: 97,
      genderBias: 0.02,
      ageBias: 0.01,
      locationBias: 0.01
    }
  ]

  const timeSeriesData = [
    { date: "Jul 1", variantA: 92, variantB: 78, variantC: 96 },
    { date: "Jul 2", variantA: 93, variantB: 80, variantC: 97 },
    { date: "Jul 3", variantA: 91, variantB: 82, variantC: 97 },
    { date: "Jul 4", variantA: 94, variantB: 81, variantC: 98 },
    { date: "Jul 5", variantA: 92, variantB: 83, variantC: 97 },
    { date: "Jul 6", variantA: 95, variantB: 84, variantC: 98 },
    { date: "Jul 7", variantA: 92, variantB: 82, variantC: 97 }
  ]

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ⚖️ Fairness Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive analysis of campaign fairness across demographics
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Fairness Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Gender Fairness</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">91.7%</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+2.3% vs last week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Age Fairness</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">94.7%</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+1.8% vs last week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
              <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Location Fairness</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">94.0%</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+3.1% vs last week</p>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        {/* Fairness Radar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Fairness Radar</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={fairnessData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#6b7280" }} />
                <Radar name="Gender" dataKey="genderFairness" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                <Radar name="Age" dataKey="ageFairness" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Radar name="Location" dataKey="locationFairness" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fairness Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Fairness Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="variantA" stroke="#3b82f6" strokeWidth={2} name="Variant A" />
                <Line type="monotone" dataKey="variantB" stroke="#ef4444" strokeWidth={2} name="Variant B" />
                <Line type="monotone" dataKey="variantC" stroke="#10b981" strokeWidth={2} name="Variant C" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Detailed Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Detailed Fairness Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Variant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Gender Fairness</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Age Fairness</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Location Fairness</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Overall Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {fairnessData.map((variant) => (
                <tr key={variant.variant} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Variant {variant.variant}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {variant.genderFairness}%
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {variant.ageFairness}%
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {variant.locationFairness}%
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    {variant.overallFairness}%
                  </td>
                  <td className="py-3 px-4">
                    {variant.overallFairness >= 95 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        Excellent
                      </span>
                    ) : variant.overallFairness >= 85 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                        Good
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                        Needs Improvement
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default FairnessAnalytics