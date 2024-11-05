import axios from 'axios';
/**
 /**
  * Updates the player's score in a game asynchronously.
  * @param {Object} options - The options for updating the player's score.
  * @param {string} options.gameId - The unique identifier of the game.
  * @param {string} options.string - The string representation of the player's score or update.
  * @returns {Promise<Object>} The response data from the server after updating the score.
  * @throws {Error} If the update fails, with the error message from the server or a generic error message.
  */
 * Custom React hook for updating a player's score in a game.
 * @param {Object} params - The parameters for updating the player's score.
 * @param {string} params.gameId - The unique identifier of the game.
 * @param {string} params.string - The string representation of the player's score or score update.
 * @returns {Promise<Object>} The response data from the server after updating the player's score.
 * @throws {Error} If the update fails, with the error message from the server or a generic error message.
 */
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
