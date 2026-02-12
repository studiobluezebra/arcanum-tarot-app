import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { DeckProvider } from './context/DeckContext';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import DrawCard from './pages/DrawCard';
import ReadingResult from './pages/ReadingResult';
import History from './pages/History';
import CardLibrary from './pages/CardLibrary';
import Navigation from './components/Navigation';
import './App.css';

// Wrapper to conditionally show Navigation
const AppContent = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  return (
    <>
      {!isWelcomePage && <Navigation />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/draw" element={<DrawCard />} />
        <Route path="/reading" element={<ReadingResult />} />
        <Route path="/history" element={<History />} />
        <Route path="/library" element={<CardLibrary />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App bg-texture min-h-screen">
      <DeckProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </DeckProvider>
    </div>
  );
}

export default App;