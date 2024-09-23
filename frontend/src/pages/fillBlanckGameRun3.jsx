import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ScoreTable } from '../components/fillBlanckGame/score-table';


export const FillBlankGameRun3 = () => {
    const { id } = useParams();
    const [game, setGame] = useState([]);
    // const [gameId, setGameId] = useState("");


    useEffect(() => {
        const fetchGame = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
            setGame(response.data.game.scores);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };
    
        fetchGame();
      }, [id]);
  return (
    <div className='w-full'>
        <ScoreTable game={game}/>
    </div>
  )
}

    // export default FillBlankGameRun