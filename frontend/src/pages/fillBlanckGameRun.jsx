import React from 'react'
import { FillInAnswers } from '../components/fillBlanckGame/fillng-answers.jsx'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const FillBlankGameRun = () => {
    const { id } = useParams();
    const [sentences, setSentences] = useState([]);
    const [gameId, setGameId] = useState("");
    const [currentSentence, setCurrentSentence] = useState(0);


    useEffect(() => {
        const fetchGame = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
            setSentences(response.data.game.sentences);
            setGameId(response.data.game._id);
            setCurrentSentence(response.data.game.currentPlayerIndex);
            // console.log(currentSentence);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };
    
        fetchGame();
      }, [id]);
  return (
    <div>
        <FillInAnswers sentence={sentences[currentSentence]}  gameId = {gameId} />
    </div>
  )
}

    // export default FillBlankGameRun