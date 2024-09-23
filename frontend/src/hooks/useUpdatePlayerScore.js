import axios from 'axios';
export const useUpdatePlayerScore = () => {
  const updatePlayerScore = async ({ gameId, string }) => {
    // console.log(gameId, fullName, string);
    try {
      const response = await axios.post('/api/game/update-player-score', {
        gameId,
        // fullName,
        string
      });
      

      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message || 'Failed to update player score');
      } else {
        console.error('Error updating player score:', error);
        throw error;
      }
    }
  };

  return { updatePlayerScore };
};
