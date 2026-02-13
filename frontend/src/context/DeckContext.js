import React, { createContext, useContext, useState, useEffect } from 'react';

const DeckContext = createContext();

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return context;
};

export const DeckProvider = ({ children }) => {
  const [selectedDeck, setSelectedDeck] = useState(() => {
    return localStorage.getItem('selectedDeck') || 'original';
  });
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDecks();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedDeck', selectedDeck);
  }, [selectedDeck]);

  const fetchDecks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/decks`);
      const data = await response.json();
      setDecks(data);
    } catch (error) {
      console.error('Error fetching decks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCardImageUrl = (cardId) => {
    return `/cards/${selectedDeck}/${cardId}.png`;
  };

  const getBackImageUrl = () => {
    return `/cards/${selectedDeck}/back.png`;
  };

  const value = {
    selectedDeck,
    setSelectedDeck,
    decks,
    loading,
    getCardImageUrl,
    getBackImageUrl
  };

  return (
    <DeckContext.Provider value={value}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckContext;
