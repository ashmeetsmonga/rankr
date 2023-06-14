const jwt = require("jsonwebtoken");
const { removeParticipant, addParticipant } = require("./controllers/pollsService");
const adminGuard = require("./middleware/admin");
const isAdmin = require("./middleware/admin");
const Poll = require("./models/Poll");

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
		const updatedPoll = await addParticipant(socket.pollID, socket.userID, socket.name);
		socket.emit("poll_updated", updatedPoll);

		socket.on("remove_participant", async (data) => {
			if (!socket.isAdmin) {
				socket.emit("remove_participants", "Admin Priviliges required");
			} else {
				const updatedPoll = await removeParticipant(socket.pollID, data.userID);
				socket.emit("poll_updated", updatedPoll);
			}
		});

		socket.on("disconnect", async () => {
			const updatedPoll = await removeParticipant(socket.pollID, socket.userID);
			socket.emit("poll_updated", updatedPoll);
		});
	});
};

module.exports = socketIO;
