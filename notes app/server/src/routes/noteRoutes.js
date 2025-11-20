const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMidlleware');

const router = express.Router();

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);

router.route('/:id')
  .patch(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;