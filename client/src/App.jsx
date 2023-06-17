import "./App.css";
import Welcome from "./pages/Welcome";
import { Route, Routes } from "react-router-dom";
import CreatePollPage from "./pages/CreatePollPage";
import JoinPollPage from "./pages/JoinPollPage";

function App() {
	return (
		<div className='w-screen min-h-screen'>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/create-poll' element={<CreatePollPage />} />
				<Route path='/join-poll' element={<JoinPollPage />} />
			</Routes>
		</div>
	);
}

export default App;
