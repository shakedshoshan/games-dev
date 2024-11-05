import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { LeaderboardPodium } from '../components/leaderboard-podium';
import { AuthContext } from '../context/AuthContext';


/**
 * EndGame component for displaying the game leaderboard after the game ends
 * @returns {JSX.Element} A div containing the LeaderboardPodium component
 */
export const EndGame = () => {
    const { id } = useParams();
    const [game, setGame] = useState([]);
    const [gameId, setGameId] = useState("");
    const { authUser } = useContext(AuthContext); // Get authUser from AuthContext
    
```
/**
 * Fetches game details and removes all players from the game
 * @param {string} id - The ID of the game to fetch and update
 * @returns {void} This effect does not return anything directly
 */
```

    // const [gameId, setGameId] = useState("");


    useEffect(() => {
        /**
         * Fetches game details, removes all players, and updates the game state
         * @param {void} - This function doesn't take any parameters
         * @returns {Promise<void>} A promise that resolves when the game details are fetched and updated
         */
        const fetchGame = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
            await axios.post('http://localhost:5000/api/game/remove-all-players', { gameId: id });
            setGame(response.data.game.scores);
            setGameId(response.data.game._id);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };
    
        fetchGame();
      }, []);


  return (
    <div className='w-full'>
        <LeaderboardPodium game={game} gameId={gameId} player={authUser} />
    </div>
  )
}
