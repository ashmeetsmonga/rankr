const jwt = require("jsonwebtoken");
const {
	removeParticipant,
	addParticipant,
	addNomination,
	removeNomination,
	startPoll,
	submitNominations,
	closePoll,
	cancelPoll,
} = require("../service/pollsService");
const adminGuard = require("../middleware/admin");

const socketIO = (io) => {
	io.use(async (socket, next) => {
		try {
			console.log("In socket settings", socket.handshake.auth.token);
			const token = socket.handshake.auth.token.split(" ")[1];
			const payload = jwt.verify(token, process.env.JWT_SECRET);
			socket.pollID = payload.pollID;
			socket.userID = payload.userID;
			socket.name = payload.name;

			socket.isAdmin = await adminGuard(payload.pollID, payload.userID);

			next();
		} catch (err) {
			next(err);
		}
	});

	io.on("connection", async (socket) => {
		socket.join(socket.pollID);
		const updatedPoll = await addParticipant(socket.pollID, socket.userID, socket.name);
		io.to(socket.pollID).emit("poll_updated", updatedPoll);
		console.log("Socket connected (from server)");

		socket.on("remove_participant", async (data) => {
			if (!socket.isAdmin) {
				socket.emit("remove_participants", "Admin Priviliges required");
			} else {
				const updatedPoll = await removeParticipant(socket.pollID, data.userID);
				io.to(socket.pollID).emit("poll_updated", updatedPoll);
			}
		});

		socket.on("add_nomination", async (data) => {
			const updatedPoll = await addNomination(socket.pollID, socket.userID, data.name);
			io.to(socket.pollID).emit("poll_updated", updatedPoll);
		});

		socket.on("remove_nomination", async (data) => {
			if (!socket.isAdmin) socket.emit("exception", "Admin Privilidges required");
			else {
				const updatedPoll = await removeNomination(socket.pollID, data.nominationID);
				io.to(socket.pollID).emit("poll_updated", updatedPoll);
			}
		});

		socket.on("submit_nominations", async (data) => {
			const updatedPoll = await submitNominations(socket.pollID, socket.userID, data.nominations);
			io.to(socket.pollID).emit("poll_updated", updatedPoll);
		});

		socket.on("start_poll", async () => {
			if (!socket.isAdmin) socket.emit("exception", "Admin Privilidges required");
			else {
				const updatedPoll = await startPoll(socket.pollID);
				io.to(socket.pollID).emit("poll_updated", updatedPoll);
			}
		});

		socket.on("close_poll", async () => {
			if (!socket.isAdmin) socket.emit("exception", "Admin Privilidges required");
			else {
				const updatedPoll = await closePoll(socket.pollID);
				io.to(socket.pollID).emit("poll_updated", updatedPoll);
			}
		});

		socket.on("cancel_poll", async () => {
			if (!socket.isAdmin) socket.emit("exception", "Admin Privilidges required");
			else {
				await cancelPoll(socket.pollID);
				io.to(socket.pollID).emit("poll_cancelled");
			}
		});

		socket.on("disconnect", async () => {
			const updatedPoll = await removeParticipant(socket.pollID, socket.userID);
			io.to(socket.pollID).emit("poll_updated", updatedPoll);
		});
	});
};

module.exports = socketIO;
