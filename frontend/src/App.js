import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { DeckProvider } from './context/DeckContext';
import { PremiumProvider } from './context/PremiumContext';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import DrawCard from './pages/DrawCard';
import ReadingResult from './pages/ReadingResult';
import History from './pages/History';
import CardLibrary from './pages/CardLibrary';
import Upgrade from './pages/Upgrade';
import Navigation from './components/Navigation';
import PaywallModal from './components/PaywallModal';
import InstallPrompt from './components/InstallPrompt';
import './App.css';

// Wrapper to conditionally show Navigation
const AppContent = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  return (
    <>
      {!isWelcomePage && <Navigation />}
      <PaywallModal />
      <InstallPrompt />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/draw" element={<DrawCard />} />
        <Route path="/reading" element={<ReadingResult />} />
        <Route path="/history" element={<History />} />
        <Route path="/library" element={<CardLibrary />} />
        <Route path="/upgrade" element={<Upgrade />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App bg-texture min-h-screen">
      <PremiumProvider>
        <DeckProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </DeckProvider>
      </PremiumProvider>
    </div>
  );
}

export default App;