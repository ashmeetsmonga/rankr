const webSocketApp = (webSocketServer) => {
	webSocketServer.on("connection", function (ws) {
		console.log("New Connection!!!");

		ws.on("headers", function (data) {
			console.log("Headers data", data);
		});

		ws.on("message", function (data) {
			console.log("New message: " + data);
			ws.send(`${data}`);
		});

		ws.on("close", function (data) {
			console.log("User Disconnected!!!");
			ws.send("Bye Bye");
		});
	});
};

module.exports = webSocketApp;
