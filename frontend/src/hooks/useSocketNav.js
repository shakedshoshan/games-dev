import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

export const useSocketNav = ({url}) => {
//   const [isMainUser, setIsMainUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the "navigate" event
    socket.on('navigate', ({ url }) => {
      console.log('Navigating to:', url);
      navigate(url);  // Navigate to the specified URL
    });

    return () => {
    //   socket.off('mainUser');
      socket.off('navigate');
    };
  }, [navigate]);

  const handleStartGame = () => {
    socket.emit('startGame', url);
  };

  return { handleStartGame };
};