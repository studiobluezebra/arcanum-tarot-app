import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (running as standalone PWA)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone === true;
    setIsStandalone(standalone);
    if (standalone) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 3) return; // Show again after 3 days
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt event (Android/Desktop Chrome)
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS Safari, always show the install instructions
    if (isIOSDevice) {
      setShowPrompt(true);
    }
    
    // For other browsers (non-Chrome, Firefox, etc), show instructions on first visit
    const hasSeenPrompt = localStorage.getItem('pwa_prompt_seen');
    if (!hasSeenPrompt && !isIOSDevice) {
      // Show after 2 seconds for browsers that support PWA but may not fire beforeinstallprompt
      setTimeout(() => {
        if (!deferredPrompt) {
          setShowPrompt(true);
        }
      }, 2000);
    }
    localStorage.setItem('pwa_prompt_seen', 'true');

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowPrompt(false);
      }
      
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_prompt_dismissed', new Date().toISOString());
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#B8962E] z-[200] shadow-lg"
      >
        <div className="max-w-screen-xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img 
              src="/icons/icon-72x72.png" 
              alt="FlipWill" 
              className="w-7 h-7 rounded-md flex-shrink-0"
            />
            <div className="min-w-0">
              {isIOS ? (
                <p className="font-ui text-[11px] sm:text-xs text-[#141414] truncate">
                  <span className="font-bold hidden sm:inline">Install:</span> Tap <span className="inline-block">⬆️</span> Share → "Add to Home Screen"
                </p>
              ) : deferredPrompt ? (
                <p className="font-ui text-[11px] sm:text-xs text-[#141414]">
                  <span className="font-bold">Install FlipWill</span> <span className="hidden sm:inline">for quick access</span>
                </p>
              ) : (
                <p className="font-ui text-[11px] sm:text-xs text-[#141414]">
                  <span className="font-bold">Add to Home Screen</span> <span className="hidden sm:inline">via browser menu</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            {deferredPrompt && (
              <button
                onClick={handleInstall}
                className="bg-[#141414] text-[#D4AF37] font-ui text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded hover:bg-[#2a2a2a] transition-all"
              >
                Install
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="text-[#141414]/70 hover:text-[#141414] text-xl font-bold px-1"
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
