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
            setGame(response.data.game.scores);
            // setCurrentRound(response.data.game.currentPlayerIndex);
            // setMaxRound(response.data.game.sentences.length);
            setGameId(response.data.game._id);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };
    
        fetchGame();
      }, [id]);
  return (
    <div className='w-full'>
        <LeaderboardPodium game={game} gameId={gameId} player={authUser} />
    </div>
  )
}
