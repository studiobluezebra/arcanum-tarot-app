import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import TarotCard from '../components/TarotCard';

const ReadingResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reading = location.state?.reading;

  if (!reading) {
    return (
      <div className="min-h-screen py-20" data-testid="no-reading-error">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl text-ink-black mb-4">No Reading Found</h1>
          <p className="font-body text-ink-faded mb-8">Please draw cards first to get a reading.</p>
          <button
            onClick={() => navigate('/draw')}
            data-testid="go-to-draw-btn"
            className="wax-seal-btn bg-gold-base text-ink-black font-ui uppercase tracking-widest px-8 py-3 border-2 border-double border-ink-black hover:bg-gold-shimmer transition-all duration-300 shadow-lg"
          >
            Draw Cards
          </button>
        </div>
      </div>
    );
  }

  const cardCount = reading.cards?.length || 0;

  return (
    <div className="min-h-screen py-12 sm:py-20" data-testid="reading-result-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-5xl text-ink-black mb-4">Your Reading</h1>
          {reading.question && (
            <div className="max-w-3xl mx-auto">
              <p className="font-subheading text-xl sm:text-2xl text-ink-faded italic" data-testid="reading-question">
                "{reading.question}"
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className={`flex flex-wrap justify-center gap-6 ${
            cardCount > 5 ? 'max-w-6xl mx-auto' : 'max-w-4xl mx-auto'
          }`}>
            {reading.cards.map((drawn, index) => (
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
                  isRevealed={true}
                  size={cardCount > 5 ? 'small' : 'medium'}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="ornate-border bg-parchment-surface/50 backdrop-blur-sm p-8 sm:p-12 rounded-sm shadow-2xl max-w-4xl mx-auto mb-12"
        >
          <h2 className="font-subheading text-2xl sm:text-3xl text-center text-ink-black mb-8 tracking-wide">
            Interpretation
          </h2>
          <div
            className="font-body text-base sm:text-lg text-ink-black leading-loose whitespace-pre-wrap space-y-4"
            style={{ lineHeight: '1.9', letterSpacing: '0.01em' }}
            data-testid="reading-interpretation"
          >
            {reading.interpretation.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => navigate('/draw')}
            data-testid="new-reading-btn"
            className="wax-seal-btn bg-gold-base text-ink-black font-ui uppercase tracking-widest px-8 py-3 border-2 border-double border-ink-black hover:bg-gold-shimmer transition-all duration-300 shadow-lg"
          >
            New Reading
          </button>
          <button
            onClick={() => navigate('/history')}
            data-testid="view-history-btn"
            className="bg-transparent text-ink-faded border border-ink-faded font-ui uppercase tracking-widest px-8 py-3 hover:border-gold-base hover:text-gold-antique transition-all duration-300"
          >
            View History
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ReadingResult;