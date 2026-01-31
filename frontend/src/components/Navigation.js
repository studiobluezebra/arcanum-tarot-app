import React from 'react';
import { Link, useLocation } from 'react-router';
import { GiCrystalBall, GiTarotCard, GiSpellBook, GiScrollUnfurled } from 'react-icons/gi';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: GiCrystalBall },
    { path: '/draw', label: 'Draw Cards', icon: GiTarotCard },
    { path: '/history', label: 'History', icon: GiScrollUnfurled },
    { path: '/library', label: 'Library', icon: GiSpellBook },
  ];

  return (
    <nav className="bg-parchment-surface/90 backdrop-blur-sm border-b-2 border-gold-antique shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3" data-testid="logo-link">
            <GiCrystalBall className="w-10 h-10 text-gold-base" />
            <span className="font-heading text-2xl sm:text-3xl text-ink-black">Arcanum</span>
          </Link>

          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 font-ui text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-gold-base border-b-2 border-gold-base'
                      : 'text-ink-faded hover:text-gold-antique'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;