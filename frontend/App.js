import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FlashcardList from './components/FlashcardList';
import CreateFlashcard from './components/CreateFlashcard';
import EditFlashcard from './components/EditFlashcard';
import Dashboard from './components/Dashboard';  // Import Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<FlashcardList />} />
        <Route path="/create" element={<CreateFlashcard />} />
        <Route path="/edit/:id" element={<EditFlashcard />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Add Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
