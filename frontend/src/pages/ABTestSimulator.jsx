import React, { useState } from "react"
import { motion } from "framer-motion"

const ABTestSimulator = () => {
  const [config, setConfig] = useState({
    sample_size: 1000,
    control_conversion: 0.05,
    treatment_conversion: 0.07,
    confidence_level: 0.95
  })
  
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSimulation = async () => {
    setLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const simulatedResults = {
        control_conversions: Math.round(config.sample_size * config.control_conversion),
        treatment_conversions: Math.round(config.sample_size * config.treatment_conversion),
        statistical_significance: true,
        p_value: 0.032,
        confidence_interval: [0.008, 0.032],
        effect_size: config.treatment_conversion - config.control_conversion,
        recommendation: "Deploy treatment variant"
      }
      setResults(simulatedResults)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🧪 A/B Test Simulator
        </h1>
        <p className="text-xl text-gray-600">
          Statistical Analysis & Conversion Rate Testing
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Size per Variant
                </label>
                <input
                  type="number"
                  value={config.sample_size}
                  onChange={(e) => setConfig({...config, sample_size: parseInt(e.target.value)})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Control Conversion Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={config.control_conversion * 100}
                  onChange={(e) => setConfig({...config, control_conversion: parseFloat(e.target.value) / 100})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Conversion Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={config.treatment_conversion * 100}
                  onChange={(e) => setConfig({...config, treatment_conversion: parseFloat(e.target.value) / 100})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confidence Level (%)
                </label>
                <select
                  value={config.confidence_level}
                  onChange={(e) => setConfig({...config, confidence_level: parseFloat(e.target.value)})}
                  className="form-select"
                >
                  <option value={0.90}>90%</option>
                  <option value={0.95}>95%</option>
                  <option value={0.99}>99%</option>
                </select>
              </div>
              <button
                onClick={handleSimulation}
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? "Running Simulation..." : "🚀 Run A/B Test"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {results && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Control</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {results.control_conversions}
                      </p>
                      <p className="text-sm text-gray-500">conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Treatment</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {results.treatment_conversions}
                      </p>
                      <p className="text-sm text-gray-500">conversions</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">P-Value</span>
                      <span className="font-mono text-sm">{results.p_value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Effect Size</span>
                      <span className="font-mono text-sm">
                        +{(results.effect_size * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Significant</span>
                      <span className={results.statistical_significance ? "px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800" : "px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800"}>
                        {results.statistical_significance ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Recommendation</h4>
                    <p className="text-sm text-blue-800">{results.recommendation}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600 mb-2">
                    +{((config.treatment_conversion - config.control_conversion) * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">Improvement Over Control</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ABTestSimulator
