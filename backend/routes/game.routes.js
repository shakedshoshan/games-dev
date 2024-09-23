import express from 'express';
import { createGame, joinGame, exitGame, getGameDetails, removeFilledSentences, insertFilledSentence, initializeScores, updatePlayerScore, incrementCurrentPlayerIndex, deleteGame } from '../controllers/game.controller.js';

const router = express.Router();

// Route for creating a new game
router.post('/create', createGame);

// Route for joining a game by game code
router.post('/join', joinGame);

//Route for leaving a game
router.post('/leave', exitGame);

// Route for getting game details
router.get('/details/:id', getGameDetails);

//Route for adding filled sentences
router.post('/add-filled-sentence', insertFilledSentence);

// Route for removing filled sentences
router.post('/remove-filled-sentences', removeFilledSentences);

// Start Generation Here
router.post('/initialize-scores', initializeScores);

// Route for updating player score
router.post('/update-player-score', updatePlayerScore);

// Route for incrementing the current player index
router.post('/increment-current-player-index', incrementCurrentPlayerIndex);

// Route for deleting a game
router.post('/delete-game', deleteGame);





export default router;