import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocketNav } from '../../hooks/useSocketNav';


export function ScoreTable({ game, round, maxRound, gameId, isMainPlayer }) {
  const { handleStartGame: handleSocketStartGame } = useSocketNav({ url: `/home/fillBlanckGameRun/${gameId}` });
  
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

  const handleContinue = () => {
    
    if (round >= maxRound-1) {
      navigate(`/home/EndGame/${gameId}`);
    } else {
      if(isMainPlayer){
        axios.post('http://localhost:5000/api/game/increment-current-player-index', { gameId: gameId })
          .then(response => {
          console.log('Current player index incremented successfully:', response.data);
          handleSocketStartGame();
        })
        .catch(error => {
          console.error('Error incrementing current player index:', error);
          });
      }
    }
  }

  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-50"
      case 1:
        return "bg-gray-50"
      case 2:
        return "bg-orange-50"
      default:
        return ""
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-1">Score Table</h2>
      <span className="text-sm font-semibold text-center mb-4">Round { round + 1 } / { maxRound }</span>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                {Object.entries(scores).map(([name, score], index) => (
                  <TableRow key={name || `${name}-${index}`} className={getRowStyle(index)}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell className="text-right">{score}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <motion.div
        className="flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
          {isMainPlayer ||  (round >= maxRound-1) ? (
        <Button onClick={handleContinue} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-800">
          Continue
        </Button>
          ) : (
            <></>
          )}
      </motion.div>
    </div>
  );
}