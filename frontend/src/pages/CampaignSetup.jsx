import React, { useState } from "react"
import { motion } from "framer-motion"
import { useApp } from "../App"
import { 
  Target, Users, Palette, MessageSquare, Calendar, 
  Globe, Shield, Zap, Settings, Play, Save, Eye,
  ChevronDown, Plus, X, Upload, AlertTriangle, CheckCircle
} from "lucide-react"

const CampaignSetup = () => {
  const { state, actions } = useApp()
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    name: "",
    objective: "awareness",
    audience: {
      demographics: {
        ageRange: [18, 65],
        gender: "all",
        locations: [],
        interests: []
      },
      syntheticPersonas: [],
      size: 0
    },
    budget: {
      total: 5000,
      daily: 250,
      bidStrategy: "automatic"
    },
    creative: {
      variants: [],
      format: "image",
      copy: "",
      tone: "professional"
    },
    privacy: {
      gdprCompliant: true,
      ccpaCompliant: true,
      syntheticData: true,
      biasChecking: true
    },
    schedule: {
      startDate: "",
      endDate: "",
      timezone: "UTC"
    }
  })

  const steps = [
    { id: 1, name: "Campaign Details", icon: Target },
    { id: 2, name: "Audience & Personas", icon: Users },
    { id: 3, name: "Creative Variants", icon: Palette },
    { id: 4, name: "Budget & Schedule", icon: Calendar },
    { id: 5, name: "Privacy & Compliance", icon: Shield },
    { id: 6, name: "Review & Launch", icon: Play }
  ]

  const syntheticPersonas = [
    { id: 1, name: "Gen Z Techies", description: "18-26, Tech-savvy, Urban", size: "450K", engagement: 4.2 },
    { id: 2, name: "Eco Moms EU", description: "28-45, Sustainable living", size: "320K", engagement: 3.8 },
    { id: 3, name: "Urban Professionals", description: "25-40, Career-focused", size: "280K", engagement: 3.5 },
    { id: 4, name: "Digital Nomads", description: "24-35, Remote workers", size: "180K", engagement: 4.5 }
  ]

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div 
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              currentStep >= step.id 
                ? "bg-blue-600 border-blue-600 text-white" 
                : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {currentStep > step.id ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </motion.div>
          {index < steps.length - 1 && (
            <div className={`w-full h-0.5 mx-4 transition-all ${
              currentStep > step.id ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const CampaignDetails = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Campaign Details</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Campaign Name *
          </label>
          <input
            type="text"
            value={campaignData.name}
            onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter campaign name..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Campaign Objective *
          </label>
          <select
            value={campaignData.objective}
            onChange={(e) => setCampaignData(prev => ({ ...prev, objective: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="awareness">Brand Awareness</option>
            <option value="traffic">Website Traffic</option>
            <option value="conversions">Conversions</option>
            <option value="engagement">Engagement</option>
            <option value="leads">Lead Generation</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Campaign Description
        </label>
        <textarea
          rows={4}
          placeholder="Describe your campaign goals and strategy..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-300">AI Campaign Optimization</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Our AI will automatically optimize your campaign for privacy compliance and bias reduction.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const AudienceSetup = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Target Audience & Synthetic Personas</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age Range
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={campaignData.audience.demographics.ageRange[0]}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={campaignData.audience.demographics.ageRange[1]}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender (Privacy-First)
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="all">All Genders (Recommended)</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to specify</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Locations
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Add locations (GDPR/CCPA aware)..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <Globe className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-4">🤖 Synthetic Personas</h4>
          <div className="space-y-3">
            {syntheticPersonas.map((persona) => (
              <div key={persona.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900 dark:text-white">{persona.name}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        {persona.engagement} CTR
                      </span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{persona.description}</div>
                  <div className="text-xs text-gray-400">Audience: {persona.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Estimated Audience Size</div>
            <div className="text-sm text-gray-500">Privacy-compliant synthetic data</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">2.4M</div>
        </div>
      </div>
    </motion.div>
  )

  const CreativeVariants = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Creative Variants & A/B Testing</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ad Format
            </label>
            <select 
              value={campaignData.creative.format}
              onChange={(e) => setCampaignData(prev => ({ 
                ...prev, 
                creative: { ...prev.creative, format: e.target.value }
              }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="image">Image Ad</option>
              <option value="video">Video Ad</option>
              <option value="carousel">Carousel</option>
              <option value="collection">Collection</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tone & Style
            </label>
            <select 
              value={campaignData.creative.tone}
              onChange={(e) => setCampaignData(prev => ({ 
                ...prev, 
                creative: { ...prev.creative, tone: e.target.value }
              }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual & Friendly</option>
              <option value="playful">Playful & Fun</option>
              <option value="urgent">Urgent & Direct</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Copy
            </label>
            <textarea
              rows={3}
              value={campaignData.creative.copy}
              onChange={(e) => setCampaignData(prev => ({ 
                ...prev, 
                creative: { ...prev.creative, copy: e.target.value }
              }))}
              placeholder="Enter your main ad copy..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white">A/B Test Variants</h4>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
              <Plus className="w-4 h-4" />
              <span>Add Variant</span>
            </button>
          </div>

          <div className="space-y-3">
            {['A', 'B', 'C'].map((variant) => (
              <div key={variant} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">Variant {variant}</span>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <X className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Headline..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="CTA Button..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-300">Bias Check</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  All variants will be automatically checked for bias before launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <CampaignDetails />
      case 2: return <AudienceSetup />
      case 3: return <CreativeVariants />
      case 4: return <div className="text-center py-8 text-gray-500">Budget & Schedule (Coming Soon)</div>
      case 5: return <div className="text-center py-8 text-gray-500">Privacy & Compliance (Coming Soon)</div>
      case 6: return <div className="text-center py-8 text-gray-500">Review & Launch (Coming Soon)</div>
      default: return <CampaignDetails />
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 Create New Campaign
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Set up your privacy-first marketing campaign with AI-powered optimization and bias detection
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <StepIndicator />
        {renderCurrentStep()}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            
            {currentStep === steps.length ? (
              <button className="flex items-center space-x-2 px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                <Play className="w-4 h-4" />
                <span>Launch Campaign</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignSetup