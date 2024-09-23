import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useJoinGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate();

  const joinGame = async (player, gameCode) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/game/join', {
        fullName: player.fullName,
        gameCode: gameCode,
        profilePic: player.profilePic
      });
      console.log(response.data);
      setGameData(response.data);
      toast.success('Successfully joined the game!');
      navigate(`/home/fillBlanckGame/${response.data.game._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred while joining the game');
    } finally {
      setIsLoading(false);
    }
  };

  return { joinGame, isLoading, gameData };
};

export default useJoinGame;
