import React, { useState } from "react"
import { motion } from "framer-motion"
import { useApp } from "../App"
import { 
  Download, FileText, Database, Calendar, 
  Filter, CheckCircle, AlertCircle
} from "lucide-react"

const DataExport = () => {
  const { state } = useApp()
  const [exportConfig, setExportConfig] = useState({
    format: "csv",
    dataType: "campaigns",
    dateRange: "7d",
    includeMetadata: true
  })
  const [exportStatus, setExportStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setExportStatus({
        success: true,
        filename: `trust_engine_${exportConfig.dataType}_${Date.now()}.${exportConfig.format}`,
        size: "2.3 MB",
        records: 1247
      })
    } catch (error) {
      setExportStatus({
        success: false,
        error: "Export failed. Please try again."
      })
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
            📋 Data Export
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Export your Trust Engine data in multiple formats
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Export Configuration */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Export Configuration</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Export Format
              </label>
              <select
                value={exportConfig.format}
                onChange={(e) => setExportConfig(prev => ({ ...prev, format: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="csv">CSV (Comma Separated)</option>
                <option value="json">JSON (JavaScript Object)</option>
                <option value="pdf">PDF (Report Format)</option>
                <option value="xlsx">Excel (Spreadsheet)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Type
              </label>
              <select
                value={exportConfig.dataType}
                onChange={(e) => setExportConfig(prev => ({ ...prev, dataType: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="campaigns">Campaign Data</option>
                <option value="bias_analysis">Bias Analysis Reports</option>
                <option value="compliance">Compliance Reports</option>
                <option value="personas">Generated Personas</option>
                <option value="all">All Data</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select
                value={exportConfig.dateRange}
                onChange={(e) => setExportConfig(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="all">All time</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeMetadata"
                checked={exportConfig.includeMetadata}
                onChange={(e) => setExportConfig(prev => ({ ...prev, includeMetadata: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeMetadata" className="text-sm text-gray-700 dark:text-gray-300">
                Include metadata and timestamps
              </label>
            </div>

            <button
              onClick={handleExport}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Preparing Export...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate Export</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Export Status */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {exportStatus && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                {exportStatus.success ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exportStatus.success ? "Export Successful" : "Export Failed"}
                </h3>
              </div>

              {exportStatus.success ? (
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="text-sm text-green-800 dark:text-green-200 space-y-2">
                      <div><strong>File:</strong> {exportStatus.filename}</div>
                      <div><strong>Size:</strong> {exportStatus.size}</div>
                      <div><strong>Records:</strong> {exportStatus.records.toLocaleString()}</div>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Download File
                  </button>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">{exportStatus.error}</p>
                </div>
              )}
            </div>
          )}

          {/* Export History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Exports</h3>
            <div className="space-y-3">
              {[
                { name: "campaign_data_20250707.csv", size: "1.8 MB", date: "2025-07-07" },
                { name: "bias_analysis_20250706.pdf", size: "542 KB", date: "2025-07-06" },
                { name: "compliance_report_20250705.xlsx", size: "2.1 MB", date: "2025-07-05" }
              ].map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{file.size} • {file.date}</div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DataExport