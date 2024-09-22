import React from 'react'
//import { useAuthContext } from '../context/AuthContext.jsx'
import { StartGameComponent } from '../components/start-game.jsx'

function home() {
  // const { authUser } = useAuthContext();

  return (
    <div>
      <StartGameComponent/>
    </div>
    
  )
}

export default home