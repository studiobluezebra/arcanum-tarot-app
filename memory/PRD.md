# Flipwill - Tarot Decision Clarity App

## Product Overview
Flipwill is a tarot-based decision clarity application that helps users gain perspective on their situations through card readings. The app focuses on pattern recognition and decision framing rather than fortune-telling.

## Core Philosophy
- "No predictions. Just perspective."
- "Clarity begins with awareness"
- Focus on decision-making, not mysticism

## Current Features

### 1. Welcome Page
- Logo and app branding
- Philosophy explanation
- "Flip the card" entry button

### 2. Daily Perspective (Home)
- Daily card draw with interpretation
- "Your daily Perspective" / "A lens for today"
- Card image with name
- Disclaimer: "this is not a prediction - just a perspective to explore"
- User feedback: [yes] [not really] [no] → "saved"
- "Explore a decision" CTA

### 3. Explore a Decision (Draw Cards)
- Question input with examples
- "How to get the most insight" guidance
- Three-card spread draw
- "Reveal Perspectives" button

### 4. Reading Result Page
**Position Structure:**
- Influencing Forces (what shaped the situation)
- Current Mindset (what is active now)
- Emerging Direction (what may develop if nothing changes)

**Card Display:**
- Lens keyword chip (e.g., "OPPORTUNITY", "STALEMATE")
- Core dynamic one-liner
- Situation highlight bullet points
- AI interpretation

**Decision Insight Section:**
- Pattern: What connects the cards
- Tension: What dynamic exists
- Approach: Practical suggestion
- Next Step: Concrete 48-hour action

**Reflect Before Deciding:**
- 3 card-specific decision prompts
- "This creates decision momentum."

**Your Next Step:**
- [ I need more clarity ]
- [ I see what to do ]
- [ I want to explore another angle ]

### 5. Card Library
- View all 78 cards
- Deck selector (Original, Anime partial)

### 6. History
- View past readings (non-persistent)

## Technical Architecture

### Frontend (React)
- `/app/frontend/src/pages/Welcome.js` - Landing page
- `/app/frontend/src/pages/Home.js` - Daily card + navigation
- `/app/frontend/src/pages/DrawCard.js` - Card drawing flow
- `/app/frontend/src/pages/ReadingResult.js` - Reading display
- `/app/frontend/src/pages/CardLibrary.js` - Card browser
- `/app/frontend/src/context/DeckContext.js` - Deck state management

### Backend (FastAPI)
- `/app/backend/server.py` - Main API server
- `/app/backend/card_data.py` - 78-card template database

### Card Template Structure
Each card has:
- `lens_keyword` - Single-word theme
- `core_dynamic` - One-line essence
- `situation_highlight` - Contextual bullets
- `internal_state` - User's likely state
- `frictions` - Watch-outs
- `useful_responses` - Practical suggestions
- `decision_prompts` - Reflection questions

### Key API Endpoints
- `GET /api/daily-card` - Daily card with interpretation
- `GET /api/cards` - All cards for library
- `GET /api/decks` - Available decks
- `POST /api/draw` - Draw cards for spread
- `POST /api/interpret` - Get AI interpretation with card metadata

## Integrations
- **OpenAI GPT-5.2** via Emergent LLM key for interpretations
- **MongoDB** for daily card caching

## Assets
- `/app/frontend/public/cards/original/` - 78 complete cards
- `/app/frontend/public/cards/anime/` - 22 partial cards
- `/app/frontend/public/logo.png` - Main logo
- `/app/frontend/public/logo-horizontal.png` - Horizontal logo

## Completed Work (Feb 2025)

### Session 1
- Full rebranding to "Flipwill"
- Dark celestial theme implementation
- Welcome page creation
- Multi-deck system (Original + Anime partial)
- Card library redesign
- "Go Deeper" follow-up questions

### Session 2 (Current)
- Home page redesign (Daily Perspective)
- Draw page copy updates
- Reading result page restructure:
  - New position labels (Influencing Forces/Current Mindset/Emerging Direction)
  - Lens keyword chips
  - Core dynamic display
  - Structured Decision Insight format
  - Card-specific decision prompts
- **Interpretation Engine Foundation:**
  - Complete 78-card template database
  - Structured card data (lens_keyword, core_dynamic, decision_prompts, etc.)
  - Enhanced AI prompts using card templates
  - Card metadata passed to frontend

## Upcoming Tasks

### P0 (High Priority)
- Complete Anime deck (56 remaining cards + card back)
- User testing feedback incorporation

### P1 (Medium Priority)
- PWA support for mobile installation
- Monetization (Stripe subscriptions/premium decks)

### P2 (Lower Priority)
- User accounts with persistent reading history
- French language support (i18n)
- Additional deck artwork (Alchemy, Midnight, Ethereal)
- Card shuffle animation

## Design Guidelines
- **Colors:** Dark celestial (#141414 background, #D4AF37 gold accent)
- **Fonts:** Cinzel (headings), Roboto (body)
- **Tone:** Premium, clean, decision-focused (not mystical)
- **UX:** Skimmable, instant understanding, "aha" moments
