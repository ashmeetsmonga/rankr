// const nanoid = require("nanoid");

// nanoid.customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

const createPollID = () =>
	import("nanoid").then(({ customAlphabet }) => {
		return customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6)();
	});

const createUserID = () =>
	import("nanoid").then(({ nanoid }) => {
		return nanoid();
	});

module.exports = { createPollID, createUserID };
