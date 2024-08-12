const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '050607',
  database: 'flashdb',
});

// Connect to the database
db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

// Routes

// Get all flashcards
app.get('/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Display the Dashboard (Get all flashcards for the dashboard view)
app.get('/dashboard', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      console.error('Error fetching dashboard data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Create a new flashcard
app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) {
      console.error('Error creating flashcard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ id: results.insertId, question, answer });
  });
});

// Get a single flashcard by ID
app.get('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM flashcards WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching flashcard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.json(results[0]);
  });
});

// Update a flashcard by ID
app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
    if (err) {
      console.error('Error updating flashcard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Flashcard updated successfully!' });
  });
});

// Delete a flashcard by ID
app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Flashcard deleted successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
