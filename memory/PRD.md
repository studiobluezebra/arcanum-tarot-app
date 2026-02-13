# FlipWill - Decision Companion App

## Original Problem Statement
User requested 3 changes to their Flipwill decision companion app:
1. Daily card should be different per user (not same for everyone)
2. Hide "Reflect Before Deciding" section from reading results  
3. Improve "Decision Insight" layout - text was too compacted

## Architecture
- **Frontend**: React with Tailwind CSS, dark theme (#141414)
- **Backend**: FastAPI with MongoDB
- **LLM Integration**: OpenAI GPT-5.2 via Emergent integrations

## User Personas
- People facing decisions who want structured perspective
- Users seeking clarity without fortune-telling/predictions

## Core Requirements
- Welcome page with app philosophy
- Daily card with unique card per user
- Three-card decision spreads (Past/Present/Future mapped to Influencing Forces/Current Mindset/Emerging Direction)
- AI-generated interpretations focused on decision clarity

## What's Been Implemented
- **2024-02-13**: Daily card now unique per user (user_id + date seed)
- **2024-02-13**: Removed "Reflect Before Deciding" section
- **2024-02-13**: Improved Decision Insight readability (line-height: 2, larger text, paragraph breaks)

## Files Modified
- `/app/backend/server.py` - Added user_id parameter to daily-card endpoint
- `/app/frontend/src/pages/Home.js` - Added getUserId() with localStorage persistence
- `/app/frontend/src/pages/ReadingResult.js` - Removed Reflect section, improved Decision Insight styling

## Backlog
- P1: User accounts for cross-device card history
- P2: Share reading feature for social
- P3: Additional deck themes

## Next Tasks
- Push changes to GitHub via "Save to GitHub"
- Deploy to flipwill.com
