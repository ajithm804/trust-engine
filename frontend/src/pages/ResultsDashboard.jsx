import React, { useState, useEffect } from "react"
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { useApp } from "../App"
import { 
  TrendingUp, TrendingDown, BarChart3, Target, 
  DollarSign, Users, Calendar, Download
} from "lucide-react"
import { motion } from "framer-motion"

const ResultsDashboard = () => {
  const { state } = useApp()
  const [timeRange, setTimeRange] = useState("7d")
  const [resultsData, setResultsData] = useState(null)

  useEffect(() => {
    loadResultsData()
  }, [timeRange])

  const loadResultsData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setResultsData({
      overview: {
        totalCampaigns: 15,
        activeCampaigns: 8,
        totalRevenue: 125440,
        averageCTR: 3.2,
        conversionRate: 8.0,
        roas: 2.45
      },
      timeSeriesData: [
        { date: "Jul 1", revenue: 15600, conversions: 320, ctr: 3.1 },
        { date: "Jul 2", revenue: 18200, conversions: 364, ctr: 3.3 },
        { date: "Jul 3", revenue: 16800, conversions: 336, ctr: 3.0 },
        { date: "Jul 4", revenue: 21500, conversions: 430, ctr: 3.4 },
        { date: "Jul 5", revenue: 19200, conversions: 384, ctr: 3.2 },
        { date: "Jul 6", revenue: 22800, conversions: 456, ctr: 3.5 },
        { date: "Jul 7", revenue: 20340, conversions: 407, ctr: 3.2 }
      ],
      topPerformers: [
        { variant: "C", ctr: 3.9, conversions: 463, revenue: 23150 },
        { variant: "A", ctr: 3.2, conversions: 320, revenue: 15600 },
        { variant: "B", ctr: 2.6, conversions: 245, revenue: 11270 }
      ]
    })
  }

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
            📊 Results Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive performance analytics and insights
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

      {resultsData && (
        <>
          {/* Overview Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Revenue</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${resultsData.overview.totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Average CTR</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {resultsData.overview.averageCTR}%
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">ROAS</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {resultsData.overview.roas}x
              </p>
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Revenue Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resultsData.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Revenue ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default ResultsDashboard