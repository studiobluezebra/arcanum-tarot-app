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

  // Get card metadata from interpretation response
  const cardMetadata = reading.card_metadata || [];

  // Get metadata for a card by its id
  const getMetadataForCard = (cardId) => {
    return cardMetadata.find(m => m.card_id === cardId) || {};
  };

  // Collect decision prompts from all cards
  const getCardDecisionPrompts = () => {
    const allPrompts = [];
    cardMetadata.forEach(meta => {
      if (meta.decision_prompts) {
        allPrompts.push(...meta.decision_prompts.slice(0, 1)); // Take 1 from each card
      }
    });
    return allPrompts.length > 0 ? allPrompts : [
      'What feels promising but unclear?',
      'What information is still missing?',
      'What small step would reduce uncertainty?'
    ];
  };

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
    
    // Position mappings for parsing
    const positionKeywords = {
      'influencing forces': 'Influencing Forces',
      'influencing': 'Influencing Forces',
      'past': 'Influencing Forces',
      'current mindset': 'Current Mindset',
      'current': 'Current Mindset',
      'present': 'Current Mindset',
      'emerging direction': 'Emerging Direction',
      'emerging': 'Emerging Direction',
      'future': 'Emerging Direction'
    };
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase().trim();
      
      // Check for position keywords
      let foundPosition = null;
      for (const [keyword, position] of Object.entries(positionKeywords)) {
        if (lowerLine.startsWith(keyword) && (lowerLine.includes(':') || lowerLine.includes('-') || lowerLine.includes('('))) {
          foundPosition = position;
          break;
        }
      }
      
      if (foundPosition) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = foundPosition;
        // Remove the position label from the content
        currentContent = line.replace(/^[^:–\-]+[:\-–]\s*/i, '').trim();
        inSynthesis = false;
      } else if (lowerLine.includes('decision insight') || lowerLine.includes('synthesis') || lowerLine.includes('overall') || lowerLine.includes('summary') || lowerLine.includes('together') || lowerLine.includes('conclusion') || lowerLine.includes('guidance')) {
        if (currentSection && currentContent) {
          cardReadings.push({ position: currentSection, content: currentContent.trim() });
        }
        currentSection = '';
        currentContent = '';
        inSynthesis = true;
        // Check if there's content after the label on the same line
        const afterLabel = line.replace(/^.*(decision insight|synthesis|overall|summary|together|conclusion|guidance)[:\-\s]*/i, '').trim();
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

  // Get decision prompts from cards
  const decisionPrompts = getCardDecisionPrompts();

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
          {[
            { position: 'Influencing Forces', subtitle: 'what shaped the situation', oldPosition: 'Past' },
            { position: 'Current Mindset', subtitle: 'what is active now', oldPosition: 'Present' },
            { position: 'Emerging Direction', subtitle: 'what may develop if nothing changes', oldPosition: 'Future' }
          ].map((posData, index) => {
            const card = getCardForPosition(posData.oldPosition);
            const cardReading = cardReadings.find(r => r.position === posData.position);
            
            if (!card) return null;
            
            const cardImageUrl = getCardImageUrl(card.id);
            const metadata = getMetadataForCard(card.id);
            const lensKeyword = metadata.lens_keyword || '';
            const coreDynamic = metadata.core_dynamic || '';
            const situationHighlights = metadata.situation_highlights || [];
            
            return (
              <motion.div
                key={posData.position}
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
                  <div className="font-ui text-xs tracking-[0.3em] uppercase text-[#8B8B8B] mb-1">
                    {posData.position}
                  </div>
                  <div className="font-reading text-xs text-[#6B6B6B] italic mb-3">
                    {posData.subtitle}
                  </div>
                  
                  {/* Lens Keyword Chip */}
                  {lensKeyword && (
                    <div className="inline-block mb-3">
                      <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] font-ui text-xs uppercase tracking-wider">
                        {lensKeyword}
                      </span>
                    </div>
                  )}
                  
                  {/* Card Name - Big, decorative font */}
                  <h2 className="font-heading text-2xl sm:text-3xl text-[#D4AF37] mb-2">
                    {card.name}
                  </h2>
                  
                  {/* Core Dynamic - One line under card name */}
                  {coreDynamic && (
                    <p className="font-reading text-sm text-[#B8B8B8] italic mb-4">
                      {coreDynamic}
                    </p>
                  )}
                  
                  {/* Situation Highlights - 2 bullet points */}
                  {situationHighlights.length > 0 && (
                    <ul className="mb-4 space-y-1">
                      {situationHighlights.map((highlight, i) => (
                        <li key={i} className="font-reading text-sm text-[#A8A8A8] flex items-start gap-2">
                          <span className="text-[#D4AF37]">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Interpretation - Roboto font */}
                  <p className="font-reading text-base sm:text-lg text-[#E8DCC8] leading-relaxed">
                    {cardReading ? cardReading.content : card.upright_meaning}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decision Insight - After all three cards */}
        {synthesis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-[#3D3D3D] pt-12 mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl sm:text-2xl text-[#D4AF37] tracking-widest uppercase">
                Decision Insight
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

        {/* Reflect Before Deciding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="border-t border-[#3D3D3D] pt-12 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-xl sm:text-2xl text-[#D4AF37] tracking-widest uppercase">
              Reflect Before Deciding
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {decisionPrompts.slice(0, 3).map((question, index) => (
              <div 
                key={index}
                className="bg-[#1E1E1E] border border-[#3D3D3D] p-4 rounded-lg"
              >
                <p className="font-reading text-base text-[#E8DCC8]">
                  {question}
                </p>
              </div>
            ))}
            <p className="font-reading text-sm text-[#8B8B8B] text-center mt-6 italic">
              This creates decision momentum.
            </p>
          </div>
        </motion.div>

        {/* Your Next Step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="border-t border-[#3D3D3D] pt-12 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-xl sm:text-2xl text-[#D4AF37] tracking-widest uppercase">
              Your Next Step
            </h2>
          </div>
          <div className="flex justify-center gap-4 flex-wrap max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/draw')}
              data-testid="need-clarity-btn"
              className="bg-transparent text-[#E8DCC8] border border-[#3D3D3D] font-ui text-sm uppercase tracking-widest px-6 py-3 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              I need more clarity
            </button>
            <button
              onClick={() => navigate('/home')}
              data-testid="see-what-to-do-btn"
              className="bg-[#D4AF37] text-[#141414] font-ui text-sm uppercase tracking-widest px-6 py-3 hover:bg-[#E8C872] transition-all duration-300"
            >
              I see what to do
            </button>
            <button
              onClick={() => navigate('/draw')}
              data-testid="explore-angle-btn"
              className="bg-transparent text-[#E8DCC8] border border-[#3D3D3D] font-ui text-sm uppercase tracking-widest px-6 py-3 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              I want to explore another angle
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ReadingResult;
