import React, { createContext, useContext, useState, useEffect } from 'react';

const PremiumContext = createContext();

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

export const PremiumProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [readingsToday, setReadingsToday] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallMessage, setPaywallMessage] = useState('');

  const FREE_READINGS_LIMIT = 2;

  useEffect(() => {
    // Load premium status from localStorage
    const premiumStatus = localStorage.getItem('flipwill_premium');
    const premiumExpiry = localStorage.getItem('flipwill_premium_expiry');
    
    if (premiumStatus === 'true' && premiumExpiry) {
      const expiryDate = new Date(premiumExpiry);
      if (expiryDate > new Date()) {
        setIsPremium(true);
      } else {
        // Premium expired
        localStorage.removeItem('flipwill_premium');
        localStorage.removeItem('flipwill_premium_expiry');
        setIsPremium(false);
      }
    }

    // Load today's reading count
    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('flipwill_readings_date');
    const storedCount = localStorage.getItem('flipwill_readings_count');

    if (storedDate === today && storedCount) {
      setReadingsToday(parseInt(storedCount, 10));
    } else {
      // New day, reset counter
      localStorage.setItem('flipwill_readings_date', today);
      localStorage.setItem('flipwill_readings_count', '0');
      setReadingsToday(0);
    }
  }, []);

  // Check if user can do a reading
  const canDoReading = () => {
    if (isPremium) return true;
    return readingsToday < FREE_READINGS_LIMIT;
  };

  // Get remaining readings for free users
  const getRemainingReadings = () => {
    if (isPremium) return 'unlimited';
    return Math.max(0, FREE_READINGS_LIMIT - readingsToday);
  };

  // Increment reading count
  const incrementReadingCount = () => {
    if (!isPremium) {
      const newCount = readingsToday + 1;
      setReadingsToday(newCount);
      localStorage.setItem('flipwill_readings_count', newCount.toString());
    }
  };

  // Trigger paywall
  const triggerPaywall = (message = 'Unlock FlipWill+ to explore unlimited decisions and track your thinking patterns over time.') => {
    setPaywallMessage(message);
    setShowPaywall(true);
  };

  // Close paywall
  const closePaywall = () => {
    setShowPaywall(false);
    setPaywallMessage('');
  };

  // Mock upgrade to premium (for testing)
  const upgradeToPremium = (plan = 'monthly') => {
    const now = new Date();
    let expiryDate;
    
    if (plan === 'yearly') {
      expiryDate = new Date(now.setFullYear(now.getFullYear() + 1));
    } else {
      expiryDate = new Date(now.setMonth(now.getMonth() + 1));
    }

    localStorage.setItem('flipwill_premium', 'true');
    localStorage.setItem('flipwill_premium_expiry', expiryDate.toISOString());
    localStorage.setItem('flipwill_premium_plan', plan);
    setIsPremium(true);
    setShowPaywall(false);
  };

  // Start free trial
  const startFreeTrial = () => {
    const now = new Date();
    const expiryDate = new Date(now.setDate(now.getDate() + 7)); // 7-day trial

    localStorage.setItem('flipwill_premium', 'true');
    localStorage.setItem('flipwill_premium_expiry', expiryDate.toISOString());
    localStorage.setItem('flipwill_premium_plan', 'trial');
    setIsPremium(true);
    setShowPaywall(false);
  };

  // Cancel premium (for testing)
  const cancelPremium = () => {
    localStorage.removeItem('flipwill_premium');
    localStorage.removeItem('flipwill_premium_expiry');
    localStorage.removeItem('flipwill_premium_plan');
    setIsPremium(false);
  };

  // Get subscription info
  const getSubscriptionInfo = () => {
    const plan = localStorage.getItem('flipwill_premium_plan') || 'none';
    const expiry = localStorage.getItem('flipwill_premium_expiry');
    return {
      plan,
      expiry: expiry ? new Date(expiry) : null,
      isActive: isPremium
    };
  };

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        readingsToday,
        showPaywall,
        paywallMessage,
        FREE_READINGS_LIMIT,
        canDoReading,
        getRemainingReadings,
        incrementReadingCount,
        triggerPaywall,
        closePaywall,
        upgradeToPremium,
        startFreeTrial,
        cancelPremium,
        getSubscriptionInfo
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export default PremiumContext;
