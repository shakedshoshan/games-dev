import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ScoreTable } from '../components/fillBlanckGame/score-table';
import { AuthContext } from '../context/AuthContext';
import ExitButton from '../components/ExitButton';
import { useSocket } from '../hooks/useSocket';
import { WaitingForPlayers } from '@/components/waiting-component';





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
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [isMainPlayer, setIsMainPlayer] = useState(false);
    

    useEffect(() => {

      if (players.length > 0) {
        const filteredPlayers2 = Array.isArray(players) ? players.filter(player => 
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

    useEffect(() => {
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

      useEffect(() => {
        
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