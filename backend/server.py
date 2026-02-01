from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import random
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

TAROT_CARDS = [
    {"id": "0", "name": "The Fool", "arcana": "major", "suit": None, "number": 0, "image_url": "/cards/00-fool.png", "keywords": ["new beginnings", "innocence", "spontaneity", "free spirit"], "upright_meaning": "New beginnings, optimism, trust in life", "reversed_meaning": "Recklessness, taken advantage of, inconsideration"},
    {"id": "1", "name": "The Magician", "arcana": "major", "suit": None, "number": 1, "image_url": "/cards/01-magician.png", "keywords": ["manifestation", "resourcefulness", "power", "inspired action"], "upright_meaning": "Manifestation, resourcefulness, power, inspired action", "reversed_meaning": "Manipulation, poor planning, untapped talents"},
    {"id": "2", "name": "The High Priestess", "arcana": "major", "suit": None, "number": 2, "image_url": "/cards/02-high-priestess.png", "keywords": ["intuition", "sacred knowledge", "divine feminine", "subconscious"], "upright_meaning": "Intuition, sacred knowledge, divine feminine, the subconscious mind", "reversed_meaning": "Secrets, disconnected from intuition, withdrawal"},
    {"id": "3", "name": "The Empress", "arcana": "major", "suit": None, "number": 3, "image_url": "/cards/03-empress.png", "keywords": ["femininity", "beauty", "nature", "nurturing", "abundance"], "upright_meaning": "Femininity, beauty, nature, nurturing, abundance", "reversed_meaning": "Creative block, dependence on others"},
    {"id": "4", "name": "The Emperor", "arcana": "major", "suit": None, "number": 4, "image_url": "/cards/04-emperor.png", "keywords": ["authority", "establishment", "structure", "father figure"], "upright_meaning": "Authority, establishment, structure, a father figure", "reversed_meaning": "Domination, excessive control, lack of discipline"},
    {"id": "5", "name": "The Hierophant", "arcana": "major", "suit": None, "number": 5, "image_url": "/cards/05-hierophant.png", "keywords": ["spiritual wisdom", "tradition", "conformity", "morality"], "upright_meaning": "Spiritual wisdom, religious beliefs, conformity, tradition", "reversed_meaning": "Personal beliefs, freedom, challenging the status quo"},
    {"id": "6", "name": "The Lovers", "arcana": "major", "suit": None, "number": 6, "image_url": "/cards/06-lovers.png", "keywords": ["love", "harmony", "relationships", "values alignment"], "upright_meaning": "Love, harmony, relationships, values alignment, choices", "reversed_meaning": "Self-love, disharmony, imbalance, misalignment of values"},
    {"id": "7", "name": "The Chariot", "arcana": "major", "suit": None, "number": 7, "image_url": "/cards/07-chariot.png", "keywords": ["control", "willpower", "determination", "direction"], "upright_meaning": "Control, willpower, success, action, determination", "reversed_meaning": "Self-discipline, opposition, lack of direction"},
    {"id": "8", "name": "Strength", "arcana": "major", "suit": None, "number": 8, "image_url": "/cards/08-strength.png", "keywords": ["strength", "courage", "patience", "control", "compassion"], "upright_meaning": "Strength, courage, persuasion, influence, compassion", "reversed_meaning": "Inner strength, self-doubt, low energy, raw emotion"},
    {"id": "9", "name": "The Hermit", "arcana": "major", "suit": None, "number": 9, "image_url": "/cards/09-hermit.png", "keywords": ["soul searching", "introspection", "inner guidance", "solitude"], "upright_meaning": "Soul searching, introspection, being alone, inner guidance", "reversed_meaning": "Isolation, loneliness, withdrawal"},
    {"id": "10", "name": "Wheel of Fortune", "arcana": "major", "suit": None, "number": 10, "image_url": "/cards/10-wheel-of-fortune.png", "keywords": ["good luck", "karma", "life cycles", "destiny"], "upright_meaning": "Good luck, karma, life cycles, destiny, a turning point", "reversed_meaning": "Bad luck, resistance to change, breaking cycles"},
    {"id": "11", "name": "Justice", "arcana": "major", "suit": None, "number": 11, "image_url": "/cards/11-justice.png", "keywords": ["justice", "fairness", "truth", "law", "accountability"], "upright_meaning": "Justice, fairness, truth, cause and effect, law", "reversed_meaning": "Unfairness, lack of accountability, dishonesty"},
    {"id": "12", "name": "The Hanged Man", "arcana": "major", "suit": None, "number": 12, "image_url": "/cards/12-hanged-man.png", "keywords": ["pause", "surrender", "letting go", "new perspectives"], "upright_meaning": "Pause, surrender, letting go, new perspectives", "reversed_meaning": "Delays, resistance, stalling, indecision"},
    {"id": "13", "name": "Death", "arcana": "major", "suit": None, "number": 13, "image_url": "/cards/13-death.png", "keywords": ["endings", "change", "transformation", "transition"], "upright_meaning": "Endings, change, transformation, transition", "reversed_meaning": "Resistance to change, personal transformation, inner purging"},
    {"id": "14", "name": "Temperance", "arcana": "major", "suit": None, "number": 14, "image_url": "/cards/14-temperance.png", "keywords": ["balance", "moderation", "patience", "purpose"], "upright_meaning": "Balance, moderation, patience, purpose", "reversed_meaning": "Imbalance, excess, self-healing, re-alignment"},
    {"id": "15", "name": "The Devil", "arcana": "major", "suit": None, "number": 15, "image_url": "/cards/15-devil.png", "keywords": ["shadow self", "attachment", "addiction", "restriction"], "upright_meaning": "Shadow self, attachment, addiction, restriction, sexuality", "reversed_meaning": "Releasing limiting beliefs, exploring dark thoughts, detachment"},
    {"id": "16", "name": "The Tower", "arcana": "major", "suit": None, "number": 16, "image_url": "/cards/16-tower.png", "keywords": ["sudden change", "upheaval", "chaos", "revelation"], "upright_meaning": "Sudden change, upheaval, chaos, revelation, awakening", "reversed_meaning": "Personal transformation, fear of change, averting disaster"},
    {"id": "17", "name": "The Star", "arcana": "major", "suit": None, "number": 17, "image_url": "/cards/17-star.png", "keywords": ["hope", "faith", "purpose", "renewal", "spirituality"], "upright_meaning": "Hope, faith, purpose, renewal, spirituality", "reversed_meaning": "Lack of faith, despair, self-trust, disconnection"},
    {"id": "18", "name": "The Moon", "arcana": "major", "suit": None, "number": 18, "image_url": "/cards/18-moon.png", "keywords": ["illusion", "fear", "anxiety", "subconscious", "intuition"], "upright_meaning": "Illusion, fear, anxiety, subconscious, intuition", "reversed_meaning": "Release of fear, repressed emotion, inner confusion"},
    {"id": "19", "name": "The Sun", "arcana": "major", "suit": None, "number": 19, "image_url": "/cards/19-sun.png", "keywords": ["positivity", "fun", "warmth", "success", "vitality"], "upright_meaning": "Positivity, fun, warmth, success, vitality", "reversed_meaning": "Inner child, feeling down, overly optimistic"},
    {"id": "20", "name": "Judgement", "arcana": "major", "suit": None, "number": 20, "image_url": "/cards/20-judgment.png", "keywords": ["judgement", "rebirth", "inner calling", "absolution"], "upright_meaning": "Judgement, rebirth, inner calling, absolution", "reversed_meaning": "Self-doubt, inner critic, ignoring the call"},
    {"id": "21", "name": "The World", "arcana": "major", "suit": None, "number": 21, "image_url": "/cards/21-world.png", "keywords": ["completion", "accomplishment", "travel", "fulfillment"], "upright_meaning": "Completion, accomplishment, travel, fulfillment", "reversed_meaning": "Seeking personal closure, short-cuts, delays"},
    
    {"id": "wands-ace", "name": "Ace of Wands", "arcana": "minor", "suit": "wands", "number": 1, "keywords": ["inspiration", "new opportunities", "growth", "potential"], "upright_meaning": "Inspiration, new opportunities, growth, potential", "reversed_meaning": "An emerging idea, lack of direction, distractions"},
    {"id": "wands-2", "name": "Two of Wands", "arcana": "minor", "suit": "wands", "number": 2, "keywords": ["future planning", "progress", "decisions", "discovery"], "upright_meaning": "Future planning, progress, decisions, discovery", "reversed_meaning": "Personal goals, inner alignment, fear of unknown"},
    {"id": "wands-3", "name": "Three of Wands", "arcana": "minor", "suit": "wands", "number": 3, "keywords": ["progress", "expansion", "foresight", "overseas opportunities"], "upright_meaning": "Progress, expansion, foresight, overseas opportunities", "reversed_meaning": "Playing small, lack of foresight, unexpected delays"},
    {"id": "wands-4", "name": "Four of Wands", "arcana": "minor", "suit": "wands", "number": 4, "keywords": ["celebration", "joy", "harmony", "relaxation", "homecoming"], "upright_meaning": "Celebration, joy, harmony, relaxation, home", "reversed_meaning": "Personal celebration, inner harmony, conflict with others"},
    {"id": "wands-5", "name": "Five of Wands", "arcana": "minor", "suit": "wands", "number": 5, "keywords": ["conflict", "disagreements", "competition", "tension"], "upright_meaning": "Conflict, disagreements, competition, tension, diversity", "reversed_meaning": "Inner conflict, conflict avoidance, tension release"},
    {"id": "wands-6", "name": "Six of Wands", "arcana": "minor", "suit": "wands", "number": 6, "keywords": ["success", "public recognition", "progress", "self-confidence"], "upright_meaning": "Success, public recognition, progress, self-confidence", "reversed_meaning": "Private achievement, personal definition of success"},
    {"id": "wands-7", "name": "Seven of Wands", "arcana": "minor", "suit": "wands", "number": 7, "keywords": ["challenge", "competition", "protection", "perseverance"], "upright_meaning": "Challenge, competition, protection, perseverance", "reversed_meaning": "Exhaustion, giving up, overwhelmed"},
    {"id": "wands-8", "name": "Eight of Wands", "arcana": "minor", "suit": "wands", "number": 8, "keywords": ["movement", "fast paced change", "action", "alignment"], "upright_meaning": "Movement, fast paced change, action, alignment, air travel", "reversed_meaning": "Delays, frustration, resisting change, internal alignment"},
    {"id": "wands-9", "name": "Nine of Wands", "arcana": "minor", "suit": "wands", "number": 9, "keywords": ["resilience", "courage", "persistence", "boundaries"], "upright_meaning": "Resilience, courage, persistence, test of faith, boundaries", "reversed_meaning": "Inner resources, struggle, overwhelm, defensive"},
    {"id": "wands-10", "name": "Ten of Wands", "arcana": "minor", "suit": "wands", "number": 10, "keywords": ["burden", "extra responsibility", "hard work", "completion"], "upright_meaning": "Burden, extra responsibility, hard work, completion", "reversed_meaning": "Doing it all, carrying the burden, delegation"},
    {"id": "wands-page", "name": "Page of Wands", "arcana": "minor", "suit": "wands", "number": 11, "keywords": ["inspiration", "ideas", "discovery", "limitless potential"], "upright_meaning": "Inspiration, ideas, discovery, limitless potential, free spirit", "reversed_meaning": "Newly-formed ideas, redirecting energy, self-limiting beliefs"},
    {"id": "wands-knight", "name": "Knight of Wands", "arcana": "minor", "suit": "wands", "number": 12, "keywords": ["energy", "passion", "inspired action", "adventure"], "upright_meaning": "Energy, passion, inspired action, adventure, impulsiveness", "reversed_meaning": "Passion project, haste, scattered energy, delays"},
    {"id": "wands-queen", "name": "Queen of Wands", "arcana": "minor", "suit": "wands", "number": 13, "keywords": ["courage", "confidence", "independence", "determination"], "upright_meaning": "Courage, confidence, independence, social butterfly, determination", "reversed_meaning": "Self-respect, self-confidence, introverted, re-establish sense of self"},
    {"id": "wands-king", "name": "King of Wands", "arcana": "minor", "suit": "wands", "number": 14, "keywords": ["natural-born leader", "vision", "entrepreneur", "honour"], "upright_meaning": "Natural-born leader, vision, entrepreneur, honour", "reversed_meaning": "Impulsiveness, haste, ruthless, high expectations"},
    
    {"id": "cups-ace", "name": "Ace of Cups", "arcana": "minor", "suit": "cups", "number": 1, "image_url": "/cards/ace-cups.png", "keywords": ["love", "new relationships", "compassion", "creativity"], "upright_meaning": "Love, new relationships, compassion, creativity", "reversed_meaning": "Self-love, intuition, repressed emotions"},
    {"id": "cups-2", "name": "Two of Cups", "arcana": "minor", "suit": "cups", "number": 2, "image_url": "/cards/02-cups.png", "keywords": ["unified love", "partnership", "mutual attraction", "connection"], "upright_meaning": "Unified love, partnership, mutual attraction", "reversed_meaning": "Self-love, break-ups, disharmony, distrust"},
    {"id": "cups-3", "name": "Three of Cups", "arcana": "minor", "suit": "cups", "number": 3, "image_url": "/cards/03-cups.png", "keywords": ["celebration", "friendship", "creativity", "community"], "upright_meaning": "Celebration, friendship, creativity, collaborations", "reversed_meaning": "Independence, alone time, hardcore partying, 'three's a crowd'"},
    {"id": "cups-4", "name": "Four of Cups", "arcana": "minor", "suit": "cups", "number": 4, "image_url": "/cards/04-cups.png", "keywords": ["meditation", "contemplation", "apathy", "reevaluation"], "upright_meaning": "Meditation, contemplation, apathy, reevaluation", "reversed_meaning": "Retreat, withdrawn, checking in for alignment"},
    {"id": "cups-5", "name": "Five of Cups", "arcana": "minor", "suit": "cups", "number": 5, "image_url": "/cards/05-cups.png", "keywords": ["regret", "failure", "disappointment", "pessimism"], "upright_meaning": "Regret, failure, disappointment, pessimism", "reversed_meaning": "Personal setbacks, self-forgiveness, moving on"},
    {"id": "cups-6", "name": "Six of Cups", "arcana": "minor", "suit": "cups", "number": 6, "image_url": "/cards/06-cups.png", "keywords": ["revisiting the past", "childhood memories", "innocence", "joy"], "upright_meaning": "Revisiting the past, childhood memories, innocence, joy", "reversed_meaning": "Living in the past, forgiveness, lacking playfulness"},
    {"id": "cups-7", "name": "Seven of Cups", "arcana": "minor", "suit": "cups", "number": 7, "image_url": "/cards/07-cups.png", "keywords": ["opportunities", "choices", "wishful thinking", "illusion"], "upright_meaning": "Opportunities, choices, wishful thinking, illusion", "reversed_meaning": "Alignment, personal values, overwhelmed by choices"},
    {"id": "cups-8", "name": "Eight of Cups", "arcana": "minor", "suit": "cups", "number": 8, "image_url": "/cards/08-cups.png", "keywords": ["disappointment", "abandonment", "withdrawal", "escapism"], "upright_meaning": "Disappointment, abandonment, withdrawal, escapism", "reversed_meaning": "Trying one more time, indecision, aimless drifting"},
    {"id": "cups-9", "name": "Nine of Cups", "arcana": "minor", "suit": "cups", "number": 9, "image_url": "/cards/09-cups.png", "keywords": ["contentment", "satisfaction", "gratitude", "wish come true"], "upright_meaning": "Contentment, satisfaction, gratitude, wish come true", "reversed_meaning": "Inner happiness, materialism, dissatisfaction"},
    {"id": "cups-10", "name": "Ten of Cups", "arcana": "minor", "suit": "cups", "number": 10, "image_url": "/cards/10-cups.png", "keywords": ["divine love", "blissful relationships", "harmony", "alignment"], "upright_meaning": "Divine love, blissful relationships, harmony, alignment", "reversed_meaning": "Disconnection, misaligned values, struggling relationships"},
    {"id": "cups-page", "name": "Page of Cups", "arcana": "minor", "suit": "cups", "number": 11, "image_url": "/cards/11-page-of-cups.png", "keywords": ["creative opportunities", "intuitive messages", "curiosity"], "upright_meaning": "Creative opportunities, intuitive messages, curiosity, possibility", "reversed_meaning": "New ideas, doubting intuition, creative blocks"},
    {"id": "cups-knight", "name": "Knight of Cups", "arcana": "minor", "suit": "cups", "number": 12, "image_url": "/cards/12-knight-of-cups.png", "keywords": ["creativity", "romance", "charm", "imagination"], "upright_meaning": "Creativity, romance, charm, imagination, beauty", "reversed_meaning": "Overactive imagination, unrealistic, jealous"},
    {"id": "cups-queen", "name": "Queen of Cups", "arcana": "minor", "suit": "cups", "number": 13, "image_url": "/cards/13-queen-of-cups.png", "keywords": ["compassionate", "caring", "emotionally stable", "intuitive"], "upright_meaning": "Compassionate, caring, emotionally stable, intuitive, in flow", "reversed_meaning": "Inner feelings, self-care, self-love, co-dependency"},
    {"id": "cups-king", "name": "King of Cups", "arcana": "minor", "suit": "cups", "number": 14, "image_url": "/cards/14-king-of-cups.png", "keywords": ["emotionally balanced", "compassionate", "diplomatic"], "upright_meaning": "Emotionally balanced, compassionate, diplomatic", "reversed_meaning": "Self-compassion, inner feelings, moodiness"},
    
    {"id": "swords-ace", "name": "Ace of Swords", "arcana": "minor", "suit": "swords", "number": 1, "keywords": ["breakthroughs", "new ideas", "mental clarity", "success"], "upright_meaning": "Breakthroughs, new ideas, mental clarity, success", "reversed_meaning": "Inner clarity, re-thinking an idea, clouded judgement"},
    {"id": "swords-2", "name": "Two of Swords", "arcana": "minor", "suit": "swords", "number": 2, "keywords": ["difficult decisions", "weighing up options", "stalemate"], "upright_meaning": "Difficult decisions, weighing up options, an impasse, avoidance", "reversed_meaning": "Indecision, confusion, information overload"},
    {"id": "swords-3", "name": "Three of Swords", "arcana": "minor", "suit": "swords", "number": 3, "keywords": ["heartbreak", "emotional pain", "sorrow", "grief"], "upright_meaning": "Heartbreak, emotional pain, sorrow, grief, hurt", "reversed_meaning": "Negative self-talk, releasing pain, optimism"},
    {"id": "swords-4", "name": "Four of Swords", "arcana": "minor", "suit": "swords", "number": 4, "keywords": ["rest", "relaxation", "meditation", "contemplation"], "upright_meaning": "Rest, relaxation, meditation, contemplation, recuperation", "reversed_meaning": "Exhaustion, burn-out, deep contemplation, stagnation"},
    {"id": "swords-5", "name": "Five of Swords", "arcana": "minor", "suit": "swords", "number": 5, "keywords": ["conflict", "disagreements", "competition", "defeat"], "upright_meaning": "Conflict, disagreements, competition, defeat, winning at all costs", "reversed_meaning": "Reconciliation, making amends, past resentment"},
    {"id": "swords-6", "name": "Six of Swords", "arcana": "minor", "suit": "swords", "number": 6, "keywords": ["transition", "change", "rite of passage", "releasing baggage"], "upright_meaning": "Transition, change, rite of passage, releasing baggage", "reversed_meaning": "Personal transition, resistance to change, unfinished business"},
    {"id": "swords-7", "name": "Seven of Swords", "arcana": "minor", "suit": "swords", "number": 7, "keywords": ["betrayal", "deception", "getting away with something"], "upright_meaning": "Betrayal, deception, getting away with something, acting strategically", "reversed_meaning": "Imposter syndrome, self-deceit, keeping secrets"},
    {"id": "swords-8", "name": "Eight of Swords", "arcana": "minor", "suit": "swords", "number": 8, "keywords": ["negative thoughts", "self-imposed restriction", "imprisonment"], "upright_meaning": "Negative thoughts, self-imposed restriction, imprisonment, victim mentality", "reversed_meaning": "Self-limiting beliefs, inner critic, releasing negative thoughts"},
    {"id": "swords-9", "name": "Nine of Swords", "arcana": "minor", "suit": "swords", "number": 9, "keywords": ["anxiety", "worry", "fear", "depression", "nightmares"], "upright_meaning": "Anxiety, worry, fear, depression, nightmares", "reversed_meaning": "Inner turmoil, deep-seated fears, secrets, releasing worry"},
    {"id": "swords-10", "name": "Ten of Swords", "arcana": "minor", "suit": "swords", "number": 10, "keywords": ["painful endings", "deep wounds", "betrayal", "rock bottom"], "upright_meaning": "Painful endings, deep wounds, betrayal, loss, crisis", "reversed_meaning": "Recovery, regeneration, resisting an inevitable end"},
    {"id": "swords-page", "name": "Page of Swords", "arcana": "minor", "suit": "swords", "number": 11, "keywords": ["new ideas", "curiosity", "thirst for knowledge", "vigilance"], "upright_meaning": "New ideas, curiosity, thirst for knowledge, new ways of communicating", "reversed_meaning": "Self-expression, all talk and no action, haphazard action"},
    {"id": "swords-knight", "name": "Knight of Swords", "arcana": "minor", "suit": "swords", "number": 12, "keywords": ["ambitious", "action-oriented", "driven to succeed"], "upright_meaning": "Ambitious, action-oriented, driven to succeed, fast-thinking", "reversed_meaning": "Restless, unfocused, impulsive, burn-out"},
    {"id": "swords-queen", "name": "Queen of Swords", "arcana": "minor", "suit": "swords", "number": 13, "keywords": ["independent", "unbiased judgement", "clear boundaries"], "upright_meaning": "Independent, unbiased judgement, clear boundaries, direct communication", "reversed_meaning": "Overly-emotional, easily influenced, bitchy, cold-hearted"},
    {"id": "swords-king", "name": "King of Swords", "arcana": "minor", "suit": "swords", "number": 14, "keywords": ["mental clarity", "intellectual power", "authority", "truth"], "upright_meaning": "Mental clarity, intellectual power, authority, truth", "reversed_meaning": "Quiet power, inner truth, misuse of power, manipulation"},
    
    {"id": "pentacles-ace", "name": "Ace of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 1, "keywords": ["opportunity", "prosperity", "new venture", "manifestation"], "upright_meaning": "A new financial or career opportunity, manifestation, abundance", "reversed_meaning": "Lost opportunity, lack of planning, poor financial decisions"},
    {"id": "pentacles-2", "name": "Two of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 2, "keywords": ["multiple priorities", "time management", "prioritisation"], "upright_meaning": "Multiple priorities, time management, prioritisation, adaptability", "reversed_meaning": "Over-committed, disorganisation, reprioritisation"},
    {"id": "pentacles-3", "name": "Three of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 3, "keywords": ["teamwork", "collaboration", "learning", "implementation"], "upright_meaning": "Teamwork, collaboration, learning, implementation", "reversed_meaning": "Disharmony, misalignment, working alone"},
    {"id": "pentacles-4", "name": "Four of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 4, "keywords": ["saving money", "security", "conservatism", "scarcity"], "upright_meaning": "Saving money, security, conservatism, scarcity, control", "reversed_meaning": "Over-spending, greed, self-protection"},
    {"id": "pentacles-5", "name": "Five of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 5, "keywords": ["financial loss", "poverty", "lack mindset", "isolation"], "upright_meaning": "Financial loss, poverty, lack mindset, isolation, worry", "reversed_meaning": "Recovery from financial loss, spiritual poverty"},
    {"id": "pentacles-6", "name": "Six of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 6, "keywords": ["giving", "receiving", "sharing wealth", "generosity"], "upright_meaning": "Giving, receiving, sharing wealth, generosity, charity", "reversed_meaning": "Self-care, unpaid debts, one-sided charity"},
    {"id": "pentacles-7", "name": "Seven of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 7, "keywords": ["long-term view", "sustainable results", "perseverance"], "upright_meaning": "Long-term view, sustainable results, perseverance, investment", "reversed_meaning": "Lack of long-term vision, limited success or reward"},
    {"id": "pentacles-8", "name": "Eight of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 8, "keywords": ["apprenticeship", "repetitive tasks", "mastery", "skill development"], "upright_meaning": "Apprenticeship, repetitive tasks, mastery, skill development", "reversed_meaning": "Self-development, perfectionism, misdirected activity"},
    {"id": "pentacles-9", "name": "Nine of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 9, "keywords": ["abundance", "luxury", "self-sufficiency", "financial independence"], "upright_meaning": "Abundance, luxury, self-sufficiency, financial independence", "reversed_meaning": "Self-worth, over-investment in work, hustling"},
    {"id": "pentacles-10", "name": "Ten of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 10, "keywords": ["wealth", "financial security", "family", "long-term success"], "upright_meaning": "Wealth, financial security, family, long-term success, contribution", "reversed_meaning": "The dark side of wealth, financial failure or loss"},
    {"id": "pentacles-page", "name": "Page of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 11, "keywords": ["manifestation", "financial opportunity", "skill development"], "upright_meaning": "Manifestation, financial opportunity, skill development, new career", "reversed_meaning": "Lack of progress, procrastination, learn from failure"},
    {"id": "pentacles-knight", "name": "Knight of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 12, "keywords": ["hard work", "productivity", "routine", "conservatism"], "upright_meaning": "Hard work, productivity, routine, conservatism, perfectionism", "reversed_meaning": "Self-discipline, boredom, feeling 'stuck', perfectionism"},
    {"id": "pentacles-queen", "name": "Queen of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 13, "keywords": ["nurturing", "practical", "providing financially", "down-to-earth"], "upright_meaning": "Nurturing, practical, providing financially, a working parent, down-to-earth", "reversed_meaning": "Financial independence, self-care, work-home conflict"},
    {"id": "pentacles-king", "name": "King of Pentacles", "arcana": "minor", "suit": "pentacles", "number": 14, "keywords": ["wealth", "business", "leadership", "security", "abundance"], "upright_meaning": "Wealth, business, leadership, security, discipline, abundance", "reversed_meaning": "Financially inept, obsessed with wealth and status, stubborn"}
]

class Card(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    arcana: str
    suit: Optional[str]
    number: int
    image_url: Optional[str] = None
    keywords: List[str]
    upright_meaning: str
    reversed_meaning: str

class DrawCardsRequest(BaseModel):
    count: int = 1
    spread_type: Optional[str] = None

class DrawnCard(BaseModel):
    card: Card
    position: Optional[str] = None
    reversed: bool = False

class InterpretRequest(BaseModel):
    cards: List[DrawnCard]
    question: Optional[str] = None
    spread_type: Optional[str] = None

class Reading(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    cards: List[dict]
    question: Optional[str] = None
    spread_type: Optional[str] = None
    interpretation: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DailyCard(BaseModel):
    model_config = ConfigDict(extra="ignore")
    date: str
    card: dict
    interpretation: str

@api_router.get("/cards", response_model=List[Card])
async def get_all_cards():
    return TAROT_CARDS

@api_router.get("/cards/{card_id}", response_model=Card)
async def get_card(card_id: str):
    card = next((c for c in TAROT_CARDS if c["id"] == card_id), None)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@api_router.post("/draw", response_model=List[DrawnCard])
async def draw_cards(request: DrawCardsRequest):
    if request.count < 1 or request.count > 10:
        raise HTTPException(status_code=400, detail="Can only draw 1-10 cards")
    
    drawn = random.sample(TAROT_CARDS, request.count)
    
    positions = None
    if request.spread_type == "three-card":
        positions = ["Past", "Present", "Future"]
    elif request.spread_type == "celtic-cross":
        positions = ["Present", "Challenge", "Past", "Future", "Above", "Below", "Advice", "External", "Hopes/Fears", "Outcome"]
    
    result = []
    for i, card_data in enumerate(drawn):
        result.append({
            "card": card_data,
            "position": positions[i] if positions and i < len(positions) else None,
            "reversed": False
        })
    
    return result

@api_router.post("/interpret")
async def get_interpretation(request: InterpretRequest):
    try:
        llm_key = os.environ.get('EMERGENT_LLM_KEY')
        if not llm_key:
            raise HTTPException(status_code=500, detail="LLM API key not configured")
        
        chat = LlmChat(
            api_key=llm_key,
            session_id=str(uuid.uuid4()),
            system_message="You are a knowledgeable tarot reader who provides clear, psychologically grounded interpretations. Balance traditional tarot meanings with practical psychological insights. Be empathetic, insightful, and help the querent reflect on their situation."
        )
        chat.with_model("openai", "gpt-5.2")
        
        cards_info = []
        for drawn in request.cards:
            card = drawn.card
            meaning = card.upright_meaning
            position_text = f" (Position: {drawn.position})" if drawn.position else ""
            cards_info.append(f"{card.name}{position_text}: {meaning}")
        
        cards_text = "\n".join(cards_info)
        question_text = f"Question: {request.question}\n\n" if request.question else ""
        spread_text = f"Spread Type: {request.spread_type}\n\n" if request.spread_type else ""
        
        prompt = f"""{spread_text}{question_text}Cards drawn:
{cards_text}

Provide a comprehensive, psychologically grounded interpretation of this reading. Focus on:
1. The overall message and theme
2. How the cards relate to each other
3. Practical insights and reflection questions
4. Balanced perspective (neither overly positive nor negative)

Keep the interpretation clear, insightful, and helpful for both beginners and experienced tarot users."""
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        return {"interpretation": response}
    
    except Exception as e:
        logging.error(f"Error getting interpretation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate interpretation: {str(e)}")

@api_router.post("/readings", response_model=Reading)
async def save_reading(reading: Reading):
    doc = reading.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.readings.insert_one(doc)
    return reading

@api_router.get("/readings", response_model=List[Reading])
async def get_readings():
    readings = await db.readings.find({}, {"_id": 0}).sort("timestamp", -1).to_list(100)
    for reading in readings:
        if isinstance(reading['timestamp'], str):
            reading['timestamp'] = datetime.fromisoformat(reading['timestamp'])
    return readings

@api_router.get("/daily-card")
async def get_daily_card():
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    existing = await db.daily_cards.find_one({"date": today}, {"_id": 0})
    if existing:
        return existing
    
    card = random.choice(TAROT_CARDS)
    
    try:
        llm_key = os.environ.get('EMERGENT_LLM_KEY')
        chat = LlmChat(
            api_key=llm_key,
            session_id=str(uuid.uuid4()),
            system_message="You are a tarot reader providing daily card guidance. Be concise, uplifting, and practical."
        )
        chat.with_model("openai", "gpt-5.2")
        
        meaning = card["upright_meaning"]
        
        prompt = f"""Daily Card: {card['name']}
Meaning: {meaning}

Provide a brief, inspiring daily message (2-3 sentences) about how this card's energy can guide today."""
        
        user_message = UserMessage(text=prompt)
        interpretation = await chat.send_message(user_message)
        
        daily_card = {
            "date": today,
            "card": {**card, "reversed": False},
            "interpretation": interpretation
        }
        
        # Insert into database (this adds _id field)
        await db.daily_cards.insert_one(daily_card.copy())
        
        # Return the clean object without MongoDB ObjectId
        return daily_card
    
    except Exception as e:
        logging.error(f"Error generating daily card: {str(e)}")
        return {
            "date": today,
            "card": {**card, "reversed": False},
            "interpretation": f"Today's card is {card['name']}. {meaning}"
        }

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
