const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const auth = require('../middleware/auth');

// Rotas públicas
router.get('/', exerciseController.getExercises);
router.get('/:id', exerciseController.getExerciseById);

// Rotas protegidas
router.post('/:id/submit', auth, exerciseController.submitExercise);
router.post('/', auth, exerciseController.createExercise);

module.exports = router; 