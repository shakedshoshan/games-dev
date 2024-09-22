import Game from '../models/game.model.js';
// import Sentence from '../models/sentence.model';

// Helper to generate a random 6-character code
const generateGameCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Create a new game
export const createGame = async (req, res) => {
  try {
    const gameCode = generateGameCode();
    
    const { fullName, count} = req.body; // Assuming the full name is sent in the request body

    // Fetch random sentences
    
    const response = await fetch(`http://localhost:5000/api/fillBlanck/${count}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sentences');
    }
    const sentences = await response.json();

    const newGame = new Game({
      gameCode,
      sentences, // Store the fetched sentences in the game object
      players: [{ name: fullName, socketId: ''}],
    });
    
    await newGame.save();
    res.json({ gameCode });
  } catch (error) {
    res.status(500).json({ message: 'Error creating game', error });
  }
};

// Join an existing game
export const joinGame = async (req, res) => {
  const { gameCode, fullName } = req.body;
  
  try {
    const game = await Game.findOne({ gameCode });
    
    if (game) {
      // Check if a player with the same name already exists in the game
      const playerExists = game.players.some(player => player.name === fullName);
      
      if (playerExists) {
        return res.status(400).json({ message: 'A player with this name already exists in the game' });
      }
      
      game.players.push({ name: fullName, socketId: "" });
      await game.save();
      res.json({ message: 'Joined successfully', game });
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error joining game', error });
  }
};

// Exit a game and remove the player
export const exitGame = async (req, res) => {
  const { gameCode, fullName} = req.body;
  
  try {
    const game = await Game.findOne({ gameCode });
    
    if (game) {
      // Remove the player from the players array
      game.players = game.players.filter(player => 
        player.name !== fullName 
      );
      
      if (game.players.length === 0) {
        // If no players left, delete the game
        await Game.findByIdAndDelete(game._id);
        res.json({ message: 'Game ended as all players left' });
      } else {
        // Save the updated game
        await game.save();
        res.json({ message: 'Left game successfully', game });
      }
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error exiting game', error });
  }
};


//&& player.socketId !== socketId