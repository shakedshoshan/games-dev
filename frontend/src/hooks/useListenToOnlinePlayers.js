import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketContext.jsx';

const useListenToOnlinePlayers = () => {
  const { socket } = useSocketContext();
  const [onlinePlayers, setOnlinePlayers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleGetOnlineUsers = (users) => {
      setOnlinePlayers(users);
    };

    socket.on('getOnlineUsers', handleGetOnlineUsers);

    return () => {
      socket.off('getOnlineUsers', handleGetOnlineUsers);
    };
  }, [socket]);

  return onlinePlayers;
};

export default useListenToOnlinePlayers;
