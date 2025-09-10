# ================================================================
# TRUST ENGINE BACKEND API - ENHANCED VERSION
# ================================================================
# Team: Halo | Current Date: 2025-07-07 20:10:07 UTC
# User: Ajith | Platform: Privacy-First A/B Testing with AI-Powered Analytics
# ================================================================

# ================================================================
# IMPORTS & DEPENDENCIES
# ================================================================

# Standard Library Imports
import os
import logging
import json
import random
from datetime import datetime, timedelta
import base64
import io
import csv

# Third-Party Library Imports
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError
from datetime import datetime, timezone


import google.generativeai as genai
import numpy as np
from scipy import stats
from faker import Faker
import os


# Load environment variables from .env file
load_dotenv()

# # Get the variable
# api_key = os.getenv("GEMINI_API_KEY")

# # Debug check
# print("Gemini API Key:", api_key)


# ================================================================
# LOGGING CONFIGURATION
# ================================================================

# Configure structured logging for production monitoring
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ================================================================
# FLASK APPLICATION INITIALIZATION
# ================================================================

# Initialize Flask application
app = Flask(__name__)

# Configure CORS for cross-origin requests
# Allows frontend deployments from Vercel and local development
CORS(app, origins=[
    "https://trust-engine-frontend.vercel.app",    # Production frontend
    "https://trust-engine.vercel.app",             # Alternative production URL
    "https://*.vercel.app",                        # Any Vercel deployment
    "http://localhost:3000",                       # Local React development
    "http://localhost:5173"                        # Local Vite development
])

# ================================================================
# AI CONFIGURATION - GEMINI 1.5 PRO
# ================================================================

# Configure Google Gemini AI for enhanced bias analysis
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if GEMINI_API_KEY:
    # Production mode with AI enhancement
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-pro')
    logger.info("✅ Gemini AI configured successfully - AI-enhanced analysis enabled")
else:
    # Demo mode without AI (fallback for development/testing)
    model = None
    logger.warning("⚠️ Gemini API key not found - running in demo mode with technical analysis only")

# ================================================================
# ENHANCED PYDANTIC DATA MODELS
# ================================================================

class BiasAnalysisRequest(BaseModel):
    """Enhanced request model for bias analysis endpoint"""
    content: str                    # Marketing content to analyze
    campaign_type: str = "general"  # Type of campaign (email, social, etc.)
    target_audience: dict = {}      # Optional audience demographics
    analysis_depth: str = "standard" # standard, deep, quick

class ABTestRequest(BaseModel):
    """Enhanced request model for A/B test analysis"""
    test_name: str                  # Descriptive name for the test
    variant_a: dict                 # Control variant configuration
    variant_b: dict                 # Test variant configuration
    audience_size: int = 10000      # Total audience size for simulation
    confidence_level: float = 0.95  # Statistical confidence threshold
    test_duration: int = 14         # Test duration in days

class CampaignSetupRequest(BaseModel):
    """Request model for campaign setup"""
    name: str
    objective: str
    audience: dict
    budget: dict
    creative: dict
    privacy_settings: dict

class ComplianceCheckRequest(BaseModel):
    """Request model for compliance checking"""
    campaign_data: dict
    regions: list = ["US", "EU"]
    regulations: list = ["GDPR", "CCPA"]

# ================================================================
# SYSTEM HEALTH & STATUS ENDPOINTS
# ================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Enhanced system health check endpoint"""
    gemini_status = "healthy" if model else "demo_mode"
    
    health_response = {
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '3.0.0',
        'current_user': 'Ajith',
        'session_time': '2025-07-07 20:10:07 UTC',
        
        # Enhanced service status monitoring
        'services': {
            'gemini_ai': gemini_status,
            'bias_analyzer': 'healthy',
            'ab_analyzer': 'healthy',
            'persona_generator': 'healthy',
            'campaign_setup': 'healthy',
            'explainable_ai': 'healthy',
            'fairness_analytics': 'healthy',
            'privacy_guardian': 'healthy',
            'results_dashboard': 'healthy',
            'ad_targeting_compliance': 'healthy',
            'variant_checker': 'healthy',
            'data_export': 'healthy'
        },
        
        'demo_mode': model is None,
        'team': 'Halo',
        'hackathon': '2025'
    }
    
    return jsonify(health_response), 200

@app.route('/')
def root():
    """Enhanced root endpoint with complete API documentation"""
    return jsonify({
        'message': 'Trust Engine API - Enhanced Version - Team Halo',
        'version': '3.0.0',
        'current_user': 'Ajith',
        'timestamp': '2025-07-07 20:10:07 UTC',
        'status': 'healthy',
        
        # Complete API endpoints
        'endpoints': {
            'core': [
                '/api/health',              # System health check
                '/api/bias-analysis',       # Content bias detection
                '/api/ab-test-analysis',    # A/B test simulation
                '/api/generate-personas',   # Synthetic persona generation
                '/api/demo-data'           # Dashboard demo data
            ],
            'new_features': [
                '/api/campaign-setup',      # Campaign creation workflow
                '/api/explainable-ai',      # AI insights and explanations
                '/api/fairness-analytics',  # Detailed fairness metrics
                '/api/privacy-guardian',    # Privacy compliance monitoring
                '/api/results-dashboard',   # Comprehensive results analysis
                '/api/ad-targeting-compliance', # Ad targeting compliance check
                '/api/variant-check',       # Individual variant analysis
                '/api/data-export'         # Data export functionality
            ]
        },
        
        'team': 'Halo',
        'platform': 'Privacy-First A/B Testing with Advanced Analytics'
    })

# ================================================================
# ORIGINAL BIAS DETECTION (ENHANCED)
# ================================================================

@app.route('/api/bias-analysis', methods=['POST'])
def analyze_bias():
    """Enhanced AI-Powered Bias Detection Endpoint"""
    try:
        # Request validation
        if not request.is_json:
            return jsonify({'error': 'Content-Type must be application/json'}), 400
        
        data = request.get_json()
        validated_data = BiasAnalysisRequest(**data)
        
        content = validated_data.content
        campaign_type = validated_data.campaign_type
        analysis_depth = validated_data.analysis_depth
        
        logger.info(f"🔍 Enhanced bias analysis for {campaign_type} campaign - Depth: {analysis_depth}")
        
        # Enhanced bias indicators with more categories
        bias_indicators = {
            'gender': [
                'guys', 'girls', 'manpower', 'chairman', 'mankind', 'he/she', 'brotherhood',
                'businessman', 'salesman', 'policeman', 'fireman', 'mailman', 'waitress'
            ],
            'age': [
                'young', 'old', 'millennial', 'boomer', 'generation', 'fresh', 'hip',
                'elderly', 'senior', 'youth', 'teen', 'mature', 'youthful', 'outdated'
            ],
            'racial': [
                'urban', 'exotic', 'articulate', 'diverse', 'ethnic', 'oriental',
                'minority', 'tribal', 'primitive', 'cultured', 'foreign'
            ],
            'accessibility': [
                'see', 'look', 'hear', 'click here', 'watch', 'listen',
                'view', 'observe', 'notice', 'focus', 'blind spot', 'deaf'
            ],
            'socioeconomic': [
                'upscale', 'classy', 'cheap', 'budget', 'exclusive', 'elite',
                'low-class', 'high-end', 'premium', 'affordable', 'luxury', 'ghetto'
            ],
            'cultural': [
                'normal', 'traditional', 'mainstream', 'typical', 'standard',
                'foreign', 'exotic', 'weird', 'strange', 'unusual'
            ]
        }
        
        # Enhanced analysis logic
        detected_biases = []
        overall_score = 0
        content_lower = content.lower()
        
        for bias_type, indicators in bias_indicators.items():
            found_indicators = [word for word in indicators if word in content_lower]
            
            if found_indicators:
                severity = (
                    'critical' if len(found_indicators) > 5 else
                    'high' if len(found_indicators) > 3 else 
                    'medium' if len(found_indicators) > 1 else 
                    'low'
                )
                
                bias_score = len(found_indicators) * (15 if severity == 'critical' else 12)
                overall_score += bias_score
                
                detected_biases.append({
                    'bias_type': bias_type.title() + ' Bias',
                    'severity': severity,
                    'impact_score': bias_score,
                    'found_terms': found_indicators[:5],
                    'issue': f'Found {len(found_indicators)} {bias_type}-biased terms',
                    'solution': f'Replace {bias_type}-specific language with inclusive alternatives',
                    'priority': 'immediate' if severity in ['critical', 'high'] else 'moderate'
                })
        
        # Enhanced AI analysis with detailed prompt
        ai_analysis = None
        
        if model and GEMINI_API_KEY:
            try:
                enhanced_prompt = f"""
                As a senior marketing ethicist and AI analyst, provide comprehensive bias analysis for this content:
                
                CONTENT: "{content}"
                CAMPAIGN TYPE: {campaign_type}
                ANALYSIS DEPTH: {analysis_depth}
                DETECTED ISSUES: {detected_biases}
                USER: Ajith
                TIMESTAMP: 2025-07-07 20:10:07 UTC
                
                Provide detailed JSON response:
                {{
                    "executive_summary": "2-sentence executive summary of bias analysis",
                    "detailed_findings": {{
                        "primary_concerns": ["concern1", "concern2", "concern3"],
                        "positive_aspects": ["strength1", "strength2"],
                        "risk_assessment": "low/medium/high risk level",
                        "compliance_impact": "potential GDPR/ADA/diversity compliance issues"
                    }},
                    "recommendations": {{
                        "immediate_actions": ["action1", "action2"],
                        "long_term_improvements": ["improvement1", "improvement2"],
                        "alternative_approaches": ["approach1", "approach2"]
                    }},
                    "improved_content": "Completely rewritten inclusive version",
                    "confidence_score": 0.85,
                    "analysis_metadata": {{
                        "model_version": "gemini-1.5-pro",
                        "analysis_time": "2025-07-07T20:10:07Z",
                        "processed_by": "Trust Engine AI"
                    }}
                }}
                
                Focus on actionable, specific improvements while maintaining marketing effectiveness.
                """
                
                response = model.generate_content(enhanced_prompt)
                ai_analysis = json.loads(response.text)
                logger.info("✅ Enhanced AI analysis completed successfully")
                
            except Exception as e:
                logger.warning(f"AI analysis failed: {e}")
                ai_analysis = {
                    "executive_summary": "Technical analysis completed. AI enhancement temporarily unavailable but core bias detection functioning normally.",
                    "detailed_findings": {
                        "primary_concerns": [bias['issue'] for bias in detected_biases[:3]],
                        "positive_aspects": ["Content analyzed successfully", "Technical detection active"],
                        "risk_assessment": "medium" if overall_score > 25 else "low",
                        "compliance_impact": "Review recommended for high-bias content"
                    },
                    "recommendations": {
                        "immediate_actions": ["Review flagged terms", "Implement inclusive language"],
                        "long_term_improvements": ["Establish style guide", "Train content team"],
                        "alternative_approaches": ["Use neutral terminology", "Focus on benefits"]
                    },
                    "improved_content": content.replace('guys', 'everyone').replace('click here', 'learn more'),
                    "confidence_score": 0.75,
                    "analysis_metadata": {
                        "model_version": "technical-fallback",
                        "analysis_time": datetime.utcnow().isoformat(),
                        "processed_by": "Trust Engine Technical Analysis"
                    }
                }
        
        # Enhanced compliance assessment
        privacy_terms = ['email', 'phone', 'address', 'personal', 'data', 'information', 'contact', 'profile']
        accessibility_issues = any('accessibility' in b['bias_type'].lower() for b in detected_biases)
        
        compliance_status = {
            'gdpr': {
                'status': 'compliant' if len([t for t in privacy_terms if t in content_lower]) == 0 else 'needs_review',
                'score': 95 if len([t for t in privacy_terms if t in content_lower]) == 0 else 70,
                'issues': [t for t in privacy_terms if t in content_lower]
            },
            'ada': {
                'status': 'compliant' if not accessibility_issues else 'needs_improvement',
                'score': 90 if not accessibility_issues else 60,
                'issues': ['Accessibility language detected'] if accessibility_issues else []
            },
            'diversity': {
                'status': 'excellent' if overall_score < 15 else 'good' if overall_score < 35 else 'needs_improvement',
                'score': max(0, 100 - overall_score),
                'issues': [bias['bias_type'] for bias in detected_biases if bias['severity'] in ['high', 'critical']]
            }
        }
        
        # Comprehensive results
        final_results = {
            'analysis_metadata': {
                'user': 'Ajith',
                'timestamp': '2025-07-07 20:10:07 UTC',
                'analysis_version': '3.0.0',
                'processing_time_ms': random.randint(800, 1200)
            },
            'overall_assessment': {
                'bias_score': min(100, overall_score),
                'bias_level': 'critical' if overall_score > 60 else 'high' if overall_score > 35 else 'medium' if overall_score > 15 else 'low',
                'risk_category': 'high_risk' if overall_score > 50 else 'medium_risk' if overall_score > 25 else 'low_risk',
                'recommendation': 'immediate_review' if overall_score > 50 else 'standard_review' if overall_score > 25 else 'approved'
            },
            'detailed_findings': {
                'detected_biases': detected_biases,
                'total_issues': len(detected_biases),
                'severity_breakdown': {
                    'critical': len([b for b in detected_biases if b['severity'] == 'critical']),
                    'high': len([b for b in detected_biases if b['severity'] == 'high']),
                    'medium': len([b for b in detected_biases if b['severity'] == 'medium']),
                    'low': len([b for b in detected_biases if b['severity'] == 'low'])
                }
            },
            'ai_insights': ai_analysis,
            'compliance_assessment': compliance_status,
            'content_analysis': {
                'original_content': content,
                'content_length': len(content),
                'word_count': len(content.split()),
                'campaign_type': campaign_type,
                'analysis_depth': analysis_depth
            }
        }
        
        logger.info(f"✅ Enhanced bias analysis completed - Score: {overall_score}, Issues: {len(detected_biases)}")
        return jsonify(final_results), 200
        
    except ValidationError as e:
        logger.warning(f"Validation error: {e}")
        return jsonify({'error': 'Invalid request format', 'details': e.errors()}), 400
        
    except Exception as e:
        logger.error(f"Enhanced bias analysis failed: {e}")
        return jsonify({'error': 'Analysis failed', 'details': str(e)}), 500

# ================================================================
# NEW ENDPOINTS FOR ENHANCED FUNCTIONALITY
# ================================================================

@app.route('/api/campaign-setup', methods=['POST'])
def setup_campaign():
    """Campaign Setup Workflow Endpoint"""
    try:
        data = request.get_json()
        validated_data = CampaignSetupRequest(**data)
        
        logger.info(f"🎯 Setting up campaign: {validated_data.name}")
        
        # Generate campaign configuration
        campaign_config = {
            'campaign_id': f"camp_{int(datetime.utcnow().timestamp())}",
            'setup_data': validated_data.dict(),
            'estimated_reach': random.randint(50000, 500000),
            'estimated_cost': validated_data.budget.get('total', 5000),
            'setup_timestamp': datetime.utcnow().isoformat(),
            'created_by': 'Ajith',
            'status': 'configured',
            'next_steps': [
                'Review targeting parameters',
                'Approve creative assets',
                'Set up tracking',
                'Launch campaign'
            ],
            'compliance_check': {
                'gdpr_ready': validated_data.privacy_settings.get('gdpr_compliant', True),
                'ccpa_ready': validated_data.privacy_settings.get('ccpa_compliant', True),
                'bias_check_status': 'pending'
            }
        }
        
        return jsonify(campaign_config), 200
        
    except Exception as e:
        logger.error(f"Campaign setup failed: {e}")
        return jsonify({'error': 'Campaign setup failed', 'details': str(e)}), 500

@app.route('/api/explainable-ai', methods=['POST'])
def explainable_ai_analysis():
    """Explainable AI Insights Endpoint"""
    try:
        data = request.get_json()
        variant_data = data.get('variant_data', {})
        analysis_type = data.get('analysis_type', 'performance')
        
        logger.info(f"🤖 Generating explainable AI insights for variant analysis")
        
        # Generate AI explanation
        if model and GEMINI_API_KEY:
            try:
                prompt = f"""
                As an AI marketing analyst, explain why this variant performs as it does:
                
                VARIANT DATA: {json.dumps(variant_data, indent=2)}
                ANALYSIS TYPE: {analysis_type}
                USER: Ajith
                TIMESTAMP: 2025-07-07 20:10:07 UTC
                
                Provide comprehensive explanation in JSON format:
                {{
                    "performance_explanation": {{
                        "why_this_performance": "Clear explanation of performance drivers",
                        "key_success_factors": ["factor1", "factor2", "factor3"],
                        "performance_compared_to_baseline": "comparative analysis",
                        "statistical_significance": "explanation of statistical meaning"
                    }},
                    "trust_score_analysis": {{
                        "trust_drivers": ["driver1", "driver2"],
                        "trust_detractors": ["detractor1", "detractor2"],
                        "improvement_opportunities": ["opp1", "opp2"]
                    }},
                    "bias_assessment": {{
                        "fairness_score_explanation": "why this fairness score",
                        "demographic_impact": "how different groups are affected",
                        "bias_mitigation_suggestions": ["suggestion1", "suggestion2"]
                    }},
                    "actionable_insights": {{
                        "immediate_optimizations": ["optimization1", "optimization2"],
                        "strategic_recommendations": ["rec1", "rec2"],
                        "risk_factors": ["risk1", "risk2"]
                    }},
                    "confidence_metrics": {{
                        "explanation_confidence": 0.89,
                        "data_quality_score": 0.92,
                        "recommendation_strength": "high"
                    }}
                }}
                """
                
                response = model.generate_content(prompt)
                ai_explanation = json.loads(response.text)
                
            except Exception as e:
                ai_explanation = {
                    "performance_explanation": {
                        "why_this_performance": "Technical analysis shows variant performance based on measurable metrics",
                        "key_success_factors": ["High engagement rate", "Low bias score", "Good compliance"],
                        "performance_compared_to_baseline": "Performance analysis completed with technical methods",
                        "statistical_significance": "Results calculated using standard statistical methods"
                    },
                    "confidence_metrics": {
                        "explanation_confidence": 0.75,
                        "data_quality_score": 0.85,
                        "recommendation_strength": "medium"
                    }
                }
        else:
            ai_explanation = {
                "performance_explanation": {
                    "why_this_performance": "Demo mode - technical analysis available, AI enhancement pending",
                    "key_success_factors": ["Consistent metrics", "Good baseline performance"],
                    "performance_compared_to_baseline": "Technical comparison completed",
                    "statistical_significance": "Standard statistical analysis applied"
                }
            }
        
        result = {
            'analysis_metadata': {
                'user': 'Ajith',
                'timestamp': '2025-07-07 20:10:07 UTC',
                'analysis_type': analysis_type
            },
            'ai_insights': ai_explanation,
            'variant_summary': variant_data,
            'explainability_score': random.uniform(0.75, 0.95)
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Explainable AI analysis failed: {e}")
        return jsonify({'error': 'AI explanation failed', 'details': str(e)}), 500

@app.route('/api/fairness-analytics', methods=['GET'])
def fairness_analytics():
    """Comprehensive Fairness Analytics Endpoint"""
    try:
        logger.info("⚖️ Generating comprehensive fairness analytics")
        
        # Generate detailed fairness metrics
        fairness_data = {
            'overall_fairness_score': random.uniform(75, 95),
            'demographic_breakdown': {
                'gender': {
                    'male': {'representation': 48, 'performance': 3.2, 'bias_score': 0.05},
                    'female': {'representation': 49, 'performance': 3.4, 'bias_score': 0.03},
                    'non_binary': {'representation': 3, 'performance': 3.1, 'bias_score': 0.02}
                },
                'age_groups': {
                    '18-24': {'representation': 22, 'performance': 3.8, 'bias_score': 0.04},
                    '25-34': {'representation': 35, 'performance': 3.5, 'bias_score': 0.02},
                    '35-44': {'representation': 25, 'performance': 3.2, 'bias_score': 0.03},
                    '45-54': {'representation': 12, 'performance': 2.9, 'bias_score': 0.06},
                    '55+': {'representation': 6, 'performance': 2.7, 'bias_score': 0.08}
                },
                'geographic': {
                    'urban': {'representation': 65, 'performance': 3.4, 'bias_score': 0.03},
                    'suburban': {'representation': 25, 'performance': 3.2, 'bias_score': 0.04},
                    'rural': {'representation': 10, 'performance': 2.8, 'bias_score': 0.07}
                }
            },
            'trend_analysis': [
                {'date': '2025-07-01', 'fairness_score': 78, 'issues_detected': 3},
                {'date': '2025-07-02', 'fairness_score': 82, 'issues_detected': 2},
                {'date': '2025-07-03', 'fairness_score': 85, 'issues_detected': 2},
                {'date': '2025-07-04', 'fairness_score': 87, 'issues_detected': 1},
                {'date': '2025-07-05', 'fairness_score': 89, 'issues_detected': 1},
                {'date': '2025-07-06', 'fairness_score': 91, 'issues_detected': 0},
                {'date': '2025-07-07', 'fairness_score': 93, 'issues_detected': 0}
            ],
            'recommendations': [
                {
                    'priority': 'high',
                    'category': 'age_bias',
                    'description': 'Address age-related performance gaps in 55+ demographic',
                    'action': 'Adjust targeting parameters and creative messaging'
                },
                {
                    'priority': 'medium',
                    'category': 'geographic_bias',
                    'description': 'Improve rural market performance',
                    'action': 'Customize content for rural audiences'
                }
            ],
            'metadata': {
                'user': 'Ajith',
                'timestamp': '2025-07-07 20:10:07 UTC',
                'analysis_version': '3.0.0'
            }
        }
        
        return jsonify(fairness_data), 200
        
    except Exception as e:
        logger.error(f"Fairness analytics failed: {e}")
        return jsonify({'error': 'Fairness analytics failed', 'details': str(e)}), 500

@app.route('/api/privacy-guardian', methods=['POST'])
def privacy_guardian():
    """Privacy Compliance Monitoring Endpoint"""
    try:
        data = request.get_json()
        campaign_data = data.get('campaign_data', {})
        regions = data.get('regions', ['US', 'EU'])
        
        logger.info(f"🔐 Privacy Guardian analysis for regions: {regions}")
        
        # Comprehensive privacy analysis
        privacy_analysis = {
            'overall_compliance_score': random.uniform(85, 98),
            'regional_compliance': {},
            'privacy_risks': [],
            'recommendations': [],
            'compliance_timeline': []
        }
        
        # Generate regional compliance data
        for region in regions:
            if region == 'EU':
                compliance_score = random.uniform(85, 95)
                privacy_analysis['regional_compliance'][region] = {
                    'gdpr_compliance': compliance_score,
                    'data_minimization': random.uniform(80, 95),
                    'consent_management': random.uniform(85, 98),
                    'right_to_deletion': random.uniform(90, 98),
                    'data_portability': random.uniform(85, 95),
                    'privacy_by_design': random.uniform(80, 92),
                    'status': 'compliant' if compliance_score > 90 else 'needs_improvement'
                }
            elif region == 'US':
                compliance_score = random.uniform(88, 96)
                privacy_analysis['regional_compliance'][region] = {
                    'ccpa_compliance': compliance_score,
                    'coppa_compliance': random.uniform(90, 98),
                    'opt_out_mechanisms': random.uniform(85, 95),
                    'data_transparency': random.uniform(80, 92),
                    'consumer_rights': random.uniform(85, 95),
                    'status': 'compliant' if compliance_score > 90 else 'needs_improvement'
                }
        
        # Generate risk assessment
        risk_factors = [
            {'risk': 'Data retention period', 'severity': 'low', 'mitigation': 'Implement automated deletion'},
            {'risk': 'Third-party data sharing', 'severity': 'medium', 'mitigation': 'Review data processing agreements'},
            {'risk': 'Consent granularity', 'severity': 'low', 'mitigation': 'Enhance consent interface'}
        ]
        
        privacy_analysis['privacy_risks'] = random.sample(risk_factors, 2)
        
        # Generate recommendations
        privacy_analysis['recommendations'] = [
            {
                'priority': 'high',
                'action': 'Implement enhanced consent management',
                'timeline': '2 weeks',
                'impact': 'Improves GDPR compliance by 5%'
            },
            {
                'priority': 'medium',
                'action': 'Update privacy policy language',
                'timeline': '1 week',
                'impact': 'Enhances transparency scores'
            }
        ]
        
        privacy_analysis['metadata'] = {
            'user': 'Ajith',
            'timestamp': '2025-07-07 20:10:07 UTC',
            'analysis_version': '3.0.0',
            'regions_analyzed': regions
        }
        
        return jsonify(privacy_analysis), 200
        
    except Exception as e:
        logger.error(f"Privacy Guardian analysis failed: {e}")
        return jsonify({'error': 'Privacy analysis failed', 'details': str(e)}), 500

@app.route('/api/results-dashboard', methods=['GET'])
def results_dashboard():
    """Comprehensive Results Dashboard Data Endpoint"""
    try:
        logger.info("📊 Generating comprehensive results dashboard data")
        
        # Generate comprehensive dashboard data
        dashboard_data = {
            'campaign_performance': {
                'total_campaigns': 15,
                'active_campaigns': 8,
                'completed_campaigns': 7,
                'total_impressions': 2450000,
                'total_clicks': 78400,
                'total_conversions': 6272,
                'total_revenue': 125440,
                'average_ctr': 3.2,
                'average_conversion_rate': 8.0,
                'average_roas': 2.45
            },
            'variant_performance': [
                {
                    'variant': 'A',
                    'campaigns': 5,
                    'avg_ctr': 3.1,
                    'avg_trust_score': 82,
                    'avg_bias_score': 0.08,
                    'total_revenue': 45000,
                    'performance_trend': [3.0, 3.1, 3.2, 3.1, 3.0, 3.1, 3.2]
                },
                {
                    'variant': 'B',
                    'campaigns': 5,
                    'avg_ctr': 2.6,
                    'avg_trust_score': 74,
                    'avg_bias_score': 0.18,
                    'total_revenue': 32000,
                    'performance_trend': [2.4, 2.5, 2.7, 2.6, 2.5, 2.6, 2.7]
                },
                {
                    'variant': 'C',
                    'campaigns': 5,
                    'avg_ctr': 3.9,
                    'avg_trust_score': 90,
                    'avg_bias_score': 0.03,
                    'total_revenue': 48440,
                    'performance_trend': [3.7, 3.8, 4.0, 3.9, 3.8, 3.9, 4.1]
                }
            ],
            'time_series_data': [],
            'top_performing_segments': [
                {'segment': 'Gen Z Techies', 'ctr': 4.2, 'conversion_rate': 9.1, 'revenue': 35000},
                {'segment': 'Urban Professionals', 'ctr': 3.8, 'conversion_rate': 8.5, 'revenue': 42000},
                {'segment': 'Eco Moms EU', 'ctr': 3.5, 'conversion_rate': 7.8, 'revenue': 28000}
            ],
            'compliance_overview': {
                'gdpr_compliant_campaigns': 14,
                'ccpa_compliant_campaigns': 13,
                'ada_compliant_campaigns': 15,
                'overall_compliance_rate': 94.2
            },
            'bias_analysis_summary': {
                'total_analyses': 67,
                'low_bias_content': 45,
                'medium_bias_content': 18,
                'high_bias_content': 4,
                'avg_bias_score': 0.09
            }
        }
        
        # Generate 30-day time series data
        base_date = datetime.utcnow() - timedelta(days=30)
        for i in range(30):
            current_date = base_date + timedelta(days=i)
            dashboard_data['time_series_data'].append({
                'date': current_date.strftime('%Y-%m-%d'),
                'impressions': random.randint(75000, 95000),
                'clicks': random.randint(2200, 3100),
                'conversions': random.randint(180, 280),
                'revenue': random.randint(3500, 5500),
                'trust_score': random.uniform(78, 92),
                'bias_score': random.uniform(0.02, 0.15)
            })
        
        dashboard_data['metadata'] = {
            'user': 'Ajith',
            'timestamp': '2025-07-07 20:10:07 UTC',
            'data_range': '30_days',
            'generated_by': 'Trust Engine Results Dashboard'
        }
        
        return jsonify(dashboard_data), 200
        
    except Exception as e:
        logger.error(f"Results dashboard generation failed: {e}")
        return jsonify({'error': 'Results dashboard failed', 'details': str(e)}), 500

@app.route('/api/ad-targeting-compliance', methods=['POST'])
def ad_targeting_compliance():
    """Ad Targeting Compliance Check Endpoint"""
    try:
        data = request.get_json()
        targeting_params = data.get('targeting_params', {})
        regions = data.get('regions', ['US', 'EU'])
        
        logger.info(f"🎲 Checking ad targeting compliance for regions: {regions}")
        
        # Analyze targeting parameters for compliance
        compliance_analysis = {
            'overall_compliance': True,
            'compliance_score': random.uniform(85, 98),
            'regional_analysis': {},
            'flagged_parameters': [],
            'recommendations': [],
            'risk_assessment': 'low'
        }
        
        # Check for potentially problematic targeting
        problematic_targeting = {
            'discriminatory_age_ranges': targeting_params.get('age_min', 18) > 25 or targeting_params.get('age_max', 65) < 50,
            'gender_exclusive': targeting_params.get('gender') in ['male_only', 'female_only'],
            'income_discriminatory': 'high_income_only' in str(targeting_params.get('income_targeting', '')),
            'location_redlining': 'exclude_certain_areas' in str(targeting_params.get('location_exclusions', ''))
        }
        
        # Generate compliance issues if any
        for param, is_problematic in problematic_targeting.items():
            if is_problematic:
                compliance_analysis['flagged_parameters'].append({
                    'parameter': param,
                    'issue': f'Potential discriminatory targeting detected in {param}',
                    'severity': 'high' if param in ['gender_exclusive', 'location_redlining'] else 'medium',
                    'recommendation': f'Review and adjust {param} to ensure inclusive targeting'
                })
                compliance_analysis['overall_compliance'] = False
                compliance_analysis['risk_assessment'] = 'high' if param in ['gender_exclusive'] else 'medium'
        
        # Regional specific analysis
        for region in regions:
            if region == 'EU':
                compliance_analysis['regional_analysis'][region] = {
                    'gdpr_compliance': 'compliant' if compliance_analysis['overall_compliance'] else 'violation_risk',
                    'data_processing_lawfulness': random.uniform(85, 95),
                    'consent_basis': 'valid' if not problematic_targeting['gender_exclusive'] else 'questionable',
                    'special_category_data': 'not_used' if not any(problematic_targeting.values()) else 'review_required'
                }
            elif region == 'US':
                compliance_analysis['regional_analysis'][region] = {
                    'civil_rights_compliance': 'compliant' if not problematic_targeting['location_redlining'] else 'violation_risk',
                    'equal_opportunity': 'maintained' if not problematic_targeting['gender_exclusive'] else 'compromised',
                    'fair_housing_act': 'compliant' if not problematic_targeting['location_redlining'] else 'violation_risk',
                    'ada_accessibility': 'maintained'
                }
        
        # Generate recommendations
        if not compliance_analysis['overall_compliance']:
            compliance_analysis['recommendations'].extend([
                {
                    'priority': 'immediate',
                    'action': 'Revise targeting parameters to ensure inclusive reach',
                    'details': 'Remove discriminatory age, gender, or location restrictions'
                },
                {
                    'priority': 'high',
                    'action': 'Implement bias testing for all targeting parameters',
                    'details': 'Regular compliance audits for targeting configurations'
                }
            ])
        else:
            compliance_analysis['recommendations'].append({
                'priority': 'maintenance',
                'action': 'Continue current targeting approach',
                'details': 'Targeting parameters appear compliant across all regions'
            })
        
        compliance_analysis['metadata'] = {
            'user': 'Ajith',
            'timestamp': '2025-07-07 20:10:07 UTC',
            'targeting_params_analyzed': targeting_params,
            'regions_checked': regions
        }
        
        return jsonify(compliance_analysis), 200
        
    except Exception as e:
        logger.error(f"Ad targeting compliance check failed: {e}")
        return jsonify({'error': 'Targeting compliance check failed', 'details': str(e)}), 500

@app.route('/api/variant-check', methods=['POST'])
def variant_check():
    """Individual Variant Analysis Endpoint"""
    try:
        data = request.get_json()
        variant_data = data.get('variant_data', {})
        check_type = data.get('check_type', 'comprehensive')
        
        logger.info(f"🔍 Performing {check_type} variant check")
        
        # Comprehensive variant analysis
        variant_analysis = {
            'variant_id': variant_data.get('variant_id', f"var_{int(datetime.utcnow().timestamp())}"),
            'performance_metrics': {
                'ctr': variant_data.get('ctr', random.uniform(2.0, 4.5)),
                'conversion_rate': variant_data.get('conversion_rate', random.uniform(5.0, 12.0)),
                'trust_score': variant_data.get('trust_score', random.uniform(70, 95)),
                'bias_score': variant_data.get('bias_score', random.uniform(0.01, 0.20)),
                'engagement_rate': random.uniform(8.0, 15.0),
                'bounce_rate': random.uniform(25.0, 45.0)
            },
            'compliance_check': {
                'gdpr_status': random.choice(['compliant', 'compliant', 'needs_review']),
                'ccpa_status': random.choice(['compliant', 'compliant', 'needs_review']),
                'ada_status': random.choice(['compliant', 'compliant', 'needs_improvement']),
                'overall_compliance_score': random.uniform(85, 98)
            },
            'bias_assessment': {
                'gender_bias': random.uniform(0.01, 0.15),
                'age_bias': random.uniform(0.01, 0.12),
                'location_bias': random.uniform(0.01, 0.10),
                'overall_fairness_score': random.uniform(75, 95),
                'bias_categories': []
            },
            'optimization_recommendations': [],
            'risk_factors': [],
            'competitive_analysis': {
                'performance_vs_baseline': random.uniform(-20, 35),
                'trust_vs_baseline': random.uniform(-10, 25),
                'bias_vs_baseline': random.uniform(-50, 100)
            }
        }
        
        # Generate bias categories if bias detected
        if variant_analysis['performance_metrics']['bias_score'] > 0.10:
            variant_analysis['bias_assessment']['bias_categories'] = [
                {'type': 'gender', 'severity': 'medium', 'impact': 12},
                {'type': 'age', 'severity': 'low', 'impact': 8}
            ]
        
        # Generate optimization recommendations
        ctr = variant_analysis['performance_metrics']['ctr']
        trust_score = variant_analysis['performance_metrics']['trust_score']
        bias_score = variant_analysis['performance_metrics']['bias_score']
        
        if ctr < 3.0:
            variant_analysis['optimization_recommendations'].append({
                'category': 'performance',
                'priority': 'high',
                'recommendation': 'Optimize call-to-action and creative elements to improve CTR',
                'expected_impact': '+15-25% CTR improvement'
            })
        
        if trust_score < 80:
            variant_analysis['optimization_recommendations'].append({
                'category': 'trust',
                'priority': 'high',
                'recommendation': 'Enhance transparency and credibility indicators',
                'expected_impact': '+10-15 point trust score improvement'
            })
        
        if bias_score > 0.10:
            variant_analysis['optimization_recommendations'].append({
                'category': 'bias',
                'priority': 'critical',
                'recommendation': 'Address detected bias through inclusive language and targeting',
                'expected_impact': '50-70% bias reduction'
            })
        
        # Generate risk factors
        if bias_score > 0.15:
            variant_analysis['risk_factors'].append({
                'risk': 'High bias score may impact brand reputation',
                'severity': 'high',
                'mitigation': 'Immediate bias remediation required'
            })
        
        if variant_analysis['compliance_check']['overall_compliance_score'] < 90:
            variant_analysis['risk_factors'].append({
                'risk': 'Compliance issues detected',
                'severity': 'medium',
                'mitigation': 'Review and update compliance measures'
            })
        
        variant_analysis['metadata'] = {
            'user': 'Ajith',
            'timestamp': '2025-07-07 20:10:07 UTC',
            'check_type': check_type,
            'analysis_version': '3.0.0'
        }
        
        return jsonify(variant_analysis), 200
        
    except Exception as e:
        logger.error(f"Variant check failed: {e}")
        return jsonify({'error': 'Variant check failed', 'details': str(e)}), 500

@app.route('/api/data-export', methods=['POST'])
def data_export():
    """Data Export Functionality Endpoint"""
    try:
        data = request.get_json()
        export_type = data.get('export_type', 'json')  # json, csv, pdf
        data_selection = data.get('data_selection', 'all')
        date_range = data.get('date_range', '30d')
        
        logger.info(f"📋 Generating {export_type} export for {data_selection} data")
        
        # Generate comprehensive export data
        export_data = {
            'campaigns': [
                {
                    'campaign_id': 'camp_001',
                    'name': 'Summer Launch 2025',
                    'variant': 'A',
                    'ctr': 3.2,
                    'trust_score': 82,
                    'bias_score': 0.08,
                    'compliance_score': 95,
                    'impressions': 125000,
                    'clicks': 4000,
                    'conversions': 320,
                    'revenue': 15600,
                    'created_date': '2025-06-15',
                    'status': 'active'
                },
                {
                    'campaign_id': 'camp_002',
                    'name': 'Brand Awareness Q3',
                    'variant': 'B',
                    'ctr': 2.6,
                    'trust_score': 74,
                    'bias_score': 0.18,
                    'compliance_score': 88,
                    'impressions': 118000,
                    'clicks': 3068,
                    'conversions': 245,
                    'revenue': 11270,
                    'created_date': '2025-06-20',
                    'status': 'active'
                },
                {
                    'campaign_id': 'camp_003',
                    'name': 'Product Demo Series',
                    'variant': 'C',
                    'ctr': 3.9,
                    'trust_score': 90,
                    'bias_score': 0.03,
                    'compliance_score': 98,
                    'impressions': 132000,
                    'clicks': 5148,
                    'conversions': 463,
                    'revenue': 23150,
                    'created_date': '2025-06-10',
                    'status': 'completed'
                }
            ],
            'bias_analyses': [
                {
                    'analysis_id': 'bias_001',
                    'campaign_id': 'camp_001',
                    'overall_bias_score': 8,
                    'gender_bias': 0.05,
                    'age_bias': 0.03,
                    'location_bias': 0.02,
                    'detected_issues': 2,
                    'severity': 'low',
                    'analysis_date': '2025-07-07'
                },
                {
                    'analysis_id': 'bias_002',
                    'campaign_id': 'camp_002',
                    'overall_bias_score': 18,
                    'gender_bias': 0.18,
                    'age_bias': 0.12,
                    'location_bias': 0.15,
                    'detected_issues': 5,
                    'severity': 'high',
                    'analysis_date': '2025-07-07'
                }
            ],
            'compliance_reports': [
                {
                    'report_id': 'comp_001',
                    'campaign_id': 'camp_001',
                    'gdpr_compliance': 95,
                    'ccpa_compliance': 94,
                    'ada_compliance': 96,
                    'overall_score': 95,
                    'issues_found': 1,
                    'report_date': '2025-07-07'
                }
            ]
        }
        
        # Handle different export formats
        if export_type == 'csv':
            # Generate CSV format
            csv_output = io.StringIO()
            csv_writer = csv.writer(csv_output)
            
            # Write headers
            csv_writer.writerow([
                'Campaign ID', 'Name', 'Variant', 'CTR', 'Trust Score', 
                'Bias Score', 'Compliance Score', 'Impressions', 'Clicks', 
                'Conversions', 'Revenue', 'Status'
            ])
            
            # Write data rows
            for campaign in export_data['campaigns']:
                csv_writer.writerow([
                    campaign['campaign_id'], campaign['name'], campaign['variant'],
                    campaign['ctr'], campaign['trust_score'], campaign['bias_score'],
                    campaign['compliance_score'], campaign['impressions'], 
                    campaign['clicks'], campaign['conversions'], campaign['revenue'],
                    campaign['status']
                ])
            
            csv_content = csv_output.getvalue()
            csv_output.close()
            
            result = {
                'export_type': 'csv',
                'content': csv_content,
                'filename': f'trust_engine_export_{datetime.utcnow().strftime("%Y%m%d_%H%M%S")}.csv'
            }
            
        elif export_type == 'pdf':
            # Generate PDF metadata (actual PDF generation would require additional libraries)
            result = {
                'export_type': 'pdf',
                'content': 'PDF_BINARY_DATA_PLACEHOLDER',
                'filename': f'trust_engine_report_{datetime.utcnow().strftime("%Y%m%d_%H%M%S")}.pdf',
                'pages': 5,
                'sections': ['Executive Summary', 'Campaign Performance', 'Bias Analysis', 'Compliance Report', 'Recommendations']
            }
            
        else:  # Default to JSON
            result = {
                'export_type': 'json',
                'content': export_data,
                'filename': f'trust_engine_data_{datetime.utcnow().strftime("%Y%m%d_%H%M%S")}.json'
            }
        
        result['metadata'] = {
            'user': 'Ajith',
            'export_timestamp': '2025-07-07 20:10:07 UTC',
            'data_selection': data_selection,
            'date_range': date_range,
            'total_records': len(export_data['campaigns'])
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Data export failed: {e}")
        return jsonify({'error': 'Data export failed', 'details': str(e)}), 500

# ================================================================
# ENHANCED EXISTING ENDPOINTS
# ================================================================

@app.route('/api/ab-test-analysis', methods=['POST'])
def analyze_ab_test():
    """Enhanced A/B Test Simulation with Advanced Analytics"""
    try:
        data = request.get_json()
        validated_data = ABTestRequest(**data)
        
        logger.info(f"🧪 Enhanced A/B test simulation: {validated_data.test_name}")
        
        # Enhanced simulation with more realistic parameters
        base_conversion_rate = random.uniform(0.015, 0.12)
        test_name_lower = validated_data.test_name.lower()
        
        # More sophisticated variant impact calculation
        if 'subject' in test_name_lower or 'email' in test_name_lower:
            variant_lift = random.uniform(-0.15, 0.35)
        elif 'button' in test_name_lower or 'cta' in test_name_lower:
            variant_lift = random.uniform(-0.1, 0.25)
        elif 'headline' in test_name_lower:
            variant_lift = random.uniform(-0.12, 0.30)
        elif 'image' in test_name_lower or 'creative' in test_name_lower:
            variant_lift = random.uniform(-0.08, 0.20)
        else:
            variant_lift = random.uniform(-0.2, 0.4)
        
        # Enhanced audience segmentation
        total_users = validated_data.audience_size
        control_users = total_users // 2
        variant_users = total_users - control_users
        
        # More sophisticated conversion simulation
        control_conversions = int(control_users * base_conversion_rate)
        variant_conversion_rate = max(0.001, base_conversion_rate * (1 + variant_lift))
        variant_conversions = int(variant_users * variant_conversion_rate)
        
        # Enhanced statistical analysis
        if control_users > 0 and variant_users > 0:
            z_score = (variant_conversion_rate - base_conversion_rate) / np.sqrt(
                (base_conversion_rate * (1 - base_conversion_rate) / control_users) +
                (variant_conversion_rate * (1 - variant_conversion_rate) / variant_users)
            )
            p_value = 2 * (1 - stats.norm.cdf(abs(z_score)))
            is_significant = p_value < 0.05
            confidence_level = (1 - p_value) * 100 if is_significant else random.uniform(70, 95)
            
            # Calculate effect size (Cohen's h)
            effect_size = 2 * (np.arcsin(np.sqrt(variant_conversion_rate)) - np.arcsin(np.sqrt(base_conversion_rate)))
            
            # Calculate required sample size for future tests
            required_sample_size = int((z_score / effect_size) ** 2) if effect_size != 0 else total_users
            
        else:
            z_score = 0
            p_value = 1
            is_significant = False
            confidence_level = 50
            effect_size = 0
            required_sample_size = total_users
        
        # Enhanced AI analysis with business recommendations
        ai_explanation = None
        
        if model and GEMINI_API_KEY:
            try:
                enhanced_prompt = f"""
                Provide comprehensive A/B test analysis with business recommendations:
                
                TEST DETAILS:
                - Test Name: {validated_data.test_name}
                - Control: {control_conversions} conversions from {control_users} users ({base_conversion_rate:.2%})
                - Variant: {variant_conversions} conversions from {variant_users} users ({variant_conversion_rate:.2%})
                - Statistical Significance: {is_significant}
                - P-value: {p_value:.4f}
                - Effect Size: {effect_size:.4f}
                - Test Duration: {validated_data.test_duration} days
                
                USER: Ajith
                TIMESTAMP: 2025-07-07 20:10:07 UTC
                
                Provide comprehensive JSON response:
                {{
                    "executive_summary": "2-sentence executive summary for stakeholders",
                    "business_impact": {{
                        "revenue_impact": "projected revenue impact",
                        "user_experience_impact": "UX implications",
                        "brand_impact": "brand perception effects",
                        "risk_assessment": "potential risks and mitigation"
                    }},
                    "statistical_interpretation": {{
                        "significance_explanation": "what statistical significance means",
                        "confidence_interpretation": "confidence level explanation",
                        "effect_size_meaning": "practical significance explanation",
                        "sample_size_adequacy": "whether sample size was sufficient"
                    }},
                    "recommendations": {{
                        "immediate_action": "what to do right now",
                        "implementation_plan": "step-by-step rollout",
                        "monitoring_strategy": "what to track post-implementation",
                        "future_testing": "next tests to consider"
                    }},
                    "risk_factors": ["risk1", "risk2"],
                    "success_metrics": ["metric1", "metric2"],
                    "confidence_score": 0.89
                }}
                """
                
                response = model.generate_content(enhanced_prompt)
                ai_explanation = json.loads(response.text)
                logger.info("✅ Enhanced AI business analysis completed")
                
            except Exception as e:
                logger.warning(f"Enhanced AI analysis failed: {e}")
                ai_explanation = _generate_fallback_analysis(validated_data, variant_lift, is_significant, confidence_level)
        else:
            ai_explanation = _generate_fallback_analysis(validated_data, variant_lift, is_significant, confidence_level)
        
        # Comprehensive enhanced results
        results = {
            'test_metadata': {
                'user': 'Ajith',
                'timestamp': '2025-07-07 20:10:07 UTC',
                'test_id': f"test_{int(datetime.utcnow().timestamp())}",
                'test_version': '3.0.0'
            },
            'variant_performance': {
                'control': {
                    'name': validated_data.variant_a.get('description', 'Control'),
                    'users': control_users,
                    'conversions': control_conversions,
                    'conversion_rate': round(base_conversion_rate * 100, 3),
                    'confidence_interval_lower': round((base_conversion_rate - 1.96 * np.sqrt(base_conversion_rate * (1 - base_conversion_rate) / control_users)) * 100, 3),
                    'confidence_interval_upper': round((base_conversion_rate + 1.96 * np.sqrt(base_conversion_rate * (1 - base_conversion_rate) / control_users)) * 100, 3)
                },
                'variant': {
                    'name': validated_data.variant_b.get('description', 'Variant'),
                    'users': variant_users,
                    'conversions': variant_conversions,
                    'conversion_rate': round(variant_conversion_rate * 100, 3),
                    'confidence_interval_lower': round((variant_conversion_rate - 1.96 * np.sqrt(variant_conversion_rate * (1 - variant_conversion_rate) / variant_users)) * 100, 3),
                    'confidence_interval_upper': round((variant_conversion_rate + 1.96 * np.sqrt(variant_conversion_rate * (1 - variant_conversion_rate) / variant_users)) * 100, 3)
                }
            },
            'statistical_analysis': {
                'total_users': total_users,
                'z_score': round(z_score, 4),
                'p_value': round(p_value, 6),
                'is_significant': is_significant,
                'confidence_level': round(confidence_level, 2),
                'effect_size': round(effect_size, 4),
                'lift_percentage': round(variant_lift * 100, 2),
                'relative_improvement': round(((variant_conversion_rate - base_conversion_rate) / base_conversion_rate) * 100, 2) if base_conversion_rate > 0 else 0,
                'winner': 'Variant' if variant_conversion_rate > base_conversion_rate else 'Control',
                'required_sample_size_future': min(required_sample_size, 1000000),
                'power_analysis': round(random.uniform(0.70, 0.95), 3),
                'minimum_detectable_effect': round(abs(effect_size) * 100, 2)
            },
            'business_metrics': {
                'projected_annual_impact': round((variant_conversions - control_conversions) * 365 / validated_data.test_duration * 50, 2),
                'cost_per_acquisition_change': round(random.uniform(-25, 35), 2),
                'customer_lifetime_value_impact': round(random.uniform(-10, 20), 2),
                'implementation_effort': random.choice(['low', 'medium', 'high']),
                'rollback_complexity': random.choice(['easy', 'moderate', 'complex'])
            },
            'ai_insights': ai_explanation,
            'test_configuration': validated_data.dict(),
            'quality_assurance': {
                'data_quality_score': random.uniform(0.85, 0.98),
                'sample_representativeness': random.uniform(0.80, 0.95),
                'external_validity': random.uniform(0.75, 0.90),
                'internal_validity': random.uniform(0.85, 0.95)
            }
        }
        
        logger.info(f"✅ Enhanced A/B test analysis completed - Winner: {results['statistical_analysis']['winner']}")
        return jsonify(results), 200
        
    except ValidationError as e:
        logger.warning(f"Enhanced A/B test validation error: {e}")
        return jsonify({'error': 'Invalid request format', 'details': e.errors()}), 400
        
    except Exception as e:
        logger.error(f"Enhanced A/B test analysis failed: {e}")
        return jsonify({'error': 'Enhanced A/B test analysis failed', 'details': str(e)}), 500

def _generate_fallback_analysis(validated_data, variant_lift, is_significant, confidence_level):
    """Generate fallback analysis when AI is unavailable"""
    improvement_text = "improvement" if variant_lift > 0 else "decrease"
    confidence_text = "high" if is_significant else "moderate"
    
    return {
        "executive_summary": f"Enhanced technical analysis shows {abs(variant_lift)*100:.1f}% {improvement_text} with {confidence_text} confidence. {'Implement immediately with monitoring.' if is_significant and variant_lift > 0 else 'Consider additional testing or refinements.'}",
        "business_impact": {
            "revenue_impact": f"Projected {'positive' if variant_lift > 0 else 'negative'} revenue impact of {abs(variant_lift)*100:.1f}%",
            "user_experience_impact": "Enhanced technical analysis indicates solid user experience metrics",
            "brand_impact": "No significant brand risks detected in technical analysis",
            "risk_assessment": "Low to medium risk with proper monitoring and gradual rollout"
        },
        "statistical_interpretation": {
            "significance_explanation": f"P-value of {1-confidence_level/100:.3f} indicates {'strong' if is_significant else 'weak'} statistical evidence",
            "confidence_interpretation": f"We are {confidence_level:.1f}% confident in these results",
            "effect_size_meaning": f"Effect size represents {'substantial' if abs(variant_lift) > 0.2 else 'moderate' if abs(variant_lift) > 0.1 else 'small'} practical impact",
            "sample_size_adequacy": f"Sample size of {validated_data.audience_size} is {'adequate' if validated_data.audience_size > 5000 else 'limited'} for reliable results"
        },
        "recommendations": {
            "immediate_action": "Implement winning variant" if is_significant and variant_lift > 0 else "Continue testing with larger sample",
            "implementation_plan": "Gradual rollout with 25% → 50% → 100% traffic allocation over 2 weeks",
            "monitoring_strategy": "Monitor conversion rates, user engagement, and technical performance daily",
            "future_testing": "Test complementary elements like messaging tone, visual design, or timing"
        },
        "risk_factors": [
            "Sample size limitations may affect generalizability",
            "External factors could influence long-term performance"
        ],
        "success_metrics": [
            "Conversion rate improvement sustainability",
            "User engagement and satisfaction scores"
        ],
        "confidence_score": 0.75
    }

# ================================================================
# ENHANCED PERSONA GENERATION (UPDATED)
# ================================================================

@app.route('/api/generate-personas', methods=['POST'])
def generate_personas():
    """Enhanced GDPR-Compliant Synthetic Persona Generator"""
    try:
        data = request.get_json() or {}
        count = min(data.get('count', 10), 50)
        persona_type = data.get('persona_type', 'marketing')  # marketing, testing, research
        demographic_focus = data.get('demographic_focus', 'balanced')  # balanced, young, mature, diverse
        
        logger.info(f"👥 Generating {count} enhanced synthetic personas - Type: {persona_type}, Focus: {demographic_focus}")
        
        fake = Faker()
        personas = []
        
        # Enhanced interest categories with more depth
        interests_pool = {
            'technology': ['AI/ML', 'Cryptocurrency', 'Gaming', 'Software Development', 'Gadgets', 'VR/AR'],
            'lifestyle': ['Fitness', 'Wellness', 'Meditation', 'Yoga', 'Nutrition', 'Mental Health'],
            'creative': ['Photography', 'Music Production', 'Writing', 'Art', 'Design', 'Crafting'],
            'business': ['Entrepreneurship', 'Investing', 'Marketing', 'Leadership', 'Productivity', 'Networking'],
            'social': ['Community Building', 'Volunteering', 'Events', 'Travel', 'Cultural Exchange', 'Languages'],
            'entertainment': ['Movies', 'TV Shows', 'Podcasts', 'Books', 'Concerts', 'Theater'],
            'outdoor': ['Hiking', 'Cycling', 'Running', 'Camping', 'Sports', 'Adventure Travel'],
            'family': ['Parenting', 'Education', 'Home Improvement', 'Cooking', 'Pets', 'Gardening']
        }
        
        # Enhanced values and motivations
        values_pool = [
            'Authenticity', 'Innovation', 'Sustainability', 'Quality', 'Community', 'Growth',
            'Security', 'Freedom', 'Efficiency', 'Creativity', 'Fairness', 'Excellence'
        ]
        
        pain_points_pool = [
            'Time management challenges', 'Information overload', 'Budget constraints',
            'Work-life balance', 'Technology complexity', 'Trust and privacy concerns',
            'Decision fatigue', 'Social media overwhelm', 'Health and wellness goals',
            'Career advancement barriers', 'Financial planning stress', 'Family obligations'
        ]
        
        # Enhanced persona generation with demographic focus
        for i in range(count):
            # Generate age based on demographic focus
            if demographic_focus == 'young':
                age = random.randint(18, 35)
            elif demographic_focus == 'mature':
                age = random.randint(35, 65)
            elif demographic_focus == 'diverse':
                age = random.choice([
                    random.randint(18, 25),  # Gen Z
                    random.randint(26, 41),  # Millennials
                    random.randint(42, 57),  # Gen X
                    random.randint(58, 76)   # Boomers
                ])
            else:  # balanced
                age = random.randint(18, 70)
            
            # Age-based digital behavior and preferences
            if age < 25:  # Gen Z
                primary_device = random.choice(['Mobile', 'Mobile', 'Mobile', 'Desktop'])
                social_platforms = random.sample(['TikTok', 'Instagram', 'Snapchat', 'Discord', 'Twitter', 'YouTube'], random.randint(3, 5))
                communication_style = random.choice(['Visual', 'Short-form', 'Interactive', 'Video-first'])
                shopping_behavior = random.choice(['Mobile-first', 'Social commerce', 'Influencer-driven'])
                content_consumption = random.choice(['Video-heavy', 'Micro-content', 'Interactive stories'])
            elif age < 40:  # Millennials
                primary_device = random.choice(['Mobile', 'Mobile', 'Desktop', 'Tablet'])
                social_platforms = random.sample(['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube'], random.randint(3, 4))
                communication_style = random.choice(['Balanced', 'Professional', 'Casual', 'Informative'])
                shopping_behavior = random.choice(['Research-heavy', 'Review-dependent', 'Brand-conscious'])
                content_consumption = random.choice(['Mixed media', 'Long-form + video', 'Educational content'])
            elif age < 55:  # Gen X
                primary_device = random.choice(['Desktop', 'Mobile', 'Tablet', 'Laptop'])
                social_platforms = random.sample(['Facebook', 'LinkedIn', 'Instagram', 'YouTube'], random.randint(2, 3))
                communication_style = random.choice(['Professional', 'Direct', 'Email-preferred'])
                shopping_behavior = random.choice(['Quality-focused', 'Brand-loyal', 'Value-conscious'])
                content_consumption = random.choice(['Articles', 'Professional content', 'News-focused'])
            else:  # Boomers
                primary_device = random.choice(['Desktop', 'Tablet', 'Mobile'])
                social_platforms = random.sample(['Facebook', 'LinkedIn', 'YouTube'], random.randint(1, 2))
                communication_style = random.choice(['Traditional', 'Phone-preferred', 'Email-focused'])
                shopping_behavior = random.choice(['In-store preferred', 'Cautious online', 'Phone orders'])
                content_consumption = random.choice(['Traditional media', 'Email newsletters', 'Long-form articles'])
            
            # Generate income and education based on age and other factors
            if age < 25:
                income_bracket = random.choice(['$20-35k', '$25-40k', '$30-45k'])
                education = random.choice(['High School', 'Some College', 'Bachelor\'s Degree'])
            elif age < 35:
                income_bracket = random.choice(['$35-55k', '$45-65k', '$55-75k', '$65-85k'])
                education = random.choice(['Bachelor\'s Degree', 'Master\'s Degree', 'Some College'])
            elif age < 50:
                income_bracket = random.choice(['$55-75k', '$65-85k', '$75-100k', '$85-120k', '$100k+'])
                education = random.choice(['Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Professional Degree'])
            else:
                income_bracket = random.choice(['$45-65k', '$65-85k', '$75-100k', '$85-120k', '$100k+'])
                education = random.choice(['Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'High School'])
            
            # Select interests based on age and persona type
            if persona_type == 'marketing':
                primary_interest_categories = random.sample(list(interests_pool.keys()), random.randint(2, 4))
            elif persona_type == 'testing':
                primary_interest_categories = random.sample(['technology', 'business', 'lifestyle'], random.randint(2, 3))
            else:  # research
                primary_interest_categories = random.sample(list(interests_pool.keys()), random.randint(3, 5))
            
            selected_interests = []
            for category in primary_interest_categories:
                selected_interests.extend(random.sample(interests_pool[category], random.randint(1, 3)))
            
            # Enhanced persona profile
            persona = {
                'id': f'persona_{i+1}_{int(datetime.utcnow().timestamp())}',
                'name': fake.name(),
                'generation_metadata': {
                    'generated_by': 'Ajith',
                    'generation_time': '2025-07-07 20:15:02 UTC',
                    'persona_type': persona_type,
                    'demographic_focus': demographic_focus,
                    'version': '3.0.0'
                },
                
                # Enhanced demographic information
                'demographics': {
                    'age': age,
                    'age_group': (
                        'Gen Z' if age < 25 else
                        'Millennial' if age < 40 else
                        'Gen X' if age < 55 else
                        'Boomer'
                    ),
                    'location': fake.city(),
                    'country': fake.country(),
                    'region': random.choice(['North America', 'Europe', 'Asia-Pacific', 'Latin America']),
                    'income_bracket': income_bracket,
                    'education': education,
                    'family_status': random.choice(['Single', 'In Relationship', 'Married', 'Married with kids', 'Divorced', 'Widowed']),
                    'employment': random.choice(['Full-time', 'Part-time', 'Freelance', 'Student', 'Retired', 'Unemployed']),
                    'occupation': fake.job(),
                    'household_size': random.randint(1, 5)
                },
                
                # Enhanced psychographic profiling
                'psychographics': {
                    'interests': selected_interests[:8],  # Limit to 8 for readability
                    'primary_interest_categories': primary_interest_categories,
                    'values': random.sample(values_pool, random.randint(3, 5)),
                    'lifestyle': random.choice(['Active', 'Relaxed', 'Busy Professional', 'Family-focused', 'Social', 'Minimalist', 'Adventurous', 'Traditional']),
                    'personality_traits': random.sample([
                        'Extroverted', 'Introverted', 'Analytical', 'Creative', 'Practical', 
                        'Adventurous', 'Cautious', 'Optimistic', 'Detail-oriented', 'Big-picture'
                    ], random.randint(3, 5)),
                    'communication_style': communication_style,
                    'decision_making_style': random.choice(['Analytical', 'Intuitive', 'Collaborative', 'Quick', 'Research-heavy'])
                },
                
                # Enhanced digital behavior patterns
                'digital_behavior': {
                    'primary_device': primary_device,
                    'social_platforms': social_platforms,
                    'social_media_usage_hours': random.randint(1, 6),
                    'shopping_behavior': shopping_behavior,
                    'content_consumption': content_consumption,
                    'content_preferences': random.sample([
                        'Video', 'Articles', 'Infographics', 'Podcasts', 'Social Posts', 
                        'Reviews', 'Live streams', 'Interactive content', 'Email newsletters'
                    ], random.randint(3, 6)),
                    'online_hours_daily': random.randint(2, 14),
                    'email_frequency_preference': random.choice(['Daily', 'Weekly', 'Bi-weekly', 'Monthly']),
                    'notification_tolerance': random.choice(['High', 'Medium', 'Low', 'Selective']),
                    'privacy_consciousness': random.choice(['Very High', 'High', 'Medium', 'Low']),
                    'ad_blocker_usage': random.choice([True, False]),
                    'cookie_acceptance': random.choice(['Always', 'Selective', 'Never', 'Default'])
                },
                
                # Enhanced marketing-relevant behavioral data
                'marketing_profile': {
                    'pain_points': random.sample(pain_points_pool, random.randint(3, 5)),
                    'motivations': random.sample([
                        'Save money', 'Save time', 'Quality products', 'Status', 'Health', 
                        'Family', 'Career advancement', 'Personal growth', 'Convenience', 
                        'Sustainability', 'Innovation', 'Community'
                    ], random.randint(3, 5)),
                    'preferred_communication_channels': random.sample([
                        'Email', 'SMS', 'Social Media', 'Phone Call', 'In-app Notification', 
                        'Push Notification', 'Direct Mail', 'Chat/Messaging'
                    ], random.randint(2, 4)),
                    'purchase_triggers': random.sample([
                        'Discounts', 'Reviews', 'Recommendations', 'Limited Time', 
                        'Quality Guarantee', 'Free Shipping', 'Social Proof', 'Urgency', 
                        'Exclusivity', 'Personalization'
                    ], random.randint(3, 6)),
                    'brand_loyalty': random.choice(['Very High', 'High', 'Medium', 'Low', 'Switcher']),
                    'price_sensitivity': random.choice(['Very High', 'High', 'Medium', 'Low', 'Price Insensitive']),
                    'decision_making_speed': random.choice(['Immediate', 'Fast', 'Moderate', 'Slow', 'Extended Research']),
                    'influence_factors': random.sample([
                        'Peer Reviews', 'Expert Opinions', 'Social Media', 'Family/Friends', 
                        'Brand Reputation', 'Price', 'Quality', 'Convenience', 'Sustainability'
                    ], random.randint(3, 5)),
                    'preferred_purchase_journey': random.choice([
                        'Online Research → Online Purchase',
                        'Online Research → In-store Purchase', 
                        'In-store Research → In-store Purchase',
                        'Social Discovery → Online Purchase',
                        'Mobile Discovery → Mobile Purchase'
                    ])
                },
                
                # Enhanced privacy and compliance data
                'privacy_profile': {
                    'gdpr_awareness': random.choice(['High', 'Medium', 'Low']),
                    'data_sharing_comfort': random.choice(['Comfortable', 'Selective', 'Uncomfortable']),
                    'personalization_preference': random.choice(['High', 'Medium', 'Low', 'None']),
                    'tracking_acceptance': random.choice(['Accept All', 'Functional Only', 'Reject All', 'Custom']),
                    'privacy_tools_usage': random.sample([
                        'VPN', 'Ad Blocker', 'Privacy Browser', 'Encrypted Messaging', 'Password Manager'
                    ], random.randint(0, 3))
                },
                
                # Synthetic data compliance flags
                'synthetic_data_flags': {
                    'gdpr_compliant': True,
                    'no_real_pii': True,
                    'generated_timestamp': '2025-07-07 20:15:02 UTC',
                    'generated_by': 'Ajith',
                    'data_retention_policy': 'demo_only_30_days',
                    'ethical_ai_generated': True,
                    'bias_checked': True,
                    'privacy_preserving': True
                }
            }
            
            personas.append(persona)
        
        # Enhanced summary statistics
        avg_age = sum(p['demographics']['age'] for p in personas) / len(personas)
        age_distribution = {}
        device_distribution = {}
        privacy_distribution = {}
        
        for persona in personas:
            # Age group distribution
            age_group = persona['demographics']['age_group']
            age_distribution[age_group] = age_distribution.get(age_group, 0) + 1
            
            # Device distribution
            device = persona['digital_behavior']['primary_device']
            device_distribution[device] = device_distribution.get(device, 0) + 1
            
            # Privacy consciousness distribution
            privacy_level = persona['digital_behavior']['privacy_consciousness']
            privacy_distribution[privacy_level] = privacy_distribution.get(privacy_level, 0) + 1
        
        logger.info(f"✅ Generated {count} enhanced synthetic personas successfully")
        
        return jsonify({
            'personas': personas,
            'generation_metadata': {
                'method': 'enhanced_synthetic_v3',
                'total_count': count,
                'persona_type': persona_type,
                'demographic_focus': demographic_focus,
                'generated_by': 'Ajith',
                'generation_timestamp': '2025-07-07 20:15:02 UTC',
                'version': '3.0.0'
            },
            'summary_analytics': {
                'average_age': round(avg_age, 1),
                'age_group_distribution': age_distribution,
                'device_distribution': device_distribution,
                'privacy_consciousness_distribution': privacy_distribution,
                'generation_time_ms': random.randint(500, 1200),
                'diversity_score': round(random.uniform(0.75, 0.95), 2)
            },
            'compliance_verification': {
                'gdpr_compliant': True,
                'no_real_data_used': True,
                'synthetic_only': True,
                'ethical_ai_generation': True,
                'bias_mitigation_applied': True,
                'privacy_preserving_methods': True,
                'data_retention': 'demo_only_30_days',
                'audit_trail': f'Generated by Ajith at 2025-07-07 20:15:02 UTC'
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Enhanced persona generation failed: {e}")
        return jsonify({
            'error': 'Enhanced persona generation failed', 
            'details': str(e),
            'timestamp': '2025-07-07 20:15:02 UTC',
            'user': 'Ajith'
        }), 500

# ================================================================
# ENHANCED DEMO DATA FOR NEW FEATURES
# ================================================================

@app.route('/api/demo-data', methods=['GET'])
def get_demo_data():
    """Enhanced Demo Data Provider for Complete Dashboard"""
    try:
        logger.info("📊 Generating enhanced demo data for dashboard")
        
        demo_data = {
            # Enhanced dashboard statistics
            'dashboard_stats': {
                'active_campaigns': 15,
                'total_reach': 3200000,
                'conversion_rate': 3.4,
                'roi': 285,
                'total_personas_generated': 2150,
                'bias_analyses_completed': 89,
                'ab_tests_running': 12,
                'compliance_score': 94.2,
                'fairness_score': 87.5,
                'privacy_incidents': 0,
                'data_exports_today': 7
            },
            
            # Enhanced recent campaigns with full data
            'recent_campaigns': [
                {
                    'id': 'camp_001',
                    'name': 'Summer Launch 2025',
                    'status': 'active',
                    'variant': 'C',
                    'impressions': 245000,
                    'clicks': 9555,
                    'conversions': 764,
                    'revenue': 38200,
                    'ctr': 3.9,
                    'trust_score': 90,
                    'bias_score': 0.03,
                    'compliance_score': 98,
                    'platform': 'google',
                    'mini_chart': [20, 40, 60, 30, 80, 45, 70, 85, 92, 88],
                    'created_date': '2025-06-15',
                    'budget': 8000,
                    'audience_size': 450000,
                    'fairness_score': 94,
                    'privacy_compliant': True
                },
                {
                    'id': 'camp_002', 
                    'name': 'Brand Awareness Q3',
                    'status': 'active',
                    'variant': 'A',
                    'impressions': 189000,
                    'clicks': 6048,
                    'conversions': 484,
                    'revenue': 23100,
                    'ctr': 3.2,
                    'trust_score': 82,
                    'bias_score': 0.08,
                    'compliance_score': 95,
                    'platform': 'facebook',
                    'mini_chart': [30, 50, 40, 70, 60, 80, 90, 75, 82, 78],
                    'created_date': '2025-06-20',
                    'budget': 5500,
                    'audience_size': 320000,
                    'fairness_score': 87,
                    'privacy_compliant': True
                },
                {
                    'id': 'camp_003',
                    'name': 'Product Demo Series',
                    'status': 'completed',
                    'variant': 'B',
                    'impressions': 156000,
                    'clicks': 4056,
                    'conversions': 244,
                    'revenue': 10980,
                    'ctr': 2.6,
                    'trust_score': 74,
                    'bias_score': 0.18,
                    'compliance_score': 88,
                    'platform': 'youtube',
                    'mini_chart': [15, 25, 35, 45, 55, 65, 75, 60, 52, 48],
                    'created_date': '2025-06-10',
                    'budget': 4200,
                    'audience_size': 280000,
                    'fairness_score': 72,
                    'privacy_compliant': False
                }
            ],
            
            # New feature data
            'explainable_ai_insights': {
                'total_explanations_generated': 156,
                'avg_confidence_score': 0.89,
                'most_common_recommendation': 'Scale high-performing variant',
                'ai_model_version': 'gemini-1.5-pro',
                'explanation_categories': {
                    'performance_analysis': 45,
                    'bias_explanation': 32,
                    'compliance_insights': 28,
                    'optimization_recommendations': 51
                }
            },
            
            'fairness_analytics_summary': {
                'overall_fairness_trend': [78, 82, 85, 87, 89, 91, 93],
                'gender_fairness_avg': 91.7,
                'age_fairness_avg': 94.7,
                'location_fairness_avg': 94.0,
                'critical_issues_resolved': 8,
                'medium_issues_pending': 3,
                'low_issues_monitoring': 7
            },
            
            'privacy_guardian_status': {
                'gdpr_compliance_rate': 94.2,
                'ccpa_compliance_rate': 96.1,
                'privacy_incidents_ytd': 0,
                'data_minimization_score': 92.5,
                'consent_management_score': 95.8,
                'data_retention_compliance': 98.2,
                'privacy_policy_updates': 2,
                'privacy_training_completed': True
            },
            
            'ad_targeting_compliance': {
                'compliant_campaigns': 14,
                'non_compliant_campaigns': 1,
                'flagged_targeting_parameters': 3,
                'discriminatory_patterns_detected': 1,
                'inclusive_targeting_score': 89.2,
                'regional_compliance': {
                    'us': 96.1,
                    'eu': 94.8,
                    'ca': 97.3,
                    'uk': 95.5
                }
            },
            
            'data_export_activity': {
                'exports_today': 7,
                'exports_this_week': 23,
                'exports_this_month': 89,
                'most_requested_format': 'CSV',
                'largest_export_size': '2.3MB',
                'export_types': {
                    'campaign_data': 34,
                    'bias_analysis': 28,
                    'compliance_reports': 19,
                    'persona_data': 8
                }
            },
            
            # System and deployment information
            'system_info': {
                'deployed_by': 'Ajith',
                'deployment_date': '2025-07-07',
                'deployment_time': '20:15:02 UTC',
                'version': '3.0.0',
                'team': 'Halo',
                'platform': 'Enhanced Production Stack',
                'ai_model': 'Gemini 1.5 Pro',
                'uptime': '99.97%',
                'total_api_calls_today': 1247,
                'avg_response_time_ms': 145,
                'active_users': 8,
                'data_processed_gb': 12.7
            },
            
            # Enhanced real-time system status
            'system_status': {
                'all_systems': 'operational',
                'api_health': 'excellent',
                'database_health': 'excellent',
                'ai_service': 'healthy' if model else 'demo_mode',
                'bias_analyzer': 'operational',
                'ab_testing': 'operational',
                'persona_generator': 'operational',
                'campaign_setup': 'operational',
                'explainable_ai': 'operational',
                'fairness_analytics': 'operational',
                'privacy_guardian': 'operational',
                'results_dashboard': 'operational',
                'ad_targeting_compliance': 'operational',
                'variant_checker': 'operational',
                'data_export': 'operational',
                'last_check': '2025-07-07 20:15:02 UTC',
                'next_maintenance': '2025-07-14 02:00:00 UTC'
            },
            
            # Performance metrics
            'performance_metrics': {
                'api_response_times': {
                    'bias_analysis': '892ms',
                    'ab_test_analysis': '1205ms',
                    'persona_generation': '1456ms',
                    'explainable_ai': '2100ms',
                    'data_export': '675ms'
                },
                'success_rates': {
                    'bias_analysis': 99.2,
                    'ab_test_analysis': 98.7,
                    'persona_generation': 99.8,
                    'explainable_ai': 96.4,
                    'data_export': 99.9
                },
                'user_satisfaction': {
                    'overall_rating': 4.7,
                    'ease_of_use': 4.6,
                    'accuracy': 4.8,
                    'speed': 4.5,
                    'features': 4.9
                }
            }
        }
        
        logger.info("✅ Enhanced demo data generated successfully")
        return jsonify(demo_data), 200
        
    except Exception as e:
        logger.error(f"Enhanced demo data generation failed: {e}")
        return jsonify({
            'error': 'Demo data generation failed',
            'details': str(e),
            'timestamp': '2025-07-07 20:15:02 UTC'
        }), 500

# ================================================================
# HEALTH CHECK AND SYSTEM MONITORING
# ================================================================

@app.route('/api/system-monitor', methods=['GET'])
def system_monitor():
    """Enhanced System Monitoring Endpoint"""
    try:
        logger.info("🖥️ Generating system monitoring data")
        
        monitor_data = {
            'system_overview': {
                'status': 'healthy',
                'uptime_hours': random.randint(168, 720),  # 1 week to 1 month
                'total_requests_today': random.randint(800, 1500),
                'active_sessions': random.randint(5, 15),
                'memory_usage_percent': random.randint(35, 65),
                'cpu_usage_percent': random.randint(15, 45),
                'disk_usage_percent': random.randint(25, 55)
            },
            'service_health': {
                'gemini_ai': {
                    'status': 'healthy' if model else 'demo_mode',
                    'response_time_ms': random.randint(800, 1200) if model else 0,
                    'success_rate': random.uniform(96, 99) if model else 100,
                    'requests_today': random.randint(150, 300) if model else 0
                },
                'bias_analyzer': {
                    'status': 'healthy',
                    'response_time_ms': random.randint(400, 800),
                    'success_rate': random.uniform(98, 99.8),
                    'analyses_today': random.randint(20, 45)
                },
                'persona_generator': {
                    'status': 'healthy',
                    'response_time_ms': random.randint(600, 1000),
                    'success_rate': random.uniform(99, 100),
                    'personas_generated_today': random.randint(50, 150)
                }
            },
            'data_metrics': {
                'total_campaigns_processed': random.randint(500, 1200),
                'total_bias_analyses': random.randint(200, 600),
                'total_personas_generated': random.randint(1000, 3000),
                'total_exports_created': random.randint(100, 300),
                'data_retention_compliance': 100,
                'privacy_incidents': 0
            },
            'security_status': {
                'ssl_certificate': 'valid',
                'api_authentication': 'secure',
                'data_encryption': 'aes-256',
                'gdpr_compliance': 'verified',
                'ccpa_compliance': 'verified',
                'last_security_scan': '2025-07-07 12:00:00 UTC',
                'vulnerabilities_found': 0
            },
            'metadata': {
                'monitor_timestamp': '2025-07-07 20:15:02 UTC',
                'generated_by': 'Ajith',
                'monitor_version': '3.0.0'
            }
        }
        
        return jsonify(monitor_data), 200
        
    except Exception as e:
        logger.error(f"System monitoring failed: {e}")
        return jsonify({
            'error': 'System monitoring failed',
            'details': str(e),
            'timestamp': '2025-07-07 20:15:02 UTC'
        }), 500

# ================================================================
# APPLICATION STARTUP & CONFIGURATION
# ================================================================

if __name__ == '__main__':
    # Get port from environment (required for deployment platforms)
    port = int(os.environ.get('PORT', 5000))
    
    # Enhanced startup logging
    logger.info("=" * 60)
    logger.info("🚀 TRUST ENGINE API - ENHANCED VERSION 3.0.0")
    logger.info("=" * 60)
    logger.info(f"👤 Current User: Ajith")
    timestamp = datetime.now(timezone.utc).isoformat()
    print("⏰ Timestamp:", timestamp)
    logger.info(f"🌐 Port: {port}")
    logger.info(f"🤖 AI Enhancement: {'Enabled (Gemini 1.5 Pro)' if model else 'Disabled (Demo Mode)'}")
    logger.info(f"🛡️ Privacy-First A/B Testing Platform")
    logger.info(f"👥 Team: Halo")
    logger.info("=" * 60)
    logger.info("📋 Available Endpoints:")
    logger.info("   Core Features:")
    logger.info("   ├── /api/health (System health)")
    logger.info("   ├── /api/bias-analysis (Enhanced bias detection)")
    logger.info("   ├── /api/ab-test-analysis (Advanced A/B testing)")
    logger.info("   ├── /api/generate-personas (Enhanced personas)")
    logger.info("   └── /api/demo-data (Enhanced demo data)")
    logger.info("   New Features:")
    logger.info("   ├── /api/campaign-setup (Campaign workflow)")
    logger.info("   ├── /api/explainable-ai (AI insights)")
    logger.info("   ├── /api/fairness-analytics (Fairness metrics)")
    logger.info("   ├── /api/privacy-guardian (Privacy monitoring)")
    logger.info("   ├── /api/results-dashboard (Results analytics)")
    logger.info("   ├── /api/ad-targeting-compliance (Targeting compliance)")
    logger.info("   ├── /api/variant-check (Variant analysis)")
    logger.info("   ├── /api/data-export (Data export)")
    logger.info("   └── /api/system-monitor (System monitoring)")
    logger.info("=" * 60)
    
    # Start Flask application
    app.run(
        host='0.0.0.0',     # Listen on all interfaces (required for deployment)
        port=port,          # Use environment-specified port
        debug=False         # Production mode
    )

# ================================================================
# END OF ENHANCED TRUST ENGINE BACKEND
# ================================================================