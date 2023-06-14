const jwt = require("jsonwebtoken");
const { removeParticipant, addParticipant } = require("../service/pollsService");
const adminGuard = require("../middleware/admin");

const socketIO = (io) => {
	io.use(async (socket, next) => {
		try {
			const token = socket.handshake.headers.authorization.split(" ")[1];
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

		socket.on("remove_participant", async (data) => {
			if (!socket.isAdmin) {
				socket.emit("remove_participants", "Admin Priviliges required");
			} else {
				const updatedPoll = await removeParticipant(socket.pollID, data.userID);
				io.to(socket.pollID).emit("poll_updated", updatedPoll);
			}
		});

		socket.on("disconnect", async () => {
			const updatedPoll = await removeParticipant(socket.pollID, socket.userID);
			io.to(socket.pollID).emit("poll_updated", updatedPoll);
		});
	});
};

module.exports = socketIO;
