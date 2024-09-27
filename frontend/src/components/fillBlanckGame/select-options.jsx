    import React, { useState, useEffect } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
    import { Button } from "@/components/ui/button";
    import { Card } from "@/components/ui/card";
    import { useUpdatePlayerScore } from '../../hooks/useUpdatePlayerScore';
    import { WaitingForPlayers } from '@/components/waiting-component';
    import { useSocket } from '../../hooks/useSocket';
    import axios from 'axios';
    

      
    
    export const SelectOptions = () => {
      const { updatePlayerScore } = useUpdatePlayerScore();
      const [players, setPlayers] = useState([]);
      const [options, setSentences] = useState([]);
      const [shuffledSentences, setShuffledSentences] = useState([]);
      const [selectedOption, setSelectedOption] = useState([]);
      const navigate = useNavigate();
      const { id } = useParams();
      const onlinePlayers = useSocket(`http://localhost:5000`);
      const [filteredPlayers, setFilteredPlayers] = useState(players);
      const [showOptions, setShowOptions] = useState(false);
      
      useEffect(() => {
        const fetchGame = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
            setPlayers(response.data.game.players);
            const shuffledSentences = response.data.game.filledSentence.sort(() => Math.random() - 0.5);
            setSentences(response.data.game.filledSentence);
            setShuffledSentences(shuffledSentences);
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        };
    
        fetchGame();
      }, [showOptions,]);

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
        }
      }, [onlinePlayers,players]);

      useEffect(() => {
        if(filteredPlayers.length === players.length && filteredPlayers.length > 0){
          setShowOptions(true);
        }
      }, [filteredPlayers]);

    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
      };
    
      const handleContinue = async () => {
        if (selectedOption) {
          try {
            await updatePlayerScore({
              gameId: id,
              string: selectedOption.fillIn
            });
            navigate(`/home/fillBlanckGameRun3/${id}`);
          } catch (error) {
            console.error('Error updating player score:', error);
          }
        }
      };
    
      return (
        <div className="flex flex-col items-center space-y-6 p-6">
        {showOptions ? (
          <>
          <div className="w-full max-w-xl space-y-4">
                      {shuffledSentences.map((option, index) => (
                          <Card
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className={`cursor-pointer w-full p-4 border rounded-lg mb-3 ${selectedOption === option
                                      ? 'bg-slate-200 text-black'
                                      : 'bg-white text-black'}`}
                          >
                              {option.fillIn}
                          </Card>
                      ))}
                  </div><Button
                      onClick={handleContinue}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded"
                      disabled={!selectedOption}
                  >
                          Continue
                      </Button>
            </>
          ) :
          (
          <WaitingForPlayers />
          )}
        </div>
      )
    };
