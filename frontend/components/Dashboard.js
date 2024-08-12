import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('There was an error fetching the flashcards!', error);
      }
    };
    fetchFlashcards();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/flashcards', {
        question: newQuestion,
        answer: newAnswer,
      });
      setNewQuestion('');
      setNewAnswer('');
      setFlashcards([...flashcards, { id: response.data.id, question: newQuestion, answer: newAnswer }]);
    } catch (error) {
      console.error('There was an error adding the flashcard!', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/flashcards/${editingId}`, {
        question: editQuestion,
        answer: editAnswer,
      });
      setFlashcards(flashcards.map(fc =>
        fc.id === editingId ? { ...fc, question: editQuestion, answer: editAnswer } : fc
      ));
      setEditingId(null);
      setEditQuestion('');
      setEditAnswer('');
    } catch (error) {
      console.error('There was an error updating the flashcard!', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/flashcards/${id}`);
      setFlashcards(flashcards.filter(fc => fc.id !== id));
    } catch (error) {
      console.error('There was an error deleting the flashcard!', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="add-flashcard">
        <h3>Add Flashcard</h3>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button onClick={handleAdd}>Add Flashcard</button>
      </div>

      {editingId && (
        <div className="edit-flashcard">
          <h3>Edit Flashcard</h3>
          <input
            type="text"
            placeholder="Question"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Answer"
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
          />
          <button onClick={handleEdit}>Save Changes</button>
        </div>
      )}

      <div className="manage-flashcards">
        <h3>Manage Flashcards</h3>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flashcards.map((fc, index) => (
              <tr key={fc.id}>
                <td>{index + 1}</td>
                <td>{fc.question}</td>
                <td>{fc.answer}</td>
                <td>
                  <button onClick={() => {
                    setEditingId(fc.id);
                    setEditQuestion(fc.question);
                    setEditAnswer(fc.answer);
                  }}>Edit</button>
                  <button onClick={() => handleDelete(fc.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
