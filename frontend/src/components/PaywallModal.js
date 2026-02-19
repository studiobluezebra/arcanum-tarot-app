import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePremium } from '../context/PremiumContext';

const PaywallModal = () => {
  const { 
    showPaywall, 
    paywallMessage, 
    closePaywall, 
    upgradeToPremium, 
    startFreeTrial 
  } = usePremium();

  if (!showPaywall) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
        onClick={closePaywall}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1E1E1E] border border-[#D4AF37]/30 rounded-lg max-w-md w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 bg-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] font-ui text-xs uppercase tracking-widest">
                FlipWill+
              </span>
            </div>
            <h2 className="font-heading text-2xl text-[#E8DCC8] mb-3">
              Unlock Your Full Potential
            </h2>
            <p className="font-reading text-sm text-[#8B8B8B]">
              {paywallMessage}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span className="font-reading text-sm text-[#E8DCC8]">Unlimited decision readings</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span className="font-reading text-sm text-[#E8DCC8]">Save and revisit past readings</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span className="font-reading text-sm text-[#E8DCC8]">Track decision patterns</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37]">✓</span>
              <span className="font-reading text-sm text-[#E8DCC8]">Personal reflection notes</span>
            </div>
          </div>

          {/* Pricing Options */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => startFreeTrial()}
              className="w-full bg-[#D4AF37] text-[#141414] font-ui text-sm uppercase tracking-widest py-4 rounded hover:bg-[#E8C872] transition-all"
              data-testid="start-trial-btn"
            >
              Start 7-Day Free Trial
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => upgradeToPremium('monthly')}
                className="bg-transparent border border-[#3D3D3D] text-[#E8DCC8] font-ui text-xs uppercase tracking-widest py-3 rounded hover:border-[#D4AF37] transition-all"
                data-testid="monthly-plan-btn"
              >
                <div className="text-[#D4AF37] text-lg font-bold">$4.99</div>
                <div className="text-[#8B8B8B]">per month</div>
              </button>
              <button
                onClick={() => upgradeToPremium('yearly')}
                className="bg-transparent border border-[#D4AF37]/50 text-[#E8DCC8] font-ui text-xs uppercase tracking-widest py-3 rounded hover:border-[#D4AF37] transition-all relative"
                data-testid="yearly-plan-btn"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#D4AF37] text-[#141414] text-[10px] rounded">
                  SAVE 33%
                </div>
                <div className="text-[#D4AF37] text-lg font-bold">$39.99</div>
                <div className="text-[#8B8B8B]">per year</div>
              </button>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={closePaywall}
            className="w-full text-[#8B8B8B] font-reading text-sm hover:text-[#E8DCC8] transition-colors"
          >
            Maybe later
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaywallModal;
