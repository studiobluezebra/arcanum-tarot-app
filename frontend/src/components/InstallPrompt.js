import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) return; // Don't show for 7 days after dismiss
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after a short delay
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS, show the manual install instructions after delay
    if (isIOSDevice) {
      const hasVisitedBefore = localStorage.getItem('pwa_visited');
      if (hasVisitedBefore) {
        setTimeout(() => setShowPrompt(true), 5000);
      } else {
        localStorage.setItem('pwa_visited', 'true');
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_prompt_dismissed', new Date().toISOString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-[#1E1E1E] border border-[#D4AF37]/30 rounded-lg p-4 shadow-xl z-50"
      >
        <div className="flex items-start gap-3">
          <img 
            src="/icons/icon-72x72.png" 
            alt="FlipWill" 
            className="w-12 h-12 rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-heading text-[#D4AF37] text-sm mb-1">
              Install FlipWill
            </h3>
            {isIOS ? (
              <p className="font-reading text-xs text-[#8B8B8B]">
                Tap <span className="text-[#E8DCC8]">Share</span> then <span className="text-[#E8DCC8]">"Add to Home Screen"</span>
              </p>
            ) : (
              <p className="font-reading text-xs text-[#8B8B8B]">
                Add to your home screen for quick access
              </p>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="text-[#8B8B8B] hover:text-[#E8DCC8] text-lg"
          >
            ×
          </button>
        </div>
        
        {!isIOS && deferredPrompt && (
          <button
            onClick={handleInstall}
            className="w-full mt-3 bg-[#D4AF37] text-[#141414] font-ui text-xs uppercase tracking-widest py-2 rounded hover:bg-[#E8C872] transition-all"
          >
            Install App
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;
