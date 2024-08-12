import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlashcardList.css';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await axios.get('http://localhost:5000/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
    fetchFlashcards();
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);  // Reset flip state when navigating
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);  // Reset flip state when navigating
    }
  };

  return (
    <div className="flashcard-list">
      {flashcards.length > 0 && (
        <div className="flashcard-container">
          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <h3>{flashcards[currentIndex].question}</h3>
              </div>
              <div className="flashcard-back">
                <p>{flashcards[currentIndex].answer}</p>
              </div>
            </div>
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
            <button onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardList;
