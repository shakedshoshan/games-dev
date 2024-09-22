import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

export const FillBlankGame = () => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState('');
  const { id } = useParams();
  const { authUser } = useContext(AuthContext); // Get authUser from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/game/details/${id}`);
        setPlayers(response.data.game.players);
        setGameCode(response.data.game.gameCode);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [id]);

  // Check if the current user is the first player
  const isFirstPlayer = players.length > 0 && authUser && players[0].name === authUser.fullName;

  const handleStartGame = async () => {
    try {
      await axios.post('http://localhost:5000/api/game/initialize-scores', { gameId : id});
      navigate(`/home/fillBlanckGameRun/${id}`);
    } catch (error) {
      console.error('Error initializing scores:', error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  return (
    <div className='container mx-auto mt-14'>
      <h1 className='text-black text-5xl '>Fill Blank Game</h1>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-4 pb-4'>Game Code: {gameCode}</h2>
        <h1 className='text-1xl font-bold mb-4'>Players:</h1>
        {players.length > 0 ? (
          <ul className='space-y-2'>
            {players.map((player) => (
              <li key={player._id} className='flex items-center space-x-4'>
                <img src={player.profilePic} alt={`${player.name}'s profile`} className='w-10 h-10 rounded-full' />
                <span className='text-lg text-black'>{player.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No players have joined yet.</p>
        )}
        
        {/* Add Start button for the first player */}
        {isFirstPlayer && (
          <button 
            className='mt-10 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleStartGame}
          >
            Start Game
          </button>
        )}
      </div>
    </div>
  );
}

// export default FillBlankGame;