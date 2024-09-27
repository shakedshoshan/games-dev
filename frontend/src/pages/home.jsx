
 // Start of Selection
import React, { useEffect, useContext, useState } from 'react';
import { StartGameComponent } from '../components/start-game.jsx';
import {useSocket} from '../hooks/useSocket';

/**
 * Renders the Home component
 * @returns {JSX.Element} A div containing the StartGameComponent
 */
function Home() {


  return (
    <div>
      <StartGameComponent />

    </div>
  );
}

export default Home