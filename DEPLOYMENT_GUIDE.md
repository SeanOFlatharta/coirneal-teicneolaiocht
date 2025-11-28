# 🍀 Coirnéal Teicneolaíocht - Deployment Guide

## Phase 1: Frontend Deployment (Netlify - FREE)

### Files Ready for Deployment:
Your production build is in: `dist/angular-website/`

### Deploy to Netlify (Free):
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub, GitLab, or email
3. Click "Deploy manually" or drag & drop
4. Upload the entire `dist/angular-website/` folder
5. Get your free HTTPS URL: `https://random-name.netlify.app`

### Features Working:
- ✅ Beautiful Irish-themed website
- ✅ All navigation (Baile, Cé muid féin, Déan Teagmháil Linn)
- ✅ Responsive design for mobile
- ✅ Alphabet learning tool (Aibítir)
- ❌ Contact form (needs Phase 2 - backend)

### Custom Domain (Optional - $10-15/year):
- Buy domain (suggest: yourname.ie for Irish theme)
- Add to Netlify in Domain settings
- Automatic HTTPS included

## Phase 2: Backend Deployment (Railway/Render - FREE)

### Deploy Backend:
1. Go to [railway.app](https://railway.app) or [render.com](https://render.com)
2. Connect GitHub or upload backend folder
3. Add environment variables (Gmail credentials)
4. Get backend URL: `https://your-app.railway.app`

### Update Frontend:
1. Update `src/environments/environment.prod.ts` with backend URL
2. Rebuild: `ng build --configuration production`
3. Redeploy to Netlify

### Full Features:
- ✅ Contact form with email functionality
- ✅ Gmail integration working globally
- ✅ Professional HTTPS website

## Current Status:
✅ Phase 1 Ready - Frontend built and ready for Netlify
⏳ Phase 2 Pending - Backend deployment needed for contact form

## Cost: $0/month for both phases! 🎉