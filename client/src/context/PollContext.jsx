import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const PollContext = createContext();

export const PollContextProvider = ({ children }) => {
	const [poll, setPoll] = useState({});
	const [pollAccessToken, setPollAccessToken] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [user, setUser] = useState({});
	const [socket, setSocket] = useState(null);

	const setAdmin = (token, poll) => {
		const decoded = jwt_decode(token);
		const newUser = {
			userID: decoded.userID,
			name: decoded.name,
		};
		setUser(newUser);
		setIsAdmin(decoded.userID === poll.adminID);
	};

	const resetPoll = () => {
		setPoll({});
		setPollAccessToken("");
		setIsAdmin(false);
		setUser({});
		setSocket(null);
	};

	return (
		<PollContext.Provider
			value={{
				poll,
				setPoll,
				pollAccessToken,
				setPollAccessToken,
				isAdmin,
				setAdmin,
				socket,
				setSocket,
				resetPoll,
			}}
		>
			{children}
		</PollContext.Provider>
	);
};
