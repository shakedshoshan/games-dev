import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ScoreTable } from '../components/fillBlanckGame/score-table';



export const FillBlankGameRun3 = () => {
    const { id } = useParams();
    const [game, setGame] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [maxRound, setMaxRound] = useState(0);
    const [gameId, setGameId] = useState("");

    // const [gameId, setGameId] = useState("");


    useEffect(() => {
        const fetchGame = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
            setGame(response.data.game.scores);
            setCurrentRound(response.data.game.currentPlayerIndex);
            setMaxRound(response.data.game.sentences.length);
            setGameId(response.data.game._id);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };

        const clearFilledSentences = async () => {
          try {
            await axios.post(`http://localhost:5000/api/game/clear-filled-sentences`, { gameId: id });
          } catch (error) {
            console.error('Error clearing filled sentences:', error);
          }
        };  
    
        fetchGame();
        clearFilledSentences();
      }, [id]);
  return (
    <div className='w-full'>
        <ScoreTable game={game} round={currentRound} maxRound={maxRound} gameId={gameId}/>
    </div>
  )
}

    // export default FillBlankGameRun