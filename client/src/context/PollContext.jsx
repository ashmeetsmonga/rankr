import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const PollContext = createContext();

export const PollContextProvider = ({ children }) => {
	const [poll, setPoll] = useState({});
	const [pollAccessToken, setPollAccessToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const setAdmin = (token, poll) => {
		const decoded = jwt_decode(token);
		setIsAdmin(decoded.userID === poll.adminID);
	};

	return (
		<PollContext.Provider value={{ poll, setPoll, pollAccessToken, setPollAccessToken, setAdmin }}>
			{children}
		</PollContext.Provider>
	);
};
