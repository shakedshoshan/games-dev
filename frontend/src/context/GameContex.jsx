import React, { createContext, useContext, useState, useEffect } from 'react';

export const GameContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const gameContext = () => {
	return useContext(GameContext);
};

export const GameContextProvider = ({ children }) => {
	const [gameDetails, setGameDetails] = useState(JSON.parse(localStorage.getItem("game-details")) || null);

	return <GameContext.Provider value={{ gameDetails, setGameDetails }}>{children}</GameContext.Provider>;
};