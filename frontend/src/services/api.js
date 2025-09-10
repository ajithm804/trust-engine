// Trust Engine API Service Layer
// Team Halo | Ajith | 2025-07-07 10:43:51

import axios from 'axios'
import API_CONFIG, { ENDPOINTS } from '../config/api'
import toast from 'react-hot-toast'

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message)
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      toast.error('Backend API not running. Please start the Flask server.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.response?.status === 404) {
      toast.error('API endpoint not found.')
    }
    
    return Promise.reject(error)
  }
)

export const apiService = {
  // Health check
  checkHealth: () => api.get(ENDPOINTS.HEALTH),
  
  // Bias detection
  analyzeBias: (data) => api.post(ENDPOINTS.BIAS_ANALYSIS, data),
  
  // A/B testing
  runAbTestSimulation: (data) => api.post(ENDPOINTS.AB_TEST_SIMULATION, data),
  
  // Persona generation
  generatePersonas: (config) => api.post(ENDPOINTS.PERSONA_GENERATION, config),
  
  // Campaign analytics
  getCampaignAnalytics: (filters) => api.get(ENDPOINTS.CAMPAIGN_ANALYTICS, { params: filters })
}

export default api
