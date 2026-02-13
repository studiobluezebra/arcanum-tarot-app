import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import TarotCard from '../components/TarotCard';
import { useDeck } from '../context/DeckContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const { selectedDeck } = useDeck();
  const [dailyCard, setDailyCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    fetchPersonalDailyCard();
  }, []);

  // Get or generate a personal daily card for this user
  const fetchPersonalDailyCard = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const storageKey = `flipwill_daily_card_${today}`;
      
      // Check if user already has a daily card for today
      const storedCard = localStorage.getItem(storageKey);
      if (storedCard) {
        setDailyCard(JSON.parse(storedCard));
        setLoading(false);
        return;
      }
      
      // Clear old daily cards from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('flipwill_daily_card_') && key !== storageKey) {
          localStorage.removeItem(key);
        }
      });
      
      // Get a new personal daily card from the API
      const response = await axios.get(`${API}/personal-daily-card`);
      setDailyCard(response.data);
      
      // Store in localStorage for this user's session today
      localStorage.setItem(storageKey, JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching daily card:', error);
      // Fallback to regular daily card
      try {
        const response = await axios.get(`${API}/daily-card`);
        setDailyCard(response.data);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (response) => {
    setFeedbackGiven(true);
    setShowSaved(true);
    // Could save to backend in the future
    setTimeout(() => setShowSaved(false), 2000);
  };

  // Get card image path based on selected deck
  const getCardImagePath = (card) => {
    if (!card) return '';
    const deckFolder = selectedDeck || 'original';
    return `/cards/${deckFolder}/${card.id}.png`;
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-celestial-dark" data-testid="home-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-body text-lg sm:text-xl text-celestial-text max-w-2xl mx-auto leading-relaxed italic">
            Clarity begins with awareness
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-celestial-card border border-gold-base/30 p-6 sm:p-10 rounded-lg shadow-2xl max-w-3xl mx-auto">
            <h2 className="font-subheading text-3xl sm:text-4xl text-center text-gold-base mb-2 tracking-wide">
              Your daily Perspective
            </h2>
            <p className="font-body text-base sm:text-lg text-center text-celestial-muted mb-8">
              A lens for today
            </p>
            
            {loading ? (
              <div className="text-center py-12" data-testid="daily-card-loading">
                <div className="font-reading text-celestial-muted">Drawing your daily card...</div>
              </div>
            ) : dailyCard ? (
              <div className="flex flex-col items-center gap-4" data-testid="daily-card-display">
                {/* Card Image - Larger */}
                <div className="w-56 sm:w-72 md:w-80">
                  <img 
                    src={getCardImagePath(dailyCard.card)} 
                    alt={dailyCard.card.name}
                    className={`w-full h-auto rounded-lg shadow-xl ${dailyCard.card.reversed ? 'rotate-180' : ''}`}
                  />
                </div>
                
                {/* Card Name */}
                <h3 className="font-subheading text-2xl sm:text-3xl text-gold-base text-center mt-2">
                  {dailyCard.card.name}
                  {dailyCard.card.reversed && <span className="text-celestial-muted text-lg ml-2">(Reversed)</span>}
                </h3>
                
                {/* Disclaimer line */}
                <p className="font-body text-sm text-celestial-muted italic mt-4">
                  this is not a prediction - just a perspective to explore
                </p>
                
                {/* Interpretation */}
                <div className="font-reading text-base sm:text-lg text-center text-[#E8DCC8] leading-relaxed max-w-xl mt-4">
                  {dailyCard.interpretation}
                </div>

                {/* Feedback Section */}
                <div className="mt-8 pt-6 border-t border-celestial-border w-full max-w-md">
                  <p className="font-body text-sm text-celestial-muted text-center mb-4">
                    did this perspective show up today?
                  </p>
                  
                  {!feedbackGiven ? (
                    <div className="flex justify-center gap-3" data-testid="feedback-buttons">
                      <button
                        onClick={() => handleFeedback('yes')}
                        data-testid="feedback-yes-btn"
                        className="px-6 py-2 border border-gold-base/50 text-gold-base font-ui text-sm uppercase tracking-wider hover:bg-gold-base/10 transition-all duration-300 rounded"
                      >
                        yes
                      </button>
                      <button
                        onClick={() => handleFeedback('not_really')}
                        data-testid="feedback-not-really-btn"
                        className="px-6 py-2 border border-celestial-border text-celestial-muted font-ui text-sm uppercase tracking-wider hover:border-gold-base/30 hover:text-celestial-text transition-all duration-300 rounded"
                      >
                        not really
                      </button>
                      <button
                        onClick={() => handleFeedback('no')}
                        data-testid="feedback-no-btn"
                        className="px-6 py-2 border border-celestial-border text-celestial-muted font-ui text-sm uppercase tracking-wider hover:border-gold-base/30 hover:text-celestial-text transition-all duration-300 rounded"
                      >
                        no
                      </button>
                    </div>
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-body text-sm text-gold-base text-center"
                      data-testid="feedback-saved"
                    >
                      {showSaved ? 'saved' : 'thank you for your feedback'}
                    </motion.p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12" data-testid="daily-card-error">
                <div className="font-reading text-red-400">Unable to draw daily card. Please try again later.</div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-celestial-card border border-celestial-border p-8 rounded-lg hover:border-gold-base/50 transition-all duration-300 max-w-2xl mx-auto">
            <h3 className="font-subheading text-2xl text-celestial-text mb-3 tracking-wide">Explore a decision</h3>
            <p className="font-body text-base text-celestial-muted mb-6 leading-relaxed">
              Get clarity on a situation that matters to you
            </p>
            <button
              onClick={() => navigate('/draw')}
              data-testid="start-reading-btn"
              className="bg-gold-base text-celestial-dark font-ui uppercase tracking-widest px-10 py-4 text-lg hover:bg-gold-shimmer transition-all duration-300 w-full"
            >
              start a decision
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
