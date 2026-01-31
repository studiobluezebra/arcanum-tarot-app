import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TarotCard = ({ card, reversed = false, position, onClick, isRevealed = false, size = 'medium' }) => {
  const [isFlipped, setIsFlipped] = useState(isRevealed);

  React.useEffect(() => {
    setIsFlipped(isRevealed);
  }, [isRevealed]);

  const sizeClasses = {
    small: 'w-24 h-36',
    medium: 'w-40 h-60',
    large: 'w-48 h-72',
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {position && (
        <div className="font-subheading text-sm sm:text-base text-ink-black tracking-wide" data-testid={`position-${position.toLowerCase()}`}>
          {position}
        </div>
      )}
      <motion.div
        className={`${sizeClasses[size]} cursor-pointer perspective-1000`}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid={card ? `tarot-card-${card.id}` : 'tarot-card-back'}
      >
        <motion.div
          className="relative w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute w-full h-full rounded-lg border-4 border-white/10 shadow-2xl bg-cover bg-center"
            style={{
              backfaceVisibility: 'hidden',
              backgroundImage: 'url(https://images.unsplash.com/photo-1739475981422-95aea37df49e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMHRhcm90JTIwY2FyZCUyMGJhY2slMjBkZXNpZ24lMjBwYXR0ZXJufGVufDB8fHx8MTc2OTgzMzg0MHww&ixlib=rb-4.1.0&q=85)',
            }}
          >
            <div className="w-full h-full bg-gold-antique/80 flex items-center justify-center">
              <div className="text-gold-shimmer font-heading text-4xl">✦</div>
            </div>
          </div>

          <div
            className="absolute w-full h-full rounded-lg border-4 border-gold-base shadow-2xl bg-parchment-surface overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {card && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {card.image_url ? (
                  <img 
                    src={card.image_url} 
                    alt={card.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4">
                    <div className="font-heading text-base sm:text-lg lg:text-xl text-center text-ink-black mb-2">
                      {card.name}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-4xl sm:text-5xl lg:text-6xl">
                        {card.arcana === 'major' ? '✦' : getSuitSymbol(card.suit)}
                      </div>
                    </div>
                    <div className="font-body text-xs sm:text-sm text-center text-ink-faded mt-2 line-clamp-2">
                      {card.upright_meaning}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const getSuitSymbol = (suit) => {
  const symbols = {
    wands: '🔥',
    cups: '💧',
    swords: '⚔️',
    pentacles: '🪙',
  };
  return symbols[suit] || '✦';
};

export default TarotCard;