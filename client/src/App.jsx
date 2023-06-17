import "./App.css";
import Welcome from "./pages/Welcome";
import { Route, Routes } from "react-router-dom";
import CreatePollPage from "./pages/CreatePollPage";
import JoinPollPage from "./pages/JoinPollPage";
import WaitingRoomPage from "./pages/WaitingRoomPage";

function App() {
	return (
		<div className='w-screen min-h-screen'>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/create-poll' element={<CreatePollPage />} />
				<Route path='/join-poll' element={<JoinPollPage />} />
				<Route path='/waiting-room' element={<WaitingRoomPage />} />
			</Routes>
		</div>
	);
}

export default App;
