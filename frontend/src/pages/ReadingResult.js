import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import TarotCard from '../components/TarotCard';

const positionColors = {
  Past: 'border-position-past text-position-past',
  Present: 'border-position-present text-position-present',
  Future: 'border-position-future text-position-future'
};

const positionBgColors = {
  Past: 'bg-position-past/10 border-position-past/30',
  Present: 'bg-position-present/10 border-position-present/30',
  Future: 'bg-position-future/10 border-position-future/30'
};

const ReadingResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reading = location.state?.reading;

  if (!reading) {
    return (
      <div className="min-h-screen py-20 bg-celestial-dark" data-testid="no-reading-error">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl text-gold-base mb-4">No Reading Found</h1>
          <p className="font-body text-celestial-muted mb-8">Please draw cards first to get a reading.</p>
          <button
            onClick={() => navigate('/draw')}
            data-testid="go-to-draw-btn"
            className="bg-gold-base text-celestial-dark font-ui uppercase tracking-widest px-8 py-3 hover:bg-gold-shimmer transition-all duration-300"
          >
            Draw Cards
          </button>
        </div>
      </div>
    );
  }

  // Parse interpretation to separate card readings from synthesis
  const parseInterpretation = (text) => {
    if (!text) return { cardReadings: [], synthesis: '' };
    
    const lines = text.split('\n');
    let cardReadings = [];
    let synthesis = '';
    let currentSection = '';
    let currentContent = '';
    
    for (const line of lines) {
      if (line.toLowerCase().includes('past:') || line.toLowerCase().includes('past -')) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = 'Past';
        currentContent = line.replace(/past[:\-]/i, '').trim();
      } else if (line.toLowerCase().includes('present:') || line.toLowerCase().includes('present -')) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = 'Present';
        currentContent = line.replace(/present[:\-]/i, '').trim();
      } else if (line.toLowerCase().includes('future:') || line.toLowerCase().includes('future -')) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = 'Future';
        currentContent = line.replace(/future[:\-]/i, '').trim();
      } else if (line.toLowerCase().includes('synthesis') || line.toLowerCase().includes('overall') || line.toLowerCase().includes('summary') || line.toLowerCase().includes('together')) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = 'synthesis';
        currentContent = '';
      } else if (currentSection === 'synthesis') {
        synthesis += line + '\n';
      } else if (currentSection) {
        currentContent += ' ' + line;
      }
    }
    
    if (currentSection && currentSection !== 'synthesis' && currentContent) {
      cardReadings.push({ position: currentSection, content: currentContent.trim() });
    }
    
    // If no structured parsing worked, use full text as synthesis
    if (cardReadings.length === 0) {
      synthesis = text;
    }
    
    return { cardReadings, synthesis: synthesis.trim() };
  };

  const { cardReadings, synthesis } = parseInterpretation(reading.interpretation);

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-celestial-dark" data-testid="reading-result-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-5xl text-gold-base mb-4">Your Reading</h1>
          {reading.question && (
            <div className="max-w-3xl mx-auto">
              <p className="font-subheading text-xl sm:text-2xl text-celestial-text italic" data-testid="reading-question">
                "{reading.question}"
              </p>
            </div>
          )}
        </motion.div>

        {/* Cards with individual interpretations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reading.cards.map((drawn, index) => {
              const cardReading = cardReadings.find(r => r.position === drawn.position);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`flex flex-col items-center p-6 rounded-lg border ${positionBgColors[drawn.position] || 'bg-celestial-card/50 border-celestial-border'}`}
                >
                  {/* Position label */}
                  <div className={`font-subheading text-lg tracking-widest uppercase mb-4 ${positionColors[drawn.position] || 'text-celestial-text'}`}>
                    {drawn.position}
                  </div>
                  
                  {/* Card */}
                  <TarotCard
                    card={drawn.card}
                    reversed={drawn.reversed}
                    isRevealed={true}
                    size="medium"
                  />
                  
                  {/* Card name */}
                  <h3 className="font-subheading text-xl text-celestial-text mt-4 mb-2 text-center">
                    {drawn.card.name}
                  </h3>
                  
                  {/* Individual interpretation */}
                  {cardReading && (
                    <p className="font-body text-sm text-celestial-muted text-center leading-relaxed mt-2">
                      {cardReading.content}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Oracle's Synthesis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-celestial-card border border-gold-base/30 p-8 sm:p-12 rounded-lg shadow-2xl max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-base/50"></div>
            <h2 className="font-heading text-xl sm:text-2xl text-gold-base tracking-widest uppercase">
              The Oracle's Synthesis
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-base/50"></div>
          </div>
          <div
            className="font-body text-base sm:text-lg text-celestial-text leading-relaxed whitespace-pre-wrap text-center"
            data-testid="reading-interpretation"
          >
            {synthesis || reading.interpretation}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => navigate('/draw')}
            data-testid="new-reading-btn"
            className="bg-gold-base text-celestial-dark font-ui uppercase tracking-widest px-8 py-3 hover:bg-gold-shimmer transition-all duration-300"
          >
            New Reading
          </button>
          <button
            onClick={() => navigate('/history')}
            data-testid="view-history-btn"
            className="bg-transparent text-celestial-muted border border-celestial-border font-ui uppercase tracking-widest px-8 py-3 hover:border-gold-base hover:text-gold-base transition-all duration-300"
          >
            View History
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ReadingResult;
