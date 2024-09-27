import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useSocket } from '../hooks/useSocket';
import { useSocketNav } from '../hooks/useSocketNav';
import ExitButton from '@/components/ExitButton';

/**
 * Renders a Fill Blank Game component with player management and game initialization functionality
 * @returns {JSX.Element} A React component for the Fill Blank Game lobby
 */
export const FillBlankGame = () => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState('');
  const { id } = useParams();
  const { authUser } = useContext(AuthContext); // Get authUser from AuthContext
  const navigate = useNavigate();

  const onlinePlayers = useSocket(`http://localhost:5000`);

  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [isFirstPlayer, setIsFirstPlayer] = useState(false);
  /**
   * Fetches game details and updates state with players and game code
   * @param {string} id - The game ID used to fetch details
   * @param {function} setPlayers - State setter function for players
   * @param {function} setGameCode - State setter function for game code
   * @param {array} onlinePlayers - Array of online players (dependency for useEffect)
   * @returns {void} This effect does not return anything
   */
  const { handleStartGame: handleSocketStartGame } = useSocketNav({ url: `/home/fillBlanckGameRun/${id}` });


    
  useEffect(() => {
    
    /**
     * Asynchronously fetches game details including players and game code from the server
     * @param {void} - This function doesn't take any parameters
     * @returns {Promise<void>} Doesn't return a value, but updates state with fetched data
     */
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
        setPlayers(response.data.game.players);
        setGameCode(response.data.game.gameCode);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    /**
     * Updates filtered players and first player status based on online players and all players
     * @param {Array} players - Array of all players
     * @param {Array} onlinePlayers - Array of currently online players
     * @param {Object} authUser - Authenticated user object
     * @returns {void} This effect does not return anything
     */
    fetchPlayers();
    
  }, [onlinePlayers]);
  

  useEffect(() => {
      
    if (players.length > 0) {
      /**
       * Filters and updates players based on online status
       * @param {Array} players - Array of player objects to be filtered
       * @param {Array} onlinePlayers - Array of online player objects
       * @returns {Array} Filtered array of players with updated socketId for online players
       */
      const filteredPlayers2 = Array.isArray(players) ? players.filter(player => 
          /**
           * Searches for a player in the onlinePlayers array and updates their socketId if found
           * @param {Array} onlinePlayers - An array of online player objects
           * @param {Object} player - The player object to search for and update
           * @returns {boolean} Returns true if the player is found and updated, false otherwise
           */
          onlinePlayers.some(onlinePlayer => {
            if (onlinePlayer.username === player.name) {
              player.socketId = onlinePlayer.id;
              return true;
            }
            return false;
          })
        ) : [];
        setFilteredPlayers(filteredPlayers2);
    }
    setIsFirstPlayer(players.length > 0 && authUser && players[0].name === authUser.fullName);
  }, [onlinePlayers, players]);

  
  // Check if the current user is the first player
  

  /**
   * Handles the start of a game by initializing scores and triggering socket events.
   * @param {void} - This function doesn't take any parameters.
   * @returns {Promise<void>} A promise that resolves when the game starts successfully or rejects if there's an error.
   */
  const handleStartGame = async () => {
    try {
      await axios.post('http://localhost:5000/api/game/initialize-scores', { gameId : id, onlinePlayers: filteredPlayers});
      if(isFirstPlayer){
        handleSocketStartGame(); // Use the handleStartGame from useSocketNav
        // navigate(`/home/fillBlanckGameRun/${id}`);
      }
    } catch (error) {
      console.error('Error initializing scores:', error);
      // Optionally, handle the error (e.g., show a notification)
    }

  };

  return (
    <div className='container mx-auto mt-14'>
      <h1 className='text-black text-5xl '>Fill Blank Game</h1>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-4 pb-4'>Game Code: {gameCode}</h2>
        <h1 className='text-1xl font-bold mb-4'>Players:</h1>
            {filteredPlayers.length > 0 ? (
              /**
               * Renders a list of filtered players as list items
               * @param {Array} filteredPlayers - An array of player objects containing name and profilePic properties
               * @returns {Array} An array of JSX elements representing player list items
               */
              filteredPlayers.map((player) => (
                <li key={player.name} className='flex items-center space-x-4 space-y-4'>
                  <img src={player.profilePic} alt={`${player.name}'s profile`} className='w-8 h-8 rounded-full mt-3' />
                  <span className='text-1xl text-black '>{player.name}</span>
                </li>
              ))
            ) : (
              <p className='text-gray-500'>No players have joined yet.</p>
            )}
         
        {/* Add Start button for the first player */}
        {isFirstPlayer && (
          <button 
            className='mt-10 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleStartGame}
          >
            Start Game
          </button>
        )}
        <div className='mt-8'>
            <ExitButton gameId={id} player={authUser}/>
        </div>
      </div>
      
    </div>
  );
}

