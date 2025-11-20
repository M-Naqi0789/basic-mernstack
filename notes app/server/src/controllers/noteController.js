const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please include a title and content' });
  }

  try {
    const note = await Note.create({
      user: req.user.id,
      title,
      content,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found or user not authorized' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const result = await Note.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Note not found or user not authorized' });
    }

    res.status(204).json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };