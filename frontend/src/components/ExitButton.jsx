import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ExitButton = ({ gameId, player }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    axios.post('http://localhost:5000/api/game/delete-game', { gameId: gameId, name: player.fullName })
      .then(response => {
        console.log('Game deleted successfully:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting game:', error);
      });
  };

  return (
    <Button onClick={handleExit} variant="outline">
      Exit
    </Button>
  );
};

export default ExitButton;