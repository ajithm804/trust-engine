# 📋 Trust Engine Deployment Checklist

**Developer:** Ajith  
**Time:** 2025-07-06 15:54:39 UTC  
**Platform:** Vercel + Render  
**Team:** Halo  

## 🚀 Pre-Deployment Setup

### Prerequisites ✅
- [ ] Node.js 18+ installed
- [ ] Python 3.11+ installed  
- [ ] Git installed and configured
- [ ] GitHub account set up
- [ ] Vercel account created (free tier)
- [ ] Render account created (free tier)
- [ ] Gemini API key obtained from https://makersuite.google.com/app/apikey

### Repository Setup ✅
- [ ] Project structure created correctly
- [ ] All 25 files created as specified
- [ ] Git repository initialized
- [ ] Initial commit made
- [ ] GitHub repository created
- [ ] Code pushed to GitHub (`git push origin main`)

## 🎨 Frontend Deployment (Vercel)

### Build Verification ✅
- [ ] `cd frontend` navigation successful
- [ ] `npm install` completed without errors
- [ ] `npm run build` completed successfully
- [ ] `dist/` folder created with assets
- [ ] No TypeScript errors (we're using plain JS)
- [ ] Tailwind CSS compiled correctly

### Vercel Deployment ✅
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Production environment file created (`.env.production`)
- [ ] `VITE_API_URL` set to backend URL
- [ ] `npx vercel --prod --yes` executed
- [ ] Deployment URL received
- [ ] Frontend accessible in browser
- [ ] No console errors in browser
- [ ] Responsive design working on mobile

### Frontend Testing ✅
- [ ] Homepage loads correctly
- [ ] Navigation between pages works
- [ ] Dashboard displays demo data
- [ ] Bias Detection page accessible
- [ ] A/B Test Simulator page accessible
- [ ] Persona Generator page accessible
- [ ] Header shows connection status
- [ ] Team Halo branding visible

## ⚙️ Backend Deployment (Render)

### Local Testing ✅
- [ ] `cd backend` navigation successful
- [ ] `pip install -r requirements.txt` completed
- [ ] `python app.py` starts without errors
- [ ] http://localhost:5000/api/health returns 200
- [ ] CORS configured for production domains
- [ ] All API endpoints responding locally

### Render Configuration ✅
- [ ] Render.com account logged in
- [ ] "New +" → "Web Service" selected
- [ ] GitHub repository connected
- [ ] Service name: `trust-engine-backend-hackathon`
- [ ] Root Directory: `backend`
- [ ] Environment: `Python 3`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 app:app`

### Environment Variables ✅
- [ ] `GEMINI_API_KEY` = your_actual_gemini_api_key
- [ ] `FLASK_ENV` = production
- [ ] `CORS_ORIGINS` = https://trust-engine-frontend.vercel.app
- [ ] All variables saved in Render dashboard

## 🧪 Final Testing Commands

```bash
# Backend health check
curl https://trust-engine-backend-hackathon.onrender.com/api/health

# Bias analysis test
curl -X POST https://trust-engine-backend-hackathon.onrender.com/api/bias-analysis \
  -H "Content-Type: application/json" \
  -d '{"content":"Hey guys, this is a test!","campaign_type":"email"}'

# A/B test analysis
curl -X POST https://trust-engine-backend-hackathon.onrender.com/api/ab-test-analysis \
  -H "Content-Type: application/json" \
  -d '{"test_name":"Subject Test","variant_a":{"description":"Save 20%"},"variant_b":{"description":"Limited Offer"},"audience_size":10000}'