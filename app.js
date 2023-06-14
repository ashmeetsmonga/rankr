require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const pollRoutes = require("./routes/pollsRoutes");
const http = require("http");
const { Server } = require("socket.io");
const socketIO = require("./controllers/socketController");

// const WebSocket = require("ws");
// const webSocketApp = require("./webSocket");

// middleware
app.use(express.json());

//routes
app.use("/polls", pollRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server);

socketIO(io);

const start = async () => {
	try {
		server.listen(port, () => console.log(`Server is listening on port ${port}...`));
		await connectDB(process.env.MONGO_URI);
		console.log("DB Connected");
	} catch (error) {
		console.log(error);
	}
};

start();
