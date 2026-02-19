import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { usePremium } from '../context/PremiumContext';
import { useDeck } from '../context/DeckContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ClarifierPanel = ({ 
  isOpen, 
  onClose, 
  originalQuestion, 
  originalCards,
  originalInterpretation 
}) => {
  const { isPremium, triggerPaywall } = usePremium();
  const { getCardImageUrl, getBackImageUrl } = useDeck();
  
  const [step, setStep] = useState('select'); // select, draw, revealed, interpretation
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [clarifierCard, setClarifierCard] = useState(null);
  const [clarifierInterpretation, setClarifierInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clarifierCount, setClarifierCount] = useState(0);

  const focusOptions = [
    { id: 'influence', icon: '🔎', label: 'What is influencing this situation?' },
    { id: 'blind_spot', icon: '👁️', label: 'What am I not seeing clearly?' },
    { id: 'action', icon: '🧭', label: 'What should I do next?' },
    { id: 'outcome', icon: '🔮', label: 'What outcome is most likely?' },
  ];

  const handleSelectFocus = (focus) => {
    // Check if free user already used 2 clarifiers
    if (!isPremium && clarifierCount >= 2) {
      triggerPaywall('Unlock deeper clarity. Continue your deep dive with unlimited clarifier draws.');
      return;
    }
    
    setSelectedFocus(focus);
    setStep('draw');
  };

  const handleDrawCard = async () => {
    setIsLoading(true);
    try {
      // Draw a random card (POST request)
      const response = await axios.post(`${API}/draw`, { count: 1 });
      const card = response.data[0];
      setClarifierCard(card);
      setStep('revealed');
      
      // Get interpretation
      await getClarifierInterpretation(card);
      setClarifierCount(prev => prev + 1);
    } catch (error) {
      console.error('Error drawing clarifier card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getClarifierInterpretation = async (card) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/clarifier-interpret`, {
        original_question: originalQuestion,
        original_cards: originalCards,
        clarifier_focus: selectedFocus.id,
        clarifier_focus_label: selectedFocus.label,
        clarifier_card: card.card
      });
      setClarifierInterpretation(response.data.interpretation);
      setStep('interpretation');
    } catch (error) {
      console.error('Error getting clarifier interpretation:', error);
      setClarifierInterpretation('Unable to generate interpretation. Please try again.');
      setStep('interpretation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextAction = (action) => {
    // Check premium for additional clarifiers (allow 2 free per reading)
    if (!isPremium && clarifierCount >= 2) {
      triggerPaywall('Unlock deeper clarity. Continue your deep dive with unlimited clarifier draws.');
      return;
    }
    
    // Map action to focus
    const actionToFocus = {
      'influence': focusOptions[0],
      'action': focusOptions[2],
      'outcome': focusOptions[3]
    };
    
    setSelectedFocus(actionToFocus[action]);
    setClarifierCard(null);
    setClarifierInterpretation('');
    setStep('draw');
  };

  const resetPanel = () => {
    setStep('select');
    setSelectedFocus(null);
    setClarifierCard(null);
    setClarifierInterpretation('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#141414] border border-[#3D3D3D] rounded-lg max-w-lg w-full p-6 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8B8B8B] hover:text-[#E8DCC8] transition-colors"
          >
            ✕
          </button>

          {/* Step 1: Select Focus */}
          {step === 'select' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-heading text-xl text-[#D4AF37] text-center mb-2">
                What would you like to understand better?
              </h2>
              <p className="font-reading text-sm text-[#8B8B8B] text-center mb-6">
                Select one aspect to clarify
              </p>
              
              <div className="space-y-3">
                {focusOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectFocus(option)}
                    className="w-full bg-[#1E1E1E] border border-[#3D3D3D] p-4 rounded-lg text-left hover:border-[#D4AF37]/50 transition-all flex items-center gap-3"
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-reading text-[#E8DCC8]">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Draw Card */}
          {step === 'draw' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="font-reading text-[#8B8B8B] mb-2">{selectedFocus?.icon} {selectedFocus?.label}</p>
              <h2 className="font-heading text-xl text-[#D4AF37] mb-6">
                Draw 1 card to clarify this aspect
              </h2>
              
              {/* Face-down card */}
              <div 
                className="w-40 h-60 mx-auto mb-6 cursor-pointer"
                onClick={handleDrawCard}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-full bg-gradient-to-br from-[#D4AF37]/20 to-[#1E1E1E] border-2 border-[#D4AF37]/30 rounded-lg flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="text-[#D4AF37] animate-pulse">Drawing...</div>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🃏</div>
                      <div className="font-ui text-xs text-[#D4AF37] uppercase tracking-widest">
                        Tap to Draw
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Card Revealed */}
          {step === 'revealed' && clarifierCard && (
            <motion.div
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="font-reading text-sm text-[#8B8B8B] mb-4">{selectedFocus?.label}</p>
              
              <div className="w-48 h-72 mx-auto mb-4">
                <img
                  src={getCardImageUrl(clarifierCard.card.id)}
                  alt={clarifierCard.card.name}
                  className="w-full h-full object-cover rounded-lg border-2 border-[#D4AF37]/30"
                />
              </div>
              
              <h3 className="font-heading text-2xl text-[#D4AF37] mb-4">
                {clarifierCard.card.name}
              </h3>
              
              {isLoading && (
                <div className="text-[#8B8B8B] animate-pulse">Interpreting...</div>
              )}
            </motion.div>
          )}

          {/* Step 4: Interpretation */}
          {step === 'interpretation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-4">
                <p className="font-reading text-sm text-[#8B8B8B]">{selectedFocus?.label}</p>
              </div>
              
              {/* Card Image Small */}
              {clarifierCard && (
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-36">
                    <img
                      src={getCardImageUrl(clarifierCard.card.id)}
                      alt={clarifierCard.card.name}
                      className="w-full h-full object-cover rounded-lg border border-[#3D3D3D]"
                    />
                  </div>
                </div>
              )}
              
              <h3 className="font-heading text-xl text-[#D4AF37] text-center mb-4">
                {clarifierCard?.card.name}
              </h3>
              
              {/* Interpretation */}
              <div className="bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg p-4 mb-6">
                <p className="font-reading text-[#E8DCC8] leading-relaxed">
                  {clarifierInterpretation}
                </p>
              </div>

              {/* Next Actions */}
              <div className="text-center">
                <h4 className="font-ui text-xs text-[#8B8B8B] uppercase tracking-widest mb-4">
                  Continue Exploring This Situation
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleNextAction('influence')}
                    className="w-full bg-transparent border border-[#3D3D3D] text-[#E8DCC8] font-ui text-sm py-3 rounded hover:border-[#D4AF37]/50 transition-all"
                  >
                    Reveal Another Influence
                  </button>
                  <button
                    onClick={() => handleNextAction('action')}
                    className="w-full bg-transparent border border-[#3D3D3D] text-[#E8DCC8] font-ui text-sm py-3 rounded hover:border-[#D4AF37]/50 transition-all"
                  >
                    Get Advice For Action
                  </button>
                  <button
                    onClick={() => handleNextAction('outcome')}
                    className="w-full bg-transparent border border-[#3D3D3D] text-[#E8DCC8] font-ui text-sm py-3 rounded hover:border-[#D4AF37]/50 transition-all"
                  >
                    Explore Likely Outcome
                  </button>
                </div>
                
                <button
                  onClick={onClose}
                  className="mt-4 text-[#8B8B8B] font-reading text-sm hover:text-[#E8DCC8] transition-colors"
                >
                  Done exploring
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClarifierPanel;
