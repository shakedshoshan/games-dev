import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const useCreateGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameCode, setGameCode] = useState(null);
  const navigate = useNavigate();

  const createGame = async (player, count) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/game/create', {
        fullName: player.fullName,
        profilePic: player.profilePic,
        count: count // Assuming we want 5 sentences per game, adjust as needed
      });
      setGameCode(response.data.gameCode);
      toast.success('Game created successfully!');
      navigate(`/home/fillBlanckGame/${response.data.newGame._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred while creating the game');
    } finally {
      setIsLoading(false);
    }
  };

  return { createGame, isLoading, gameCode };
};

export default useCreateGame;
