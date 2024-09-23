    import React, { useState, useContext } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
    import { Button } from "@/components/ui/button";
    import { Card } from "@/components/ui/card";
    // import { AuthContext } from '../../context/AuthContext';
    import { useUpdatePlayerScore } from '../../hooks/useUpdatePlayerScore';
    
    export const SelectOptions = ({ options }) => {
      const { updatePlayerScore } = useUpdatePlayerScore();
      const [selectedOption, setSelectedOption] = useState(null);
      const navigate = useNavigate();
      const { id } = useParams();
    //   const { authUser } = useContext(AuthContext); // Get authUser from AuthContext
    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
      };
    
      const handleContinue = async () => {
        if (id && selectedOption) {
          try {
            await updatePlayerScore({
              gameId: id,
            //   fullName: authUser.fullName,
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
          <div className="w-full max-w-xl space-y-4">
            {options.map((option, index) => (
              <Card
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer w-full p-4 border rounded-lg mb-3 ${
                  selectedOption === option
                    ? 'bg-slate-200 text-black'
                    : 'bg-white text-black'
                }`}
              >
                {option.fillIn}
              </Card>
            ))}
          </div>
          <Button
            onClick={handleContinue}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded"
            disabled={!selectedOption}
          >
            Continue
          </Button>
        </div>
      )
    };
