import React, { useState } from 'react';
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export function LeaderboardPodium({game, gameId}) {
  const navigate = useNavigate();
  
  function sortObjectByValue(obj) {
    // Convert the object into an array of [key, value] pairs
    const objEntries = Object.entries(obj);
    
    // Sort the array based on the values (index 1 in each [key, value] pair)
    objEntries.sort((a, b) => b[1] - a[1]);
    
    // Convert the sorted array back into an object
    const sortedObj = Object.fromEntries(objEntries);
    
    return sortedObj;
  }
  const scores = sortObjectByValue(game);

  const [showConfetti, setShowConfetti] = useState(true)
  const { width, height } = useWindowSize()


  const handlePlayAgain = () => {
    // Reset the game or redirect to the game page
    alert("Starting a new game!")
    setShowConfetti(true)
  }

  const handleExit = () => {
    // Exit the game or redirect to the home page
    alert("Exiting the game!")
  }

  return (
    (<div className="container mx-auto p-4 min-h-screen">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
      <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
      <div className="flex justify-center mb-12">
        <div className="flex items-end space-x-4">
          {/* Second Place */}
          {scores && Object.keys(scores)[1] ? (
          <div className="flex flex-col items-center">
            <div className="text-lg text-black font-semibold mb-2">{Object.keys(scores)[1]}</div>
            <div className="w-24 h-24 bg-gray-300 rounded-t-lg shadow-md flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-700">{Object.values(scores)[1] }</span>
            </div>
            <div className="text-3xl mt-2">🥈</div>
          </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-lg text-black font-semibold mb-2"></div>
              <div className="w-24 h-24 bg-gray-300 rounded-t-lg shadow-md flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-700"></span>
              </div>
              <div className="text-3xl mt-2">🥈</div>
            </div>
          )}

          {/* First Place */}
          {scores && Object.keys(scores)[0] ? (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold mb-2">{Object.keys(scores)[0]}</div>
            <div
              className="w-28 h-28 bg-[#ffde26] rounded-t-lg shadow-md flex items-center justify-center">
              <span className="text-4xl font-bold text-yellow-800">{Object.values(scores)[0]}</span>
            </div>
            <div className="text-4xl mt-2">🏆</div>
          </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-lg text-black font-semibold mb-2">No data</div>
              <div className="w-28 h-28 bg-gray-300 rounded-t-lg shadow-md flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-700">No data</span>
              </div>
              <div className="text-4xl mt-2">🏆</div>
            </div>
          )}
          {/* Third Place */}
          {scores && Object.keys(scores)[2] ? (
          <div className="flex flex-col items-center">
            <div className="text-md font-semibold mb-2">{Object.keys(scores)[2] }</div>
            <div
              className="w-20 h-20 bg-yellow-500 rounded-t-lg shadow-md flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-800">{Object.values(scores)[2] }</span>
            </div>
            <div className="text-2xl mt-2">🥉</div>
          </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-lg text-black font-semibold mb-2"></div>
              <div className="w-20 h-20 bg-gray-300 rounded-t-lg shadow-md flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700"></span>
              </div>
              <div className="text-2xl mt-2">🥉</div>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto mb-8">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores ? (
              Object.entries(scores).map(([name, score], index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2 text-center">{score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={handlePlayAgain} variant="outline">
          Play Again
        </Button>
        <Button onClick={() => {
          axios.post('http://localhost:5000/api/game/delete-game', { gameId: gameId })
            .then(response => {
              console.log('Game deleted successfully:', response.data);
              navigate('/home');
            })
            .catch(error => {
              console.error('Error deleting game:', error);
            });
        }} variant="">
          Exit
        </Button>
      </div>
    </div>)
  );
}
        