import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

/**
 * Custom hook for socket-based navigation
 * @param {Object} options - The options object
 * @param {string} options.url - The URL to navigate to when starting the game
 ```
 /**
  * Sets up a socket listener for navigation events and cleans up on unmount
  * @param {Function} navigate - The navigation function from React Router
  * @returns {Function} Cleanup function to remove socket listeners
  */
 ```
 * @returns {Object} An object containing the handleStartGame function
 */
export const useSocketNav = ({url}) => {
//   const [isMainUser, setIsMainUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the "navigate" event
    socket.on('navigate', ({ url }) => {
      console.log('Navigating to:', url);
      navigate(url);  // Navigate to the specified URL
    });

    /**
     * Cleanup function that removes event listeners from the socket
     * @returns {Function} A function that removes the 'navigate' event listener from the socket
     */
    return () => {
    //   socket.off('mainUser');
      socket.off('navigate');
    };
  }, [navigate]);

  ```
  /**
   * Initiates the game start process by emitting a 'startGame' event to the server via socket connection.
   * @param {void} - This function doesn't take any parameters.
   * @returns {void} This function doesn't return a value.
   */
  ```
  const handleStartGame = () => {
    socket.emit('startGame', url);
  };

  return { handleStartGame };
};