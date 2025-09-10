import React, { useState } from "react"
import { motion } from "framer-motion"
import { useApp } from "../App"
import { 
  CheckCircle, AlertTriangle, Target, Shield, 
  BarChart3, TrendingUp, Eye, Download
} from "lucide-react"

const VariantCheck = () => {
  const { state } = useApp()
  const [selectedVariant, setSelectedVariant] = useState("A")
  const [checkResults, setCheckResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const runVariantCheck = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      const variantData = state.data.find(v => v.variant === selectedVariant)
      
      setCheckResults({
        variant: selectedVariant,
        performance: {
          ctr: variantData?.CTR || 3.2,
          trustScore: variantData?.trustScore || 82,
          biasScore: variantData?.bias || 0.08,
          complianceScore: variantData?.compliance || 95
        },
        status: variantData?.trustScore > 80 ? "healthy" : "warning",
        issues: variantData?.bias > 0.1 ? [
          { type: "bias", severity: "medium", message: "Bias levels above recommended threshold" }
        ] : [],
        recommendations: [
          "Performance metrics are within acceptable ranges",
          "Continue monitoring for consistency"
        ]
      })
    } catch (error) {
      console.error("Variant check failed:", error)
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
            🔍 Variant Check
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive analysis of individual campaign variants
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Variant Selection */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Select Variant</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Choose Variant to Analyze
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["A", "B", "C"].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedVariant === variant
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="text-xl font-bold">Variant {variant}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {state.data.find(v => v.variant === variant)?.CTR || "N/A"}% CTR
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runVariantCheck}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? "Analyzing Variant..." : `Analyze Variant ${selectedVariant}`}
            </button>
          </div>
        </motion.div>

        {/* Check Results */}
        {checkResults && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Variant {checkResults.variant} Analysis
                </h3>
                <div className="flex items-center space-x-2">
                  {checkResults.status === "healthy" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className={`text-sm ${
                    checkResults.status === "healthy" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}>
                    {checkResults.status === "healthy" ? "Healthy" : "Needs Attention"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {checkResults.performance.ctr}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CTR</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {checkResults.performance.trustScore}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Trust Score</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(checkResults.performance.biasScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bias Score</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {checkResults.performance.complianceScore}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Compliance</div>
                </div>
              </div>

              {checkResults.issues.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Issues Found</h4>
                  {checkResults.issues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{issue.message}</span>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {checkResults.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VariantCheck