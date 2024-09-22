import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useJoinGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);

  const joinGame = async (playerName, gameCode) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/game/join', {
        fullName: playerName,
        gameCode: gameCode
      });
      setGameData(response.data);
      toast.success('Successfully joined the game!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred while joining the game');
    } finally {
      setIsLoading(false);
    }
  };

  return { joinGame, isLoading, gameData };
};

export default useJoinGame;
