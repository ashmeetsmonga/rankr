const { BadRequestError } = require("../errors");
const Poll = require("../models/Poll");

const addParticipant = async (pollID, userID, name) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) throw new BadRequestError("PollID invalid or poll expired");

	poll.participants.push({ userID, name });
	await poll.save();

	const token = poll.createJWT(userID, name);
	return token;
};

const removeParticipant = async (pollID, userID) => {
	const poll = await Poll.findOne({ pollID });
	poll.participants = poll.participants.filter((participant) => participant.userID !== userID);
	await poll.save();
};

module.exports = { addParticipant, removeParticipant };
