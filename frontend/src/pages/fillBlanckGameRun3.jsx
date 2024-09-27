import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ScoreTable } from '../components/fillBlanckGame/score-table';
import { AuthContext } from '../context/AuthContext';
import ExitButton from '../components/ExitButton';
import { useSocket } from '../hooks/useSocket';
import { WaitingForPlayers } from '@/components/waiting-component';





/**
 * Renders the Fill Blank Game component for the third run
 * @returns {JSX.Element} The rendered Fill Blank Game component
 */
export const FillBlankGameRun3 = () => {
    const { id } = useParams();
    const [game, setGame] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [maxRound, setMaxRound] = useState(0);
    const [gameId, setGameId] = useState("");
    const { authUser } = useContext(AuthContext); // Get authUser from AuthContext
    const [showScores, setShowScores] = useState(false);
    const onlinePlayers = useSocket(`http://localhost:5000`);
    const [players, setPlayers] = useState([]);
    /**
     * Updates the filtered players list based on online players
     * @param {Array} players - The list of all players
     * @param {Array} onlinePlayers - The list of currently online players
     * @returns {void} This effect does not return a value, but updates the state
     */
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [isMainPlayer, setIsMainPlayer] = useState(false);
    

    useEffect(() => {

      if (players.length > 0) {
        /**
         * Filters and updates players based on online status
         * @param {Array} players - Array of player objects to be filtered
         * @param {Array} onlinePlayers - Array of online player objects
         /**
          * A React effect hook that sets the showScores state based on filtered players
          * @param {Array} filteredPlayers - The array of filtered players
          * @param {Array} players - The array of all players
          * @param {Function} setShowScores - State setter function for showScores
          * @returns {undefined} This effect does not return a value
          */
         * @returns {Array} Array of filtered and updated player objects
         */
        const filteredPlayers2 = Array.isArray(players) ? players.filter(player => 
            /**
             * Finds a matching online player and assigns their socket ID to the player object
             * @param {Array} onlinePlayers - An array of online player objects
             * @param {Object} player - The player object to update
             * @returns {boolean} Returns true if a matching player is found, false otherwise
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
          // console.log(filteredPlayers);
      }
    }, [onlinePlayers,players]);

    useEffect(() => {
      if(filteredPlayers.length === players.length && filteredPlayers.length > 0){
        setShowScores(true);
      }
    }, [filteredPlayers]);

    /**
     * Fetches game details and updates the component state
     * @param {void} - This effect doesn't take any parameters
     * @returns {void} This effect doesn't return anything
     */
    useEffect(() => {
        /**
         * Asynchronously fetches game details from the server and updates the component state.
         * @param {void} - This function doesn't take any parameters.
         * @returns {Promise<void>} A promise that resolves when the game details are fetched and state is updated.
         */
        const fetchGame = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
            setGame(response.data.game.scores);
            setCurrentRound(response.data.game.currentPlayerIndex);
            setMaxRound(response.data.game.sentences.length);
            setGameId(response.data.game._id);
            setPlayers(response.data.game.players);
            const isMainPlayer = (response.data.game.players.length > 0 && response.data.game.players[0].name === authUser.fullName);
            setIsMainPlayer(isMainPlayer);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };

        fetchGame();

      }, [showScores]);

      /**
       * Clears filled sentences when showScores is true
       * @param {boolean} showScores - Indicates whether scores are being shown
       * @param {string} id - The ID of the current game
       * @returns {void} This effect does not return anything
       */
      useEffect(() => {
        
        /**
         * Clears filled sentences for a specific game
         * @param {void} - This function doesn't take any parameters
         * @returns {Promise<void>} A promise that resolves when the operation is complete
         */
        const clearFilledSentences = async () => {
            try {
              await axios.post(`http://localhost:5000/api/game/clear-filled-sentences`, { gameId: id });
            } catch (error) {
              console.error('Error clearing filled sentences:', error);
            }
          };
          if(showScores){
            clearFilledSentences();
          }
      }, [showScores]);
      
  return (
    <div className='w-full'>
      { showScores ? (
        <>
        <ScoreTable game={game} round={currentRound} maxRound={maxRound} gameId={gameId} isMainPlayer={isMainPlayer} />
        <ExitButton gameId={gameId} player={authUser} />
        </>
      ) : (
        <WaitingForPlayers />
      )}
        {/* <ExitButton gameId={gameId} player={authUser} /> */}
    </div>
  )
}

    // export default FillBlankGameRun