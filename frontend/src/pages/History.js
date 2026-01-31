import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import { GiScrollUnfurled } from 'react-icons/gi';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const History = () => {
  const navigate = useNavigate();
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    try {
      const response = await axios.get(`${API}/readings`);
      setReadings(response.data);
    } catch (error) {
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSpreadName = (spreadType) => {
    const names = {
      'three-card': 'Three Card Spread',
      'celtic-cross': 'Celtic Cross',
    };
    return names[spreadType] || 'Single Card';
  };

  return (
    <div className="min-h-screen py-12 sm:py-20" data-testid="history-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <GiScrollUnfurled className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-gold-base" />
          <h1 className="font-heading text-4xl sm:text-5xl text-ink-black mb-4">Reading History</h1>
          <p className="font-body text-base sm:text-lg text-ink-faded max-w-2xl mx-auto">
            Revisit your past readings and reflect on the guidance you've received.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12" data-testid="history-loading">
            <div className="font-body text-ink-faded">Loading your readings...</div>
          </div>
        ) : readings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center py-12"
            data-testid="no-readings"
          >
            <div className="font-body text-ink-faded mb-8">You haven't done any readings yet.</div>
            <button
              onClick={() => navigate('/draw')}
              data-testid="start-first-reading-btn"
              className="wax-seal-btn bg-gold-base text-ink-black font-ui uppercase tracking-widest px-8 py-3 border-2 border-double border-ink-black hover:bg-gold-shimmer transition-all duration-300 shadow-lg"
            >
              Start Your First Reading
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {readings.map((reading, index) => (
              <motion.div
                key={reading.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-parchment-surface/50 backdrop-blur-sm border border-gold-antique/30 p-6 sm:p-8 rounded-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate('/reading', { state: { reading } })}
                data-testid={`reading-${reading.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <div className="font-ui text-xs uppercase tracking-widest text-gold-antique mb-1">
                      {getSpreadName(reading.spread_type)}
                    </div>
                    {reading.question && (
                      <h3 className="font-subheading text-xl text-ink-black italic" data-testid={`question-${reading.id}`}>
                        "{reading.question}"
                      </h3>
                    )}
                  </div>
                  <div className="font-body text-sm text-ink-faded mt-2 sm:mt-0">
                    {formatDate(reading.timestamp)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {reading.cards.map((drawn, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="font-body text-sm px-3 py-1 bg-gold-base/20 border border-gold-antique/50 rounded-sm"
                    >
                      {drawn.card.name}
                    </div>
                  ))}
                </div>

                <div className="font-body text-sm text-ink-black line-clamp-3 leading-relaxed">
                  {reading.interpretation}
                </div>

                <div className="mt-4 font-ui text-xs uppercase tracking-widest text-gold-base hover:text-gold-shimmer transition-colors">
                  View Full Reading →
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;