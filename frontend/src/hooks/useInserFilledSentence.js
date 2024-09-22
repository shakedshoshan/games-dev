import { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export const useInsertFilledSentence = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authUser } = useContext(AuthContext);

  const insertFilledSentence = async ({gameId="x", fillIn="x"}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/game/add-filled-sentence', {
        gameId: gameId,
        playerName: authUser.fullName,
        fillIn: fillIn
      });
      setLoading(false);
      toast.success('Filled sentence inserted successfully!');
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      toast.error('Error inserting filled sentence: ' + err.message);
    }
  };

  return { insertFilledSentence, loading, error };
};

// export default useInsertFilledSentence;
