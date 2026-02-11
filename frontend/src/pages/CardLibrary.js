import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import TarotCard from '../components/TarotCard';
import { useDeck } from '../context/DeckContext';
import { GiSpellBook } from 'react-icons/gi';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DeckSelector = () => {
  const { decks, selectedDeck, setSelectedDeck, loading } = useDeck();

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-10"
    >
      <h2 className="font-subheading text-lg text-celestial-text text-center mb-6">Choose Your Deck</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => deck.available && setSelectedDeck(deck.id)}
            disabled={!deck.available}
            data-testid={`deck-selector-${deck.id}`}
            className={`relative p-4 rounded-lg border transition-all duration-300 ${
              selectedDeck === deck.id
                ? 'border-gold-base bg-gold-base/20 shadow-lg'
                : deck.available
                ? 'border-celestial-border bg-celestial-card hover:border-gold-base/50 hover:shadow-md'
                : 'border-celestial-border/30 bg-celestial-card/30 opacity-50 cursor-not-allowed'
            }`}
          >
            {selectedDeck === deck.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-base rounded-full flex items-center justify-center">
                <span className="text-celestial-dark text-xs">✓</span>
              </div>
            )}
            <h3 className="font-subheading text-sm font-bold text-celestial-text mb-1">{deck.name}</h3>
            <p className="font-body text-xs text-celestial-muted leading-tight">{deck.description}</p>
            {deck.available && (
              <span className="inline-block mt-2 font-body text-xs text-gold-base">
                {deck.card_count} cards
              </span>
            )}
            {!deck.available && (
              <span className="inline-block mt-2 font-body text-xs text-celestial-muted italic">
                Coming soon
              </span>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const CardLibrary = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedDeck } = useDeck();

  useEffect(() => {
    fetchCards();
  }, [selectedDeck]);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${API}/cards?deck=${selectedDeck}`);
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCards = cards.filter((card) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'major' && card.arcana === 'major') ||
      (filter !== 'all' && filter !== 'major' && card.suit === filter);

    const matchesSearch =
      searchTerm === '' ||
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-celestial-dark" data-testid="card-library-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <GiSpellBook className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-gold-base" />
          <h1 className="font-heading text-4xl sm:text-5xl text-gold-base mb-4">Card Library</h1>
          <p className="font-body text-base sm:text-lg text-celestial-text max-w-2xl mx-auto">
            Explore the complete tarot deck. Study each card's meaning and symbolism.
          </p>
        </motion.div>

        <DeckSelector />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cards..."
              data-testid="card-search-input"
              className="flex-1 px-4 py-3 bg-celestial-card border border-celestial-border rounded-lg font-body text-celestial-text placeholder-celestial-muted focus:outline-none focus:border-gold-base transition-colors"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              data-testid="card-filter-select"
              className="px-4 py-3 bg-celestial-card border border-celestial-border rounded-lg font-body text-celestial-text focus:outline-none focus:border-gold-base transition-colors"
            >
              <option value="all">All Cards (78)</option>
              <option value="major">Major Arcana (22)</option>
              <option value="wands">Wands (14)</option>
              <option value="cups">Cups (14)</option>
              <option value="swords">Swords (14)</option>
              <option value="pentacles">Pentacles (14)</option>
            </select>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12" data-testid="library-loading">
            <div className="font-body text-celestial-muted">Loading card library...</div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="bg-celestial-card border border-celestial-border p-2 rounded-lg hover:border-gold-base/50 transition-all duration-300"
                data-testid={`library-card-${card.id}`}
              >
                <TarotCard card={card} isRevealed={false} size="medium" />
                <div className="mt-3 text-center">
                  <h3 className="font-subheading text-xl text-[#D4AF37] mb-2">{card.name}</h3>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {card.keywords.slice(0, 3).map((keyword, i) => (
                      <span
                        key={i}
                        className="font-reading text-sm px-2 py-1 bg-gold-base/20 text-[#E8DCC8] rounded-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredCards.length === 0 && (
          <div className="text-center py-12" data-testid="no-cards-found">
            <div className="font-body text-celestial-muted">No cards found matching your search.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardLibrary;