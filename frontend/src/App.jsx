import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { FillBlankGame } from "./pages/fillBlanckGame";
import { FillBlankGameRun } from "./pages/fillBlanckGameRun.jsx";
import { FillBlankGameRun2 } from "./pages/fillBlanckGameRun2.jsx";
import { FillBlankGameRun3 } from "./pages/fillBlanckGameRun3.jsx";
import { EndGame } from "./pages/EndGame.jsx";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='h-screen flex flex-col'>
			{authUser && <Header userName={authUser.fullName} userImage={authUser.profilePic} />}
			<div className='flex-grow p-4 flex items-center justify-center'>
				<Routes>
					<Route path='/home' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='home/fillBlanckGame/:id' element={authUser ? <FillBlankGame /> : <Navigate to={"/login"} />} />
					<Route path='home/fillBlanckGameRun/:id' element={authUser ? <FillBlankGameRun /> : <Navigate to={"/login"} />} />
					<Route path='home/fillBlanckGameRun2/:id' element={authUser ? <FillBlankGameRun2 /> : <Navigate to={"/login"} />} />
					<Route path='home/fillBlanckGameRun3/:id' element={authUser ? <FillBlankGameRun3 /> : <Navigate to={"/login"} />} />
					<Route path='home/EndGame/:id' element={authUser ? <EndGame /> : <Navigate to={"/login"} />} />
					<Route path='/login' element={authUser ? <Navigate to='/home' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/home' /> : <SignUp />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;