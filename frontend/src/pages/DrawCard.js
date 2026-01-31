import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import TarotCard from '../components/TarotCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DrawCard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [spreadType, setSpreadType] = useState(searchParams.get('type') || 'single');
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const spreadConfig = {
    single: { count: 1, name: 'Single Card', spread: null },
    'three-card': { count: 3, name: 'Three Card Spread', spread: 'three-card' },
    'celtic-cross': { count: 10, name: 'Celtic Cross', spread: 'celtic-cross' },
  };

  const config = spreadConfig[spreadType];

  const handleDraw = async () => {
    if (!question.trim()) {
      alert('Please enter your question first');
      return;
    }

    setIsDrawing(true);
    try {
      const response = await axios.post(`${API}/draw`, {
        count: config.count,
        spread_type: config.spread,
      });
      setDrawnCards(response.data);
      setRevealed(false);
    } catch (error) {
      console.error('Error drawing cards:', error);
      alert('Failed to draw cards. Please try again.');
    } finally {
      setIsDrawing(false);
    }
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleInterpret = async () => {
    setIsInterpreting(true);
    try {
      const response = await axios.post(`${API}/interpret`, {
        cards: drawnCards,
        question: question,
        spread_type: config.spread,
      });

      const reading = {
        cards: drawnCards,
        question: question,
        spread_type: config.spread,
        interpretation: response.data.interpretation,
      };

      await axios.post(`${API}/readings`, reading);

      navigate('/reading', { state: { reading } });
    } catch (error) {
      console.error('Error getting interpretation:', error);
      alert('Failed to get interpretation. Please try again.');
    } finally {
      setIsInterpreting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-20" data-testid="draw-card-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-5xl text-ink-black mb-4">{config.name}</h1>
          <p className="font-body text-base sm:text-lg text-ink-faded max-w-2xl mx-auto">
            Focus on your question. Clear your mind. When you're ready, draw your cards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="mb-4">
            <label className="font-subheading text-lg text-ink-black mb-2 block">Choose Your Spread</label>
            <select
              value={spreadType}
              onChange={(e) => {
                setSpreadType(e.target.value);
                setDrawnCards([]);
                setRevealed(false);
              }}
              data-testid="spread-selector"
              className="w-full px-4 py-3 bg-parchment-surface border-2 border-gold-antique/50 rounded-sm font-body text-ink-black focus:outline-none focus:border-gold-base transition-colors"
              disabled={drawnCards.length > 0}
            >
              <option value="single">Single Card</option>
              <option value="three-card">Three Card Spread (Past, Present, Future)</option>
              <option value="celtic-cross">Celtic Cross (10 Cards)</option>
            </select>
          </div>

          <div className="ornate-border bg-parchment-surface/50 backdrop-blur-sm p-8 rounded-sm shadow-lg">
            <label className="font-subheading text-lg text-ink-black mb-4 block text-center">
              Speak Your Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What guidance do you seek?"
              data-testid="question-input"
              className="petition-input w-full"
              disabled={drawnCards.length > 0}
            />
          </div>
        </motion.div>

        {drawnCards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={handleDraw}
              disabled={isDrawing || !question.trim()}
              data-testid="draw-cards-btn"
              className="wax-seal-btn bg-gold-base text-ink-black font-ui uppercase tracking-widest px-12 py-4 text-lg border-2 border-double border-ink-black hover:bg-gold-shimmer transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDrawing ? 'Drawing...' : 'Draw Cards'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
            data-testid="drawn-cards-display"
          >
            <div className={`flex flex-wrap justify-center gap-6 ${
              config.count === 10 ? 'max-w-6xl mx-auto' : 'max-w-4xl mx-auto'
            }`}>
              {drawnCards.map((drawn, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TarotCard
                    card={drawn.card}
                    reversed={drawn.reversed}
                    position={drawn.position}
                    isRevealed={revealed}
                    size={config.count > 5 ? 'small' : 'medium'}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              {!revealed && (
                <button
                  onClick={handleReveal}
                  data-testid="reveal-cards-btn"
                  className="wax-seal-btn bg-gold-base text-ink-black font-ui uppercase tracking-widest px-8 py-3 border-2 border-double border-ink-black hover:bg-gold-shimmer transition-all duration-300 shadow-lg"
                >
                  Reveal Cards
                </button>
              )}
              {revealed && (
                <button
                  onClick={handleInterpret}
                  disabled={isInterpreting}
                  data-testid="get-interpretation-btn"
                  className="wax-seal-btn bg-blood-dried text-parchment-light font-ui uppercase tracking-widest px-8 py-3 border-2 border-double border-ink-black hover:bg-blood-fresh transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isInterpreting ? 'Interpreting...' : 'Get Interpretation'}
                </button>
              )}
              <button
                onClick={() => {
                  setDrawnCards([]);
                  setRevealed(false);
                  setQuestion('');
                }}
                data-testid="draw-again-btn"
                className="bg-transparent text-ink-faded border border-ink-faded font-ui uppercase tracking-widest px-8 py-3 hover:border-gold-base hover:text-gold-antique transition-all duration-300"
              >
                Draw Again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DrawCard;