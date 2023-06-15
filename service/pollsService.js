const { BadRequestError } = require("../errors");
const Poll = require("../models/Poll");
const { createNominationID } = require("../utils/utils");

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

const addNomination = async (pollID, userID, name) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) throw new BadRequestError("PollID invalid or expired");

	const nominationID = await createNominationID();

	poll.nominations.push({ nominationID, userID, name });
	await poll.save();

	return poll;
};

const removeNomination = async (pollID, nominationID) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) throw new BadRequestError("PollID invalid or expired");

	poll.nominations = poll.nominations.filter(
		(nomination) => nomination.nominationID !== nominationID
	);
	await poll.save();

	return poll;
};

module.exports = { addParticipant, removeParticipant, addNomination, removeNomination };
