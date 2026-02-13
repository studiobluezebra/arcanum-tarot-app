import React from 'react';
import { Link, useLocation } from 'react-router';
import { GiCrystalBall, GiCardRandom, GiSpellBook, GiScrollUnfurled } from 'react-icons/gi';
import { usePremium } from '../context/PremiumContext';

const Navigation = () => {
  const location = useLocation();
  const { isPremium, getRemainingReadings, FREE_READINGS_LIMIT, triggerPaywall } = usePremium();

  const navItems = [
    { path: '/home', label: 'Home', icon: GiCrystalBall },
    { path: '/draw', label: 'Draw Cards', icon: GiCardRandom },
    { path: '/history', label: 'History', icon: GiScrollUnfurled, premiumOnly: true },
    { path: '/library', label: 'Library', icon: GiSpellBook },
  ];

  const handleNavClick = (e, item) => {
    if (item.premiumOnly && !isPremium) {
      e.preventDefault();
      triggerPaywall('Unlock FlipWill+ to access your reading history and track patterns over time.');
    }
  };

  const remaining = getRemainingReadings();

  return (
    <nav className="bg-celestial-card/95 backdrop-blur-sm border-b border-gold-base/30 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/home" className="flex items-center space-x-3" data-testid="logo-link">
            <img src="/logo-horizontal.png" alt="Flipwill" className="h-10 sm:h-12" />
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isLocked = item.premiumOnly && !isPremium;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 font-ui text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 relative ${
                    isActive
                      ? 'text-gold-base border-b-2 border-gold-base'
                      : isLocked
                      ? 'text-celestial-muted/50 hover:text-celestial-muted'
                      : 'text-celestial-muted hover:text-gold-base'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                  {isLocked && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#3D3D3D] rounded-full flex items-center justify-center">
                      <span className="text-[8px]">🔒</span>
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Premium Badge or Reading Counter */}
            {isPremium ? (
              <Link
                to="/upgrade"
                className="ml-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full"
                data-testid="premium-badge"
              >
                <span className="text-[#D4AF37] font-ui text-[10px] uppercase tracking-widest">
                  Premium
                </span>
              </Link>
            ) : (
              <Link
                to="/upgrade"
                className="ml-2 flex items-center gap-2 px-3 py-1 bg-[#1E1E1E] border border-[#3D3D3D] rounded-full hover:border-[#D4AF37]/50 transition-all"
                data-testid="upgrade-link"
              >
                <span className="text-[#8B8B8B] font-ui text-[10px] uppercase tracking-widest">
                  {remaining}/{FREE_READINGS_LIMIT}
                </span>
                <span className="text-[#D4AF37] font-ui text-[10px] uppercase tracking-widest">
                  Upgrade
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
