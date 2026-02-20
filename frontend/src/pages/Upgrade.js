import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { usePremium } from '../context/PremiumContext';
import { trackEvent, EVENTS } from '../utils/analytics';

const Upgrade = () => {
  const navigate = useNavigate();
  const { 
    isPremium, 
    upgradeToPremium, 
    startFreeTrial, 
    cancelPremium,
    getSubscriptionInfo 
  } = usePremium();

  const subscriptionInfo = getSubscriptionInfo();

  // Handle upgrade with tracking
  const handleUpgrade = (plan) => {
    trackEvent(EVENTS.CHECKOUT_STARTED, {
      plan: plan,
      amount: plan === 'yearly' ? 39.99 : 4.99,
      source: 'upgrade_page',
    });
    upgradeToPremium(plan);
  };

  if (isPremium) {
    return (
      <div className="min-h-screen py-20 bg-[#141414]" data-testid="upgrade-page">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/20 rounded-full mb-6">
              <span className="text-[#D4AF37] font-ui text-sm uppercase tracking-widest">
                FlipWill+ Active
              </span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl text-[#D4AF37] mb-4">
              You're a Premium Member
            </h1>
            
            <p className="font-reading text-lg text-[#8B8B8B] mb-8">
              Enjoy unlimited readings and all premium features.
            </p>

            <div className="bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-reading text-[#8B8B8B]">Plan</span>
                  <span className="font-reading text-[#E8DCC8] capitalize">{subscriptionInfo.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-reading text-[#8B8B8B]">Status</span>
                  <span className="font-reading text-[#D4AF37]">Active</span>
                </div>
                {subscriptionInfo.expiry && (
                  <div className="flex justify-between">
                    <span className="font-reading text-[#8B8B8B]">
                      {subscriptionInfo.plan === 'trial' ? 'Trial ends' : 'Renews'}
                    </span>
                    <span className="font-reading text-[#E8DCC8]">
                      {subscriptionInfo.expiry.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/home')}
                className="w-full bg-[#D4AF37] text-[#141414] font-ui uppercase tracking-widest py-4 rounded hover:bg-[#E8C872] transition-all"
              >
                Continue to App
              </button>
              
              <button
                onClick={cancelPremium}
                className="w-full text-[#8B8B8B] font-reading text-sm hover:text-red-400 transition-colors"
              >
                Cancel Subscription (Demo)
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-[#141414]" data-testid="upgrade-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-3xl sm:text-4xl text-[#D4AF37] mb-4">
            Upgrade to FlipWill+
          </h1>
          <p className="font-reading text-lg text-[#8B8B8B] max-w-xl mx-auto">
            Unlock unlimited readings, save your history, and track your decision patterns over time.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg p-6">
            <div className="text-[#D4AF37] text-2xl mb-3">∞</div>
            <h3 className="font-subheading text-lg text-[#E8DCC8] mb-2">Unlimited Readings</h3>
            <p className="font-reading text-sm text-[#8B8B8B]">
              Explore as many decisions as you need, without daily limits.
            </p>
          </div>
          
          <div className="bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg p-6">
            <div className="text-[#D4AF37] text-2xl mb-3">📚</div>
            <h3 className="font-subheading text-lg text-[#E8DCC8] mb-2">Reading History</h3>
            <p className="font-reading text-sm text-[#8B8B8B]">
              Save and revisit past readings to track your journey.
            </p>
          </div>
          
          <div className="bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg p-6">
            <div className="text-[#D4AF37] text-2xl mb-3">📊</div>
            <h3 className="font-subheading text-lg text-[#E8DCC8] mb-2">Pattern Tracking</h3>
            <p className="font-reading text-sm text-[#8B8B8B]">
              Discover recurring themes and patterns in your decisions.
            </p>
          </div>
          
          <div className="bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg p-6">
            <div className="text-[#D4AF37] text-2xl mb-3">✏️</div>
            <h3 className="font-subheading text-lg text-[#E8DCC8] mb-2">Personal Notes</h3>
            <p className="font-reading text-sm text-[#8B8B8B]">
              Add reflections and notes to your readings.
            </p>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Free Trial CTA */}
          <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-6 mb-6 text-center">
            <h3 className="font-subheading text-xl text-[#D4AF37] mb-2">
              Start with 7 Days Free
            </h3>
            <p className="font-reading text-sm text-[#8B8B8B] mb-4">
              Try all premium features risk-free. Cancel anytime.
            </p>
            <button
              onClick={startFreeTrial}
              className="bg-[#D4AF37] text-[#141414] font-ui uppercase tracking-widest px-8 py-4 rounded hover:bg-[#E8C872] transition-all"
              data-testid="start-trial-btn"
            >
              Start Free Trial
            </button>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg p-6 text-center hover:border-[#D4AF37]/50 transition-all">
              <h4 className="font-ui text-xs uppercase tracking-widest text-[#8B8B8B] mb-2">Monthly</h4>
              <div className="text-3xl font-bold text-[#D4AF37] mb-1">$4.99</div>
              <div className="font-reading text-sm text-[#8B8B8B] mb-4">per month</div>
              <button
                onClick={() => upgradeToPremium('monthly')}
                className="w-full bg-transparent border border-[#3D3D3D] text-[#E8DCC8] font-ui text-sm uppercase tracking-widest py-3 rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                Choose Monthly
              </button>
            </div>
            
            <div className="bg-[#1E1E1E] border border-[#D4AF37]/50 rounded-lg p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#D4AF37] text-[#141414] text-xs font-ui uppercase rounded">
                Best Value
              </div>
              <h4 className="font-ui text-xs uppercase tracking-widest text-[#8B8B8B] mb-2">Yearly</h4>
              <div className="text-3xl font-bold text-[#D4AF37] mb-1">$39.99</div>
              <div className="font-reading text-sm text-[#8B8B8B] mb-4">per year (save 33%)</div>
              <button
                onClick={() => upgradeToPremium('yearly')}
                className="w-full bg-[#D4AF37] text-[#141414] font-ui text-sm uppercase tracking-widest py-3 rounded hover:bg-[#E8C872] transition-all"
              >
                Choose Yearly
              </button>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate('/home')}
            className="text-[#8B8B8B] font-reading text-sm hover:text-[#E8DCC8] transition-colors"
          >
            ← Back to App
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Upgrade;
