import express from 'express';
const router = express.Router();
import { getRandomSentences, addSentences } from '../controllers/fillBlanck.controller.js';

// Route to get X random sentences
router.get('/:count', getRandomSentences);

// Route to add new sentences
router.post('/add', addSentences); 

export default router;
