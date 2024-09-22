import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { SelectOptions } from '../components/fillBlanckGame/select-options'

export const FillBlankGameRun2 = () => {
    const { id } = useParams();
    const [sentences, setSentences] = useState([]);
    const [gameId, setGameId] = useState("");


    useEffect(() => {
        const fetchGame = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
            // const sentences = response.data.game.filledSentence.map(sentence => sentence.fillIn);
            // console.log(sentences);
            setSentences(response.data.game.filledSentence);
            setGameId(response.data.game._id);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };
    
        fetchGame();
      }, [id]);
  return (
    <div className='w-full'>
        <SelectOptions options={sentences} />
    </div>
  )
}

    // export default FillBlankGameRun