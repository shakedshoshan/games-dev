import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useCreateGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameCode, setGameCode] = useState(null);

  const createGame = async (playerName, count) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/game/create', {
        fullName: playerName,
        count: count // Assuming we want 5 sentences per game, adjust as needed
      });
      setGameCode(response.data.gameCode);
      toast.success('Game created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred while creating the game');
    } finally {
      setIsLoading(false);
    }
  };

  return { createGame, isLoading, gameCode };
};

export default useCreateGame;
