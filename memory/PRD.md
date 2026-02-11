# Arcanum - Tarot Reading Application

## Original Problem Statement
Build a tarot reading application with AI-powered interpretations, custom artwork, and a dark celestial aesthetic.

## Current Design
- **Theme**: Dark celestial (dark background #141414, gold accents #D4AF37)
- **Reading Layout**: Vertical with position labels, big card names, clean italic interpretations
- **Oracle's Synthesis**: Combined reading summary at the bottom

## Core Features
1. **Daily Card** - Get a daily tarot card with AI interpretation
2. **3-Card Spread** - Past, Present, Future spread with required question input
3. **Reading History** - View past readings
4. **Card Library** - Browse all 78 tarot cards with deck selector

## Deck Themes
| Deck | Description | Status |
|------|-------------|--------|
| Original | The timeless standard deck for clear guidance | ✅ Active (78 cards) |
| Anime | Vibrant expressive art for modern questions | ⏳ Coming soon |
| Alchemy | Antique finishes for deep introspection | ⏳ Coming soon |
| Midnight | Lunar energy for secrets and hidden truths | ⏳ Coming soon |
| Ethereal | Dream-like visions for spiritual work | ⏳ Coming soon |

## Card Naming Convention
| Type | Range | Example |
|------|-------|---------|
| Major Arcana | m00-m21 | m00 = The Fool, m21 = The World |
| Cups | c01-c14 | c01 = Ace, c14 = King |
| Pentacles | p01-p14 | p01 = Ace, p14 = King |
| Swords | s01-s14 | s01 = Ace, s14 = King |
| Wands | w01-w14 | w01 = Ace, w14 = King |

## Tech Stack
- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **AI Integration**: OpenAI GPT-5.2 via emergentintegrations library

## Custom Artwork Progress (Original Deck)
**COMPLETE: 78/78 cards + 1 card back**

| Suit | Cards | Status |
|------|-------|--------|
| Major Arcana | 22/22 | ✅ Complete |
| Cups | 14/14 | ✅ Complete |
| Wands | 14/14 | ✅ Complete |
| Swords | 14/14 | ✅ Complete |
| Pentacles | 14/14 | ✅ Complete |
| Card Back | 1/1 | ✅ Complete |

## File Structure
```
/app
├── backend/
│   └── server.py       # FastAPI server, card data, OpenAI integration
├── frontend/
│   ├── public/
│   │   └── cards/
│   │       └── original/   # All 78 card images + back.png
│   ├── src/
│   │   ├── context/
│   │   │   └── DeckContext.js
│   │   ├── components/
│   │   │   ├── TarotCard.js
│   │   │   └── Navigation.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── DrawCard.js
│   │   │   ├── ReadingResult.js  # Clean layout with Oracle's Synthesis
│   │   │   ├── CardLibrary.js
│   │   │   └── History.js
│   │   └── App.js
│   ├── tailwind.config.js  # Dark celestial theme colors
│   └── src/index.css       # CSS variables
└── memory/
    └── PRD.md
```

## API Endpoints
- `GET /api/decks` - Get all deck themes
- `GET /api/cards?deck=original` - Get all cards with images
- `POST /api/draw` - Draw cards for reading
- `POST /api/interpret` - Get AI interpretation (clean text, no markdown)
- `GET /api/daily-card` - Get daily card
- `GET /api/readings` - Get reading history
- `POST /api/readings` - Save reading

## Backlog

### P1 (Important)
- Finalize app name (currently "Arcanum")
- Add custom logo
- Shuffle animation when drawing cards

### P2 (Nice to Have)
- Font customization
- Additional deck themes artwork

## Changelog
- **Session 1**: Built complete React + FastAPI application
- **Session 1**: Integrated all Major Arcana and Cups artwork
- **Session 2**: Reorganized card structure with new naming (m00, c01, etc.)
- **Session 2**: Added multi-deck support with deck selector
- **Session 2**: Downloaded complete deck (78 cards) from GitHub
- **Session 2**: Applied dark celestial theme
- **Session 2**: Redesigned reading result page with clean layout and Oracle's Synthesis
- **Session 2**: Updated AI prompt for clean text without markdown
