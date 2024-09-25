import { useEffect, useState } from 'react'

export function WaitingForPlayers() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length >= 3 ? '' : prevDots + '.'))
    }, 500)

    return () => clearInterval(interval);
  }, [])

  return (
    (<div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Waiting for players</h2>
        <div className="inline-block">
          <span className="text-blue-500 text-3xl">{dots}</span>
          <span className="sr-only">Loading</span>
        </div>
      </div>
    </div>)
  );
}