import React from 'react'
import { FillInAnswers } from '../components/fillBlanckGame/fillng-answers.jsx'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

/**
 * Component for running the Fill in the Blank game
 * @returns {JSX.Element} A div containing the FillInAnswers component
 */
export const FillBlankGameRun = () => {
    const { id } = useParams();
    const [sentences, setSentences] = useState([]);
    const [gameId, setGameId] = useState("");
    const [currentSentence, setCurrentSentence] = useState(0);


    /**
     * Fetches game details from the server and updates the component state
     * @param {void} - No parameters
     * @returns {void} This effect doesn't return anything, it updates state variables
     */
    useEffect(() => {
        /**
         * Fetches game details from the server asynchronously
         * @param {void} - This function doesn't take any parameters
         * @returns {Promise<void>} A promise that resolves when the game details are fetched and state is updated
         */
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
      }, []);
  return (
    <div>
        <FillInAnswers sentence={sentences[currentSentence]}  gameId = {gameId} />
    </div>
  )
}

    // export default FillBlankGameRun