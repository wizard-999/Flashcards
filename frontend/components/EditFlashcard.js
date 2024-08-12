import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditFlashcard() {
  const [flashcard, setFlashcard] = useState({ question: '', answer: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFlashcard() {
      try {
        const response = await axios.get(`http://localhost:5000/flashcards/${id}`);
        setFlashcard(response.data);
      } catch (error) {
        console.error('Error fetching flashcard:', error);
      }
    }
    fetchFlashcard();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlashcard({ ...flashcard, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/flashcards/${id}`, flashcard);
      alert('Flashcard updated successfully!');
      navigate('/flashcards');
    } catch (error) {
      console.error('Error updating flashcard:', error);
      alert('There was an error updating the flashcard.');
    }
  };

  return (
    <div className="edit-flashcard">
      <h2>Edit Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            name="question"
            value={flashcard.question}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            name="answer"
            value={flashcard.answer}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditFlashcard;
