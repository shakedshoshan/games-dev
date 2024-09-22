    import React, { useState } from 'react';
    import { Button } from "@/components/ui/button";
    import { Card } from "@/components/ui/card";
    
    export const SelectOptions = ({ options }) => {
      const [selectedOption, setSelectedOption] = useState(null);
    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
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
            className="mt-6 w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded"
            disabled={!selectedOption}
          >
            Continue
          </Button>
        </div>
      )
    };
