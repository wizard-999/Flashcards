const Flashcard = require('../models/flashcardModel');

// Get all flashcards
exports.getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new flashcard
exports.addFlashcard = async (req, res) => {
  try {
    const newFlashcard = await Flashcard.create(req.body);
    res.status(201).json(newFlashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a flashcard
exports.updateFlashcard = async (req, res) => {
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
};

// Delete a flashcard
exports.deleteFlashcard = async (req, res) => {
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
};
