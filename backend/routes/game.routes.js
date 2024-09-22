import express from 'express';
import { createGame, joinGame, exitGame } from '../controllers/game.controller.js';

const router = express.Router();

// Route for creating a new game
router.post('/create', createGame);

// Route for joining a game by game code
router.post('/join', joinGame);

//Route for leaving a game
router.post('/leave', exitGame);

export default router;