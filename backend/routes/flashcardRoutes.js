const express = require('express');
const router = express.Router();
const Flashcard = require('../models/flashcardModel');

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new flashcard
router.post('/', async (req, res) => {
  try {
    const newFlashcard = await Flashcard.create(req.body);
    res.status(201).json(newFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a flashcard
router.put('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (flashcard) {
      await flashcard.update(req.body);
      res.json(flashcard);
    } else {
      res.status(404).json({ error: 'Flashcard not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a flashcard
router.delete('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (flashcard) {
      await flashcard.destroy();
      res.json({ message: 'Flashcard deleted' });
    } else {
      res.status(404).json({ error: 'Flashcard not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
