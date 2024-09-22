const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  socketId: { 
    type: String, 
    required: true 
  },
  gamesPlayed: { 
    type: Number, 
    default: 0 
  },
  totalScore: { 
    type: Number, 
    default: 0 
  }
});

module.exports = mongoose.model('Player', playerSchema);
