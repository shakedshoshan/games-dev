import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
//import { SocketContextProvider } from "./context/SocketContext.jsx";
// import { GameContextProvider } from "./context/GameContext.jsx";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				{/* <GameContextProvider> */}
				{/* <SocketContextProvider> */}
					<App />
				{/* </SocketContextProvider> */}
				{/* </GameContextProvider> */}
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
