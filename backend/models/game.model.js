import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  gameCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  players: [{ 
    name: String, 
    socketId: String,
    profilePic: String 
  }],
  sentences: [{ 
    type: String, 
    required: true 
  }],
  filledSentence: [{ 
    name: String,
    fillIn: String
  }],
  currentPlayerIndex: { 
    type: Number, 
    default: 0 
  },
  scores: { 
    type: Map, 
    of: Number 
  }
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
