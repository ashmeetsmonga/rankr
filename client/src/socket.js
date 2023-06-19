import { io } from "socket.io-client";

export const initialiseSocket = (setPoll) => {
	const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
		transports: ["websocket", "polling", "flashsocket"],
		auth: {
			token: `Bearer ${sessionStorage.getItem("token")}`,
		},
	});

	socket.on("connect", () => {
		console.log("Socket connected");
	});

	socket.on("poll_updated", (poll) => {
		console.log("Poll updated", poll);
		setPoll(poll);
	});
	return socket;
};
