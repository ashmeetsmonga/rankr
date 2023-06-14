const { BadRequestError } = require("../errors");
const Poll = require("../models/Poll");

const addParticipant = async (pollID, userID, name) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) throw new BadRequestError("PollID invalid or poll expired");

	poll.participants.push({ userID, name });
	await poll.save();

	return poll;
};

const removeParticipant = async (pollID, userID) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) throw new BadRequestError("PollID invalid or poll expired");

	poll.participants = poll.participants.filter((participant) => participant.userID !== userID);
	await poll.save();

	return poll;
};

module.exports = { addParticipant, removeParticipant };
