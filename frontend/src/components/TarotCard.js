import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDeck } from '../context/DeckContext';

const TarotCard = ({ card, reversed = false, position, onClick, isRevealed = false, size = 'medium' }) => {
  const [isFlipped, setIsFlipped] = useState(isRevealed);
  const { selectedDeck, getCardImageUrl, getBackImageUrl } = useDeck();

  React.useEffect(() => {
    setIsFlipped(isRevealed);
  }, [isRevealed]);

  const sizeClasses = {
    small: 'w-24 h-36',
    medium: 'w-40 h-60',
    large: 'w-52 h-[312px]',
    xlarge: 'w-64 h-[384px]',
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  // Get image URL based on selected deck
  const cardImageUrl = card ? getCardImageUrl(card.id) : null;
  const backImageUrl = getBackImageUrl();

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
            className="absolute w-full h-full rounded-lg border-4 border-gold-base shadow-2xl bg-cover bg-center"
            style={{
              backfaceVisibility: 'hidden',
              backgroundImage: `url(${backImageUrl})`,
              backgroundSize: 'cover',
            }}
          >
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
                <CardFace card={card} cardImageUrl={cardImageUrl} />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const CardFace = ({ card, cardImageUrl }) => {
  const [imageError, setImageError] = useState(false);

  if (cardImageUrl && !imageError) {
    return (
      <img 
        src={cardImageUrl} 
        alt={card.name}
        className="w-full h-full object-cover rounded-lg"
        onError={() => setImageError(true)}
      />
    );
  }

  // Fallback text-based display
  return (
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