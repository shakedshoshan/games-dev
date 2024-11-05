import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';

/**
 * Custom React hook for managing a socket connection and tracking player count
 * @param {string} url - The URL for the socket connection (currently unused in the implementation)
 * @returns {number} The current player count
 */
export const useSocket = (url) => {
  const { authUser } = useContext(AuthContext);
  const [playerCount, setPlayerCount] = useState(0);
  
  /**
   * Sets up a socket connection and listens for user authentication updates
   * @param {string} url - The current URL of the page
   * @param {Object} authUser - The authenticated user object
   * @param {string} authUser.fullName - The full name of the authenticated user
   /**
    * Handles the 'userAuthList' event from the socket connection
    * @param {Array} users - An array of authenticated users
    * @returns {void} This function doesn't return a value
    */
   * @returns {function} Cleanup function to disconnect the socket when the component unmounts or URL changes
   */
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