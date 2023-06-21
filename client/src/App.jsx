import "./App.css";
import Welcome from "./pages/Welcome";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreatePollPage from "./pages/CreatePollPage";
import JoinPollPage from "./pages/JoinPollPage";
import WaitingRoomPage from "./pages/WaitingRoomPage";
import VotingPage from "./pages/VotingPage";
import { useContext, useEffect } from "react";
import { PollContext } from "./context/PollContext";

function App() {
	const { poll } = useContext(PollContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (poll.hasStarted) navigate("/voting-page");
	}, [poll]);

	return (
		<div className='w-screen min-h-screen'>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/create-poll' element={<CreatePollPage />} />
				<Route path='/join-poll' element={<JoinPollPage />} />
				<Route path='/waiting-room' element={<WaitingRoomPage />} />
				<Route path='/voting-page' element={<VotingPage />} />
			</Routes>
		</div>
	);
}

export default App;
