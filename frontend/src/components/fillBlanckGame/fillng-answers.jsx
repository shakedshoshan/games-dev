import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInsertFilledSentence } from '../../hooks/useInserFilledSentence';
import { useNavigate } from 'react-router-dom';

export const FillInAnswers = ({sentence = "", gameId = ""}) => {
  // const [displayedString, setDisplayedString] = useState("Initial String")
  const [inputString, setInputString] = useState("")
  const [timeLeft, setTimeLeft] = useState(30);
  const { insertFilledSentence } = useInsertFilledSentence();
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate(`/home/fillBlanckGameRun2/${gameId}`);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId);
  }, [timeLeft, navigate, gameId])

  const handleSubmitAndContinue = async (e) => {
    // console.log(inputString);
    e.preventDefault()
    if (inputString.trim() !== "") {
      try {
        await insertFilledSentence({gameId, fillIn: inputString});
        setInputString("")
        navigate(`/home/fillBlanckGameRun2/${gameId}`);
      } catch (error) {
        console.error('Error inserting filled sentence:', error);
      }
    }
    setTimeLeft(30) // Reset the timer to 30 seconds
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    (<div className="flex items-center justify-center min-h-screen space-y-5 p-4">
      <Card className="w-full space-y-10 max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center break-words text-black">
            {sentence}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmitAndContinue} className="space-y-6">
            <Input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              placeholder="Enter a new string"
              className="w-full" />
            <div className="flex items-center justify-between space-x-2">
              <Button type="submit" className="flex-grow bg-blue-600 hover:bg-blue-800">
                Update & Continue
              </Button>
              <div
                className="text-lg sm:text-xl font-mono tabular-nums"
                aria-live="polite"
                aria-label={`${timeLeft} seconds remaining`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </form>
          {timeLeft === 0 && (
            <p className="text-center text-red-600">Time's up!</p>
          )}
        </CardContent>
      </Card>
    </div>)
  );
}