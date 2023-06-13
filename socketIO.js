const jwt = require("jsonwebtoken");
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

	io.on("connection", (socket) => {
		console.log(
			"A new user connected with id:",
			socket.userID,
			", pollID:",
			socket.pollID,
			"and name:",
			socket.name
		);
		io.emit("hello", `Hello from id:${socket.client.id}`);

		socket.on("remove_participants", async (data) => {
			console.log("remove_participants data:", data);
			if (!socket.isAdmin) {
				console.log("Admin Priviliges required in console");
				socket.emit("remove_participants", "Admin Priviliges required");
			} else {
				const poll = await Poll.findOne({ pollID: socket.pollID });
				poll.participants = poll.participants.filter(
					(participant) => participant.userID !== data.userID
				);
				await poll.save();
				socket.emit("remove_participants", `Participant with userID ${data.userID} removed!!!`);
			}
		});
	});
};

module.exports = socketIO;
