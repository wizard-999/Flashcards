import React, { useState } from 'react';
import axios from 'axios';
import './CreateFlashcard.css';

function CreateFlashcard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/flashcards', { question, answer });
      alert('Flashcard created successfully!');
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Error creating flashcard:', error);
      alert('There was an error creating the flashcard.');
    }
  };

  return (
    <div className="create-flashcard">
      <h2>Create Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateFlashcard;
