import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useDeck } from '../context/DeckContext';

const ReadingResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reading = location.state?.reading;
  const { getCardImageUrl } = useDeck();

  if (!reading) {
    return (
      <div className="min-h-screen py-20 bg-[#141414]" data-testid="no-reading-error">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl text-[#D4AF37] mb-4">No Reading Found</h1>
          <p className="font-reading text-[#8B8B8B] mb-8">Please draw cards first to get a reading.</p>
          <button
            onClick={() => navigate('/draw')}
            data-testid="go-to-draw-btn"
            className="bg-[#D4AF37] text-[#141414] font-ui uppercase tracking-widest px-8 py-3 hover:bg-[#E8C872] transition-all duration-300"
          >
            Draw Cards
          </button>
        </div>
      </div>
    );
  }

  // Parse interpretation - remove markdown and split by position
  const parseInterpretation = (text) => {
    if (!text) return { cardReadings: [], synthesis: '' };
    
    // Clean markdown symbols
    let cleanText = text
      .replace(/#{1,6}\s*/g, '')
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
      .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .trim();
    
    const lines = cleanText.split('\n').filter(line => line.trim());
    let cardReadings = [];
    let synthesis = '';
    let currentSection = '';
    let currentContent = '';
    let inSynthesis = false;
    let remainingText = [];
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase().trim();
      
      if (lowerLine.startsWith('past') && (lowerLine.includes(':') || lowerLine.includes('-') || lowerLine.includes('('))) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = 'Past';
        currentContent = line.replace(/^past[:\-\s\(]*/i, '').replace(/\)?\s*$/, '').trim();
        inSynthesis = false;
      } else if (lowerLine.startsWith('present') && (lowerLine.includes(':') || lowerLine.includes('-') || lowerLine.includes('('))) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = 'Present';
        currentContent = line.replace(/^present[:\-\s\(]*/i, '').replace(/\)?\s*$/, '').trim();
        inSynthesis = false;
      } else if (lowerLine.startsWith('future') && (lowerLine.includes(':') || lowerLine.includes('-') || lowerLine.includes('('))) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = 'Future';
        currentContent = line.replace(/^future[:\-\s\(]*/i, '').replace(/\)?\s*$/, '').trim();
        inSynthesis = false;
      } else if (lowerLine.includes('synthesis') || lowerLine.includes('overall') || lowerLine.includes('summary') || lowerLine.includes('together') || lowerLine.includes('conclusion') || lowerLine.includes('guidance')) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = '';
        currentContent = '';
        inSynthesis = true;
        // Check if there's content after the label on the same line
        const afterLabel = line.replace(/^.*(synthesis|overall|summary|together|conclusion|guidance)[:\-\s]*/i, '').trim();
        if (afterLabel) {
          synthesis += afterLabel + ' ';
        }
      } else if (inSynthesis) {
        synthesis += line.trim() + ' ';
      } else if (currentSection) {
        currentContent += ' ' + line.trim();
      } else {
        remainingText.push(line.trim());
      }
    }
    
    if (currentSection && currentContent) {
      cardReadings.push({ position: currentSection, content: currentContent.trim() });
    }
    
    // If we have card readings but no synthesis, use remaining text
    if (cardReadings.length > 0 && !synthesis.trim() && remainingText.length > 0) {
      synthesis = remainingText.join(' ');
    }
    
    // If no structured parsing worked, use full text as synthesis
    if (cardReadings.length === 0) {
      synthesis = cleanText;
    }
    
    // Clean up synthesis - ensure it starts properly as a sentence
    synthesis = synthesis.trim();
    // Remove leading punctuation and whitespace
    synthesis = synthesis.replace(/^[,;:\-–—\s]+/, '');
    // Capitalize first letter
    if (synthesis.length > 0) {
      synthesis = synthesis.charAt(0).toUpperCase() + synthesis.slice(1);
    }
    
    return { cardReadings, synthesis: synthesis.trim() };
  };

  const { cardReadings, synthesis } = parseInterpretation(reading.interpretation);

  // Get card for each position
  const getCardForPosition = (position) => {
    const drawn = reading.cards.find(c => c.position === position);
    return drawn?.card;
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-[#141414]" data-testid="reading-result-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Question */}
        {reading.question && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="font-reading text-lg text-[#8B8B8B] italic" data-testid="reading-question">
              "{reading.question}"
            </p>
          </motion.div>
        )}

        {/* Card Readings - Vertical Layout with Card Image */}
        <div className="space-y-12 mb-20">
          {['Past', 'Present', 'Future'].map((position, index) => {
            const card = getCardForPosition(position);
            const cardReading = cardReadings.find(r => r.position === position);
            
            if (!card) return null;
            
            const cardImageUrl = getCardImageUrl(card.id);
            
            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex gap-6 sm:gap-8"
              >
                {/* Card Image - Left Side */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 rounded-lg overflow-hidden border-2 border-[#3D3D3D]">
                    <img 
                      src={cardImageUrl} 
                      alt={card.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                
                {/* Text Content - Right Side */}
                <div className="flex-1 border-l-2 border-[#3D3D3D] pl-6">
                  {/* Position Label */}
                  <div className="font-ui text-xs tracking-[0.3em] uppercase text-[#8B8B8B] mb-2">
                    {position}
                  </div>
                  
                  {/* Card Name - Big, decorative font */}
                  <h2 className="font-heading text-2xl sm:text-3xl text-[#D4AF37] mb-4">
                    {card.name}
                  </h2>
                  
                  {/* Interpretation - Roboto font */}
                  <p className="font-reading text-base sm:text-lg text-[#E8DCC8] leading-relaxed">
                    {cardReading ? cardReading.content : card.upright_meaning}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Oracle's Synthesis - After all three cards */}
        {synthesis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-[#3D3D3D] pt-12 mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl sm:text-2xl text-[#D4AF37] tracking-widest uppercase">
                The Oracle's Synthesis
              </h2>
            </div>
            <p
              className="font-reading text-base sm:text-lg text-[#E8DCC8] leading-relaxed text-center max-w-3xl mx-auto"
              data-testid="reading-interpretation"
            >
              {synthesis}
            </p>
          </motion.div>
        )}

        {/* Follow-up Questions - Based on the spread */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="border-t border-[#3D3D3D] pt-12 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-xl sm:text-2xl text-[#D4AF37] tracking-widest uppercase">
              Go Deeper
            </h2>
            <p className="font-reading text-sm text-[#8B8B8B] mt-2">
              Based on your reading, consider exploring these questions for more guidance
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {reading.cards && reading.cards.map((drawn, index) => {
              const position = drawn.position;
              const cardName = drawn.card.name;
              const suggestions = {
                Past: `What lessons from "${cardName}" should I carry forward?`,
                Present: `How can I better work with the energy of "${cardName}" right now?`,
                Future: `What actions can help me align with the potential of "${cardName}"?`
              };
              return (
                <div 
                  key={index}
                  className="bg-[#1E1E1E] border border-[#3D3D3D] p-4 rounded-lg hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                  onClick={() => {
                    navigate('/draw', { state: { prefillQuestion: suggestions[position] } });
                  }}
                >
                  <p className="font-ui text-xs text-[#8B8B8B] uppercase tracking-widest mb-2">
                    {position}
                  </p>
                  <p className="font-reading text-base text-[#E8DCC8]">
                    {suggestions[position]}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center gap-4 flex-wrap pt-8"
        >
          <button
            onClick={() => navigate('/draw')}
            data-testid="new-reading-btn"
            className="bg-[#D4AF37] text-[#141414] font-ui uppercase tracking-widest px-8 py-3 hover:bg-[#E8C872] transition-all duration-300"
          >
            New Reading
          </button>
          <button
            onClick={() => navigate('/history')}
            data-testid="view-history-btn"
            className="bg-transparent text-[#8B8B8B] border border-[#3D3D3D] font-ui uppercase tracking-widest px-8 py-3 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            View History
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ReadingResult;
