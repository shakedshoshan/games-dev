import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { LeaderboardPodium } from '../components/leaderboard-podium';
import { AuthContext } from '../context/AuthContext';


export const EndGame = () => {
    const { id } = useParams();
    const [game, setGame] = useState([]);
    const [gameId, setGameId] = useState("");
    const { authUser } = useContext(AuthContext); // Get authUser from AuthContext
    

    // const [gameId, setGameId] = useState("");


    useEffect(() => {
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
