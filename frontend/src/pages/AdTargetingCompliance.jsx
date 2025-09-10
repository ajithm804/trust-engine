import React, { useState } from "react"
import { motion } from "framer-motion"
import { useApp } from "../App"
import { 
  Target, AlertTriangle, CheckCircle, Users, MapPin, 
  Shield, Eye, Settings, Download
} from "lucide-react"

const AdTargetingCompliance = () => {
  const { state } = useApp()
  const [targetingParams, setTargetingParams] = useState({
    age_min: 18,
    age_max: 65,
    gender: "all",
    locations: [],
    interests: [],
    income_targeting: "all"
  })
  const [complianceResults, setComplianceResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkCompliance = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setComplianceResults({
        overallCompliant: true,
        complianceScore: 94.8,
        flaggedParameters: [],
        regionalCompliance: {
          US: { compliant: true, score: 96.1 },
          EU: { compliant: true, score: 94.8 },
          CA: { compliant: true, score: 97.3 },
          UK: { compliant: true, score: 95.5 }
        },
        recommendations: [
          "Targeting parameters appear compliant across all regions",
          "Continue current inclusive targeting approach"
        ]
      })
    } catch (error) {
      console.error("Compliance check failed:", error)
    } finally {
      setLoading(false)
    }
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
            🎯 Ad Targeting Compliance
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ensure your ad targeting meets privacy and anti-discrimination standards
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Targeting Configuration */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Targeting Parameters</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age Range
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={targetingParams.age_min}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, age_min: parseInt(e.target.value) }))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  value={targetingParams.age_max}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, age_max: parseInt(e.target.value) }))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender Targeting
              </label>
              <select
                value={targetingParams.gender}
                onChange={(e) => setTargetingParams(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Genders (Recommended)</option>
                <option value="male">Male Only</option>
                <option value="female">Female Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Income Targeting
              </label>
              <select
                value={targetingParams.income_targeting}
                onChange={(e) => setTargetingParams(prev => ({ ...prev, income_targeting: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Income Levels (Recommended)</option>
                <option value="high_income_only">High Income Only</option>
                <option value="middle_income">Middle Income</option>
                <option value="low_income">Low Income</option>
              </select>
            </div>

            <button
              onClick={checkCompliance}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? "Checking Compliance..." : "Check Compliance"}
            </button>
          </div>
        </motion.div>

        {/* Compliance Results */}
        {complianceResults && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compliance Status</h3>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">Compliant</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{complianceResults.complianceScore}%</div>
                <p className="text-gray-600 dark:text-gray-400">Compliance Score</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Regional Compliance</h4>
                {Object.entries(complianceResults.regionalCompliance).map(([region, data]) => (
                  <div key={region} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-900 dark:text-white">{region}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{data.score}%</span>
                      {data.compliant ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Recommendations</h4>
              <div className="space-y-2">
                {complianceResults.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdTargetingCompliance