import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Welcome from "./pages/Welcome";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className='w-screen min-h-screen'>
			<Routes>
				<Route path='/' element={<Welcome />} />
			</Routes>
		</div>
	);
}

export default App;
