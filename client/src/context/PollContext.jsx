import { createContext, useState } from "react";

export const PollContext = createContext();

export const PollContextProvider = ({ children }) => {
	const [poll, setPoll] = useState({});
	const [pollAccessToken, setPollAccessToken] = useState("");

	return (
		<PollContext.Provider value={{ poll, setPoll, pollAccessToken, setPollAccessToken }}>
			{children}
		</PollContext.Provider>
	);
};
