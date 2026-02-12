import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import TarotCard from '../components/TarotCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DrawCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Pre-fill question from Go Deeper section
  useEffect(() => {
    if (location.state?.prefillQuestion) {
      setQuestion(location.state.prefillQuestion);
    }
  }, [location.state]);

  const handleDraw = async () => {
    if (!question.trim()) {
      alert('Please enter your question first');
      return;
    }

    setIsDrawing(true);
    try {
      const response = await axios.post(`${API}/draw`, {
        count: 3,
        spread_type: 'three-card',
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
        spread_type: 'three-card',
      });

      const reading = {
        cards: drawnCards,
        question: question,
        spread_type: 'three-card',
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
    <div className="min-h-screen py-12 sm:py-20 bg-celestial-dark" data-testid="draw-card-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-5xl text-gold-base mb-4">Explore a Decision</h1>
          <p className="font-body text-base sm:text-lg text-celestial-text max-w-2xl mx-auto">
            Focus on a situation where you want clarity. The cards will offer perspectives to help you think differently.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-celestial-card border border-celestial-border p-8 rounded-lg shadow-lg">
            <label className="font-subheading text-lg text-celestial-text mb-4 block text-center">
              What do you want clarity on?
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: Should I take this opportunity? What is influencing this situation? What should I pay attention to?"
              data-testid="question-input"
              className="w-full px-6 py-4 bg-celestial-dark border border-celestial-border rounded-lg font-body text-lg text-celestial-text placeholder-celestial-muted focus:outline-none focus:border-gold-base transition-colors mb-6"
              disabled={drawnCards.length > 0}
            />
            
            {/* Question Guidance */}
            <div className="border-t border-celestial-border pt-6">
              <p className="font-reading text-sm text-[#8B8B8B] text-center mb-4">
                How to get the most insight
              </p>
              <div className="font-reading text-sm text-[#E8DCC8] space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✦</span>
                  <span>Describe the situation you want clarity on.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✦</span>
                  <span>Be open — the goal is perspective, not prediction.</span>
                </p>
              </div>
            </div>
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
              className="bg-gold-base text-celestial-dark font-ui uppercase tracking-widest px-12 py-4 text-lg hover:bg-gold-shimmer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDrawing ? 'Drawing Cards...' : 'Reveal Perspectives'}
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
            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
              {drawnCards.map((drawn, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {/* Card Name Title - always shown after drawing */}
                  <h3 className="font-heading text-xl sm:text-2xl text-[#D4AF37] mb-4 text-center">
                    {drawn.card.name}
                  </h3>
                  <TarotCard
                    card={drawn.card}
                    reversed={drawn.reversed}
                    position={drawn.position}
                    isRevealed={revealed}
                    size="large"
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              {!revealed && (
                <button
                  onClick={handleReveal}
                  data-testid="reveal-cards-btn"
                  className="bg-gold-base text-celestial-dark font-ui uppercase tracking-widest px-8 py-3 hover:bg-gold-shimmer transition-all duration-300"
                >
                  Reveal Cards
                </button>
              )}
              {revealed && (
                <button
                  onClick={handleInterpret}
                  disabled={isInterpreting}
                  data-testid="get-interpretation-btn"
                  className="bg-position-past text-white font-ui uppercase tracking-widest px-8 py-3 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-transparent text-celestial-muted border border-celestial-border font-ui uppercase tracking-widest px-8 py-3 hover:border-gold-base hover:text-gold-base transition-all duration-300"
              >
                Ask Another Question
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DrawCard;
