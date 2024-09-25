import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';

export const useSocket = (url) => {
  const { authUser } = useContext(AuthContext);
  const [playerCount, setPlayerCount] = useState(0);
  
  useEffect(() => {
    if (!url || !authUser || !authUser.fullName) return;

    const socket = io("http://localhost:5000", {
      query: {
        username: authUser.fullName,
        url: window.location.href
      }
    });

    socket.on('userAuthList', (users) => {
      setPlayerCount(users);
    });

    // Clean up the socket connection when the component unmounts or URL changes
    return () => {
      socket.disconnect();
    };
  }, [authUser, url]);

  return playerCount;
}