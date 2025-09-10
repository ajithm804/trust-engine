import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useApp } from "../App"
import { 
  Brain, TrendingUp, Shield, Target, Users, Zap,
  ChevronRight, Download, RefreshCw, Lightbulb, 
  BarChart3, PieChart, Award, AlertCircle
} from "lucide-react"

const ExplainableAI = () => {
  const { state } = useApp()
  const [selectedVariant, setSelectedVariant] = useState('C')
  const [aiInsights, setAiInsights] = useState(null)
  const [loading, setLoading] = useState(false)

  // Enhanced AI explanation based on sample data
  const generateAIExplanation = (variant) => {
    const variantData = state.data.find(d => d.variant === variant)
    if (!variantData) return null

    return {
      explanation: `Variant ${variant} demonstrates superior performance through a combination of factors: high trust score (${variantData.trustScore}/100), excellent CTR (${variantData.CTR}%), and minimal bias (${(variantData.bias * 100).toFixed(1)}%). The AI analysis indicates this variant successfully balances user engagement with ethical marketing practices.`,
      keyFactors: [
        {
          factor: "Trust Score Optimization",
          score: variantData.trustScore,
          impact: "High",
          description: "Privacy-compliant messaging builds user confidence"
        },
        {
          factor: "Click-Through Performance",
          score: variantData.CTR * 20, // Convert to 100-point scale
          impact: "Very High", 
          description: "Compelling copy and targeting drive engagement"
        },
        {
          factor: "Bias Minimization",
          score: (1 - variantData.bias) * 100,
          impact: "High",
          description: "Inclusive content ensures fair representation"
        },
        {
          factor: "Compliance Excellence",
          score: variantData.compliance,
          impact: "Critical",
          description: "GDPR/CCPA adherence enables global reach"
        }
      ],
      risks: variantData.bias > 0.1 ? ["Potential bias detected in targeting"] : [],
      recommendations: [
        `Allocate 60% of budget to Variant ${variant}`,
        "Expand to similar audience segments",
        "A/B test minor copy variations",
        "Monitor bias metrics weekly"
      ],
      syntheticSegments: ["Gen Z Techies", "Eco-conscious Millennials", "Privacy-aware Professionals"],
      confidenceScore: 94
    }
  }

  useEffect(() => {
    setLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      setAiInsights(generateAIExplanation(selectedVariant))
      setLoading(false)
    }, 1500)
  }, [selectedVariant, state.data])

  const FactorCard = ({ factor, score, impact, description }) => {
    const getImpactColor = (impact) => {
      switch (impact) {
        case 'Very High': return 'text-green-600 bg-green-50 dark:bg-green-900/20'
        case 'High': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
        case 'Critical': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
        default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
      }
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{factor}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(impact)}`}>
            {impact}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Performance Score</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{score.toFixed(1)}/100</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🤖 Explainable AI Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered analysis explaining why your variants perform differently
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {state.data.map(item => (
              <option key={item.variant} value={item.variant}>Variant {item.variant}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export Analysis</span>
          </button>
          <button 
            onClick={() => setAiInsights(generateAIExplanation(selectedVariant))}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600 dark:text-gray-400">AI analyzing variant performance...</span>
          </div>
        </div>
      ) : aiInsights ? (
        <>
          {/* AI Explanation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-8"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Why Variant {selectedVariant} Performs Best
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {aiInsights.confidenceScore}% Confidence
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {aiInsights.explanation}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Performance Factors */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Key Performance Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiInsights.keyFactors.map((factor, index) => (
                <FactorCard
                  key={factor.factor}
                  factor={factor.factor}
                  score={factor.score}
                  impact={factor.impact}
                  description={factor.description}
                />
              ))}
            </div>
          </div>

          {/* Recommendations & Risks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
              </div>
              <div className="space-y-3">
                {aiInsights.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <ChevronRight className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm text-green-800 dark:text-green-300">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
              </div>
              {aiInsights.risks.length > 0 ? (
                <div className="space-y-3">
                  {aiInsights.risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                      <span className="text-sm text-red-800 dark:text-red-300">{risk}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-green-600 dark:text-green-400 font-medium">No risks detected</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This variant meets all ethical guidelines</p>
                </div>
              )}
            </div>
          </div>

          {/* Synthetic Audience Segments */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Synthetic Segments</h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">AI-Generated</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.syntheticSegments.map((segment, index) => (
                <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-purple-900 dark:text-purple-300">{segment}</span>
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    High engagement potential
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Variant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Trust Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">CTR</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Bias Level</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.map((variant) => (
                    <tr 
                      key={variant.variant}
                      className={`border-b border-gray-100 dark:border-gray-700 ${
                        variant.variant === selectedVariant ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">Variant {variant.variant}</span>
                          {variant.variant === selectedVariant && (
                            <Award className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{variant.trustScore}/100</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{variant.CTR}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          variant.bias < 0.05 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          variant.bias < 0.1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {(variant.bias * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{variant.compliance}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ExplainableAI