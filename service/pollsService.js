const { BadRequestError } = require("../errors");
const Poll = require("../models/Poll");
const { createNominationID, getResults } = require("../utils/utils");

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

const submitNominations = async (pollID, userID, nominations) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) throw new BadRequestError("PollID invalid or expired");

	poll.rankings.push({ userID, nominations });
	await poll.save();

	return poll;
};

const startPoll = async (pollID) => {
	const poll = await Poll.findOne({ pollID });
	if (!poll) return new BadRequestError("PollID invalid or expired");
	poll.hasStarted = true;
	await poll.save();
	return poll;
};

const closePoll = async (pollID) => {
	const poll = await Poll.findOne({ pollID });
	poll.results = getResults(poll.nominations, poll.rankings, poll.votesPerVoter);
	await poll.save();
	return poll;
};

const cancelPoll = async (pollID) => {
	const poll = await Poll.findOne({ pollID });
	await poll.remove();
};

module.exports = {
	addParticipant,
	removeParticipant,
	addNomination,
	removeNomination,
	submitNominations,
	startPoll,
	closePoll,
	cancelPoll,
};
