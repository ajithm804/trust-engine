import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useApp } from "../App"
import { 
  Shield, AlertTriangle, CheckCircle, Users, MapPin, 
  Calendar, TrendingUp, Download, RefreshCw, Eye,
  Lock, Globe, Database, FileText, Settings
} from "lucide-react"

const PrivacyGuardian = () => {
  const { state } = useApp()
  const [complianceData, setComplianceData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("all")

  useEffect(() => {
    loadComplianceData()
  }, [selectedRegion])

  const loadComplianceData = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setComplianceData({
        overallScore: 94.2,
        regions: {
          EU: { gdpr: 96, dataMinimization: 98, consent: 95, status: "compliant" },
          US: { ccpa: 92, coppa: 89, transparency: 94, status: "compliant" },
          CA: { pipeda: 97, privacy: 96, consent: 98, status: "compliant" },
          UK: { gdpr: 95, dataProtection: 93, privacy: 96, status: "compliant" }
        },
        alerts: [
          { id: 1, type: "warning", message: "Cookie consent needs update", severity: "medium" },
          { id: 2, type: "info", message: "Data retention policy expires in 30 days", severity: "low" }
        ],
        lastScan: "2025-07-07 20:38:27 UTC"
      })
    } catch (error) {
      console.error("Failed to load compliance data:", error)
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
            🔐 Privacy Guardian
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time privacy compliance monitoring and protection
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button 
            onClick={loadComplianceData}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            <span>Refresh Scan</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </motion.div>

      {complianceData && (
        <>
          {/* Overall Score */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Compliance Score</h3>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">All Systems Compliant</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">{complianceData.overallScore}%</div>
              <p className="text-gray-600 dark:text-gray-400">Overall Compliance Score</p>
            </div>
          </motion.div>

          {/* Regional Compliance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {Object.entries(complianceData.regions).map(([region, data], index) => (
              <div key={region} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{region}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    data.status === 'compliant' 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {data.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(data).filter(([key]) => key !== 'status').map(([metric, score]) => (
                    <div key={metric} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Alerts */}
          {complianceData.alerts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Privacy Alerts</h3>
              <div className="space-y-4">
                {complianceData.alerts.map((alert) => (
                  <div key={alert.id} className={`flex items-center space-x-3 p-4 rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    alert.type === 'error' ? 'bg-red-50 dark:bg-red-900/20' :
                    'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.type === 'warning' ? 'text-yellow-500' :
                      alert.type === 'error' ? 'text-red-500' :
                      'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Severity: {alert.severity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

export default PrivacyGuardian