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
    
    const { fullName, count, profilePic} = req.body; // Assuming the full name is sent in the request body

    // Fetch random sentences
    
    const response = await fetch(`http://localhost:5000/api/fillBlanck/${count}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sentences');
    }
    const sentences = await response.json();

    const newGame = new Game({
      gameCode,
      sentences, // Store the fetched sentences in the game object
      players: [{ name: fullName, socketId: '', profilePic: profilePic}],
    });
    
    await newGame.save();
    res.json({ newGame });
  } catch (error) {
    res.status(500).json({ message: 'Error creating game', error });
  }
};

// Join an existing game
export const joinGame = async (req, res) => {
  const { gameCode, fullName, profilePic } = req.body;
  
  try {
    const game = await Game.findOne({ gameCode });
    
    if (game) {
      // Check if a player with the same name already exists in the game
      const playerExists = game.players.some(player => player.name === fullName);
      
      if (playerExists) {
        return res.status(400).json({ message: 'A player with this name already exists in the game' });
      }
      
      game.players.push({ name: fullName, socketId: "", profilePic: profilePic });
      await game.save();
      res.json({ game });
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

//get game details
export const getGameDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.findById(id);

    if (game) {
      res.json({ game });
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving game details', error });
  }
};

// Insert an answer to filledSentences
export const insertFilledSentence = async (req, res) => {
  const { gameId, playerName, fillIn } = req.body;
  console.log(gameId, playerName, fillIn);

  try {
    const game = await Game.findById(gameId);
    console.log(game);

    if (game) {
      // Add the filled sentence to the filledSentences array
      game.filledSentence.push({ name: playerName, fillIn });

      // Save the updated game
      await game.save();
      res.json({ message: 'Filled sentence added successfully', game });
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error inserting filled sentence', error });
  }
};

// Remove all filled sentences from the game
export const removeFilledSentences = async (req, res) => {
  const { gameId } = req.body;

  try {
    const game = await Game.findById(gameId);

    if (game) {
      // Clear the filledSentences array
      game.filledSentence = [];

      // Save the updated game
      await game.save();
      res.json({ message: 'Filled sentences removed successfully', game });
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing filled sentences', error });
  }
};

    // Start Generation Here
    export const initializeScores = async (req, res) => {
      const { gameId } = req.body;
    
      try {
        const game = await Game.findById(gameId);
        if (game) {
          const scores = {};
          game.players.forEach(player => {
            scores[player.name] = 0;
          });
          game.scores = scores;
          await game.save();
          res.json({ message: 'Scores initialized successfully', scores: game.scores });
        } else {
          res.status(404).json({ message: 'Game not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error initializing scores', error });
      }
    };


export const updatePlayerScore = async (req, res) => {
  const { gameId, string } = req.body;

  try {
    // Check if the game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the fullName exists in game.players
    // const player = game.players.find(player => player.name === fullName);
    // if (!player) {
    //   return res.status(404).json({ message: 'Player not found in this game' });
    // }

    // Verify that the provided string matches the player's specific field (assuming 'identifier')
    // Replace 'identifier' with the actual field name you intend to match with 'string'
    const playerAnswer = game.filledSentence.find(player => player.fillIn === string);
    if (!playerAnswer) {
      return res.status(400).json({ message: 'Provided string does not match the player\'s identifier' });
    }
    // console.log(playerAnswer.name);
    // console.log(game.scores.get(playerAnswer.name))

    // Initialize scores object if it doesn't exist
    if (!game.scores) {
      game.scores = {};
    }

    // Increment the player's score by 1
    game.scores.set(playerAnswer.name, game.scores.get(playerAnswer.name) + 1)
    

    // Save the updated game
    await game.save();

    res.json({ message: 'Player score updated successfully', scores: game.scores });
  } catch (error) {
    res.status(500).json({ message: 'Error updating player score', error });
  }
};

