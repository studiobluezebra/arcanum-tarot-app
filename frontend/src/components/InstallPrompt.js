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
      if (daysSinceDismissed < 7) return;
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS, show immediately
    if (isIOSDevice) {
      setShowPrompt(true);
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#B8962E] z-[200] shadow-lg"
      >
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/icons/icon-72x72.png" 
              alt="FlipWill" 
              className="w-8 h-8 rounded-lg"
            />
            <div>
              {isIOS ? (
                <p className="font-ui text-xs text-[#141414]">
                  <span className="font-bold">Install FlipWill:</span> Tap Share <span className="inline-block mx-1">⬆️</span> then "Add to Home Screen"
                </p>
              ) : (
                <p className="font-ui text-xs text-[#141414]">
                  <span className="font-bold">Install FlipWill</span> for quick access anytime
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isIOS && deferredPrompt && (
              <button
                onClick={handleInstall}
                className="bg-[#141414] text-[#D4AF37] font-ui text-xs uppercase tracking-wider px-4 py-1.5 rounded hover:bg-[#2a2a2a] transition-all"
              >
                Install
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="text-[#141414]/70 hover:text-[#141414] text-xl font-bold px-2"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;
