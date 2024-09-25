import express from 'express';
import { createGame, joinGame, exitGame, getGameDetails, removeFilledSentences, insertFilledSentence,removeAllPlayers, initializeScores, updatePlayerScore, removePlayer, incrementCurrentPlayerIndex, deleteGame, playAgain, clearFilledSentences } from '../controllers/game.controller.js';

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

// Route for clearing filled sentences
router.post('/clear-filled-sentences', clearFilledSentences);

// Route for resetting the game
router.post('/play-again', playAgain);

// Route for removing a player
router.post('/remove-player', removePlayer);

// Route for removing all players
router.post('/remove-all-players', removeAllPlayers);





export default router;