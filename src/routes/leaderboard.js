const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const auth = require('../middleware/auth');

// Rotas públicas
router.get('/global', leaderboardController.getGlobalRanking);
router.get('/language/:language', leaderboardController.getLanguageRanking);

// Rotas protegidas
router.get('/my-rank', auth, leaderboardController.getUserRank);

module.exports = router; 