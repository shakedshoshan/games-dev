import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { createGame, joinGame, exitGame, getGameDetails, removeFilledSentences, insertFilledSentence,removeAllPlayers, initializeScores, updatePlayerScore, removePlayer, incrementCurrentPlayerIndex, deleteGame, playAgain, clearFilledSentences } from '../controllers/game.controller.js';

const router = express.Router();

// Route for creating a new game
router.post('/create', protectRoute, createGame);

// Route for joining a game by game code
router.post('/join', protectRoute, joinGame);

//Route for leaving a game
router.post('/leave', protectRoute, exitGame);

// Route for getting game details
router.get('/details/:id', protectRoute, getGameDetails);

//Route for adding filled sentences
router.post('/add-filled-sentence', protectRoute, insertFilledSentence);

// Route for removing filled sentences
router.post('/remove-filled-sentences', protectRoute, removeFilledSentences);

// Start Generation Here
router.post('/initialize-scores', protectRoute, initializeScores);

// Route for updating player score
router.post('/update-player-score', protectRoute, updatePlayerScore);

// Route for incrementing the current player index
router.post('/increment-current-player-index', protectRoute, incrementCurrentPlayerIndex);

// Route for deleting a game
router.post('/delete-game', protectRoute, deleteGame);

// Route for clearing filled sentences
router.post('/clear-filled-sentences', protectRoute, clearFilledSentences);

// Route for resetting the game
router.post('/play-again', protectRoute, playAgain);

// Route for removing a player
router.post('/remove-player', protectRoute, removePlayer);

// Route for removing all players
router.post('/remove-all-players', protectRoute, removeAllPlayers);





export default router;