const Poll = require("../models/Poll");

const adminGuard = async (pollID, userID) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) return false;

	return poll.adminID === userID;
};

module.exports = adminGuard;
