import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import DrawCard from './pages/DrawCard';
import ReadingResult from './pages/ReadingResult';
import History from './pages/History';
import CardLibrary from './pages/CardLibrary';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <div className="App bg-texture min-h-screen">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/draw" element={<DrawCard />} />
          <Route path="/reading" element={<ReadingResult />} />
          <Route path="/history" element={<History />} />
          <Route path="/library" element={<CardLibrary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;