import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

    // Check if returning from Stripe checkout
    checkStripeReturn();
  }, []);

  // Check if returning from Stripe checkout
  const checkStripeReturn = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const status = urlParams.get('status');

    if (sessionId && status === 'success') {
      setIsProcessingPayment(true);
      try {
        // Poll for payment status
        await pollPaymentStatus(sessionId);
      } catch (error) {
        console.error('Error checking payment status:', error);
      } finally {
        setIsProcessingPayment(false);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  };

  // Poll payment status
  const pollPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 5;
    const pollInterval = 2000;

    if (attempts >= maxAttempts) {
      console.log('Payment status check timed out');
      return;
    }

    try {
      const response = await axios.get(`${API}/payments/status/${sessionId}`);
      const data = response.data;

      if (data.payment_status === 'paid') {
        // Payment successful - activate premium
        const plan = data.metadata?.plan_id || 'monthly';
        activatePremium(plan);
        return;
      } else if (data.status === 'expired') {
        console.log('Payment session expired');
        return;
      }

      // Continue polling
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      await pollPaymentStatus(sessionId, attempts + 1);
    } catch (error) {
      console.error('Error polling payment status:', error);
    }
  };

  // Activate premium after successful payment
  const activatePremium = (plan) => {
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

  // Upgrade to premium via Stripe
  const upgradeToPremium = async (plan = 'monthly') => {
    try {
      setIsProcessingPayment(true);
      
      const userId = localStorage.getItem('flipwill_user_id') || `user_${Date.now()}`;
      localStorage.setItem('flipwill_user_id', userId);

      const response = await axios.post(`${API}/payments/create-checkout`, {
        plan_id: plan,
        origin_url: window.location.origin,
        user_id: userId
      });

      // Redirect to Stripe Checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setIsProcessingPayment(false);
      alert('Unable to start checkout. Please try again.');
    }
  };

  // Start free trial (still works without payment)
  const startFreeTrial = () => {
    const now = new Date();
    const expiryDate = new Date(now.setDate(now.getDate() + 7)); // 7-day trial

    localStorage.setItem('flipwill_premium', 'true');
    localStorage.setItem('flipwill_premium_expiry', expiryDate.toISOString());
    localStorage.setItem('flipwill_premium_plan', 'trial');
    setIsPremium(true);
    setShowPaywall(false);
  };

  // Cancel premium
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
        isProcessingPayment,
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
