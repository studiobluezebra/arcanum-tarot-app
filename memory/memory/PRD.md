# Arcanum - Tarot Reading Application

## Original Problem Statement
Build a tarot reading application with AI-powered interpretations, custom artwork, and a vintage/occult aesthetic.

## Core Requirements
- **AI Engine**: OpenAI GPT-5.2 for card interpretations (via Emergent LLM Key)
- **Design Theme**: Vintage/occult aesthetic
- **No Reversed Cards**: All cards displayed upright only
- **Custom Artwork**: User provides their own 78-card tarot deck artwork
- **Multiple Deck Support**: Support for different deck themes (cosmetic only)

## Core Features
1. **Daily Card** - Get a daily tarot card with AI interpretation
2. **3-Card Spread** - Past, Present, Future spread with required question input
3. **Reading History** - View past readings (session-based, non-persistent)
4. **Card Library** - Browse all 78 tarot cards with deck selector

## Deck Themes
| Deck | Description | Status |
|------|-------------|--------|
| Original | The timeless standard deck for clear guidance | ✅ Active (36 cards) |
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
- **Database**: MongoDB (for readings and daily cards)
- **AI Integration**: OpenAI via emergentintegrations library

## File Structure
```
/app
├── backend/
│   └── server.py       # FastAPI server, card data, OpenAI integration
├── frontend/
│   ├── public/
│   │   └── cards/
│   │       ├── original/   # Original deck images (m00.png, c01.png, etc.)
│   │       ├── anime/      # Empty, ready for future art
│   │       ├── alchemy/
│   │       ├── midnight/
│   │       └── ethereal/
│   ├── src/
│   │   ├── context/
│   │   │   └── DeckContext.js  # Deck selection state management
│   │   ├── components/
│   │   │   ├── TarotCard.js    # Card display with deck support
│   │   │   └── Navigation.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── DrawCard.js
│   │   │   ├── CardLibrary.js  # Deck selector UI
│   │   │   └── History.js
│   │   └── App.js
│   └── tailwind.config.js
└── memory/
    └── PRD.md
```

## API Endpoints
- `GET /api/decks` - Get all available deck themes
- `GET /api/cards?deck=original` - Get all cards with image URLs for a deck
- `GET /api/cards/{id}?deck=original` - Get single card
- `POST /api/draw` - Draw cards for reading
- `POST /api/interpret` - Get AI interpretation
- `GET /api/daily-card` - Get daily card
- `GET /api/readings` - Get reading history
- `POST /api/readings` - Save reading

## Custom Artwork Progress (Original Deck)
| Suit | Cards | Files |
|------|-------|-------|
| Major Arcana | 22/22 ✅ | m00.png - m21.png |
| Cups | 14/14 ✅ | c01.png - c14.png |
| Wands | 0/14 | Awaiting artwork |
| Swords | 0/14 | Awaiting artwork |
| Pentacles | 0/14 | Awaiting artwork |
| Card Back | 1/1 ✅ | back.png |

**Total: 37/79 cards with custom artwork**

## Backlog

### P0 (Immediate - User Dependent)
- Integrate Wands suit artwork (w01-w14) when provided
- Integrate Swords suit artwork (s01-s14) when provided
- Integrate Pentacles suit artwork (p01-p14) when provided

### P1 (Important)
- Finalize app name (currently "Arcanum")
- Add custom logo
- Add shuffle animation when drawing cards

### P2 (Nice to Have)
- Color and font customization
- Persistent reading history
- Additional deck themes (Anime, Alchemy, Midnight, Ethereal)

## Changelog
- **Session 1**: Built complete React + FastAPI application
- **Session 1**: Integrated all Major Arcana and Cups artwork
- **Session 2**: Reorganized card structure with new naming (m00, c01, etc.)
- **Session 2**: Added multi-deck support with deck selector in Library
- **Session 2**: Created folder structure for 5 deck themes
