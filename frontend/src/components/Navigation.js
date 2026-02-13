import React from 'react';
import { Link, useLocation } from 'react-router';
import { GiCrystalBall, GiCardRandom, GiSpellBook, GiScrollUnfurled } from 'react-icons/gi';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Home', icon: GiCrystalBall },
    { path: '/draw', label: 'Draw Cards', icon: GiCardRandom },
    { path: '/history', label: 'History', icon: GiScrollUnfurled },
    { path: '/library', label: 'Library', icon: GiSpellBook },
  ];

  return (
    <nav className="bg-celestial-card/95 backdrop-blur-sm border-b border-gold-base/30 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/home" className="flex items-center space-x-3" data-testid="logo-link">
            <img src="/logo-horizontal.png" alt="Flipwill" className="h-10 sm:h-12" />
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
                      : 'text-celestial-muted hover:text-gold-base'
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
