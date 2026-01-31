import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import TarotCard from '../components/TarotCard';
import { GiCrystalBall } from 'react-icons/gi';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const [dailyCard, setDailyCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyCard();
  }, []);

  const fetchDailyCard = async () => {
    try {
      const response = await axios.get(`${API}/daily-card`);
      setDailyCard(response.data);
    } catch (error) {
      console.error('Error fetching daily card:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-20" data-testid="home-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GiCrystalBall className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 text-gold-base" />
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-black mb-4">
            The Arcanum
          </h1>
          <p className="font-body text-lg sm:text-xl text-ink-faded max-w-2xl mx-auto leading-relaxed">
            Unlock the wisdom of the tarot. Seek guidance through the ancient art of divination,
            where psychology meets mysticism.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="ornate-border bg-parchment-surface/50 backdrop-blur-sm p-8 sm:p-12 rounded-sm shadow-2xl max-w-3xl mx-auto">
            <h2 className="font-subheading text-2xl sm:text-3xl text-center text-ink-black mb-8 tracking-wide">
              Your Daily Card
            </h2>
            
            {loading ? (
              <div className="text-center py-12" data-testid="daily-card-loading">
                <div className="font-body text-ink-faded">Drawing your daily card...</div>
              </div>
            ) : dailyCard ? (
              <div className="flex flex-col items-center gap-6" data-testid="daily-card-display">
                <TarotCard
                  card={dailyCard.card}
                  reversed={dailyCard.card.reversed}
                  isRevealed={true}
                  size="large"
                />
                <div className="font-body text-base sm:text-lg text-center text-ink-black leading-relaxed max-w-xl">
                  {dailyCard.interpretation}
                </div>
              </div>
            ) : (
              <div className="text-center py-12" data-testid="daily-card-error">
                <div className="font-body text-blood-dried">Unable to draw daily card. Please try again later.</div>
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
          <div className="bg-parchment-surface/30 backdrop-blur-sm border border-gold-antique/30 p-8 rounded-sm hover:shadow-xl transition-shadow duration-300 max-w-2xl mx-auto">
            <h3 className="font-subheading text-2xl text-ink-black mb-3 tracking-wide">Three Card Reading</h3>
            <p className="font-body text-base text-ink-faded mb-6 leading-relaxed">
              Explore past, present, and future to understand your journey. Ask your question and receive guidance.
            </p>
            <button
              onClick={() => navigate('/draw')}
              data-testid="start-reading-btn"
              className="wax-seal-btn bg-gold-base text-ink-black font-ui uppercase tracking-widest px-10 py-4 text-lg border-2 border-double border-ink-black hover:bg-gold-shimmer transition-all duration-300 shadow-lg w-full"
            >
              Begin Your Reading
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;