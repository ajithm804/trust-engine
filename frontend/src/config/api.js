// Trust Engine API Configuration
// Team Halo | Ajith | 2025-07-07 10:43:51

const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  HEADERS: {
    'Content-Type': 'application/json',
    'X-Client': 'trust-engine-frontend',
    'X-Version': '2.0.0',
    'X-Team': 'Halo',
    'X-User': 'Ajith'
  }
}

export const ENDPOINTS = {
  HEALTH: '/health',
  BIAS_ANALYSIS: '/bias-analysis',
  AB_TEST_SIMULATION: '/ab-test-simulation',
  PERSONA_GENERATION: '/generate-personas',
  CAMPAIGN_ANALYTICS: '/campaign-analytics'
}

export default API_CONFIG
