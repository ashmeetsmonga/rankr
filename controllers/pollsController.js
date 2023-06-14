const { BadRequestError } = require("../errors");
const Poll = require("../models/Poll");
const { createPollID, createUserID } = require("../utils/utils");
const { validationResult } = require("express-validator");
const { addParticipant } = require("./pollsService");

const createPoll = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { topic, votesPerVoter, name } = req.body;

	if (!topic || !votesPerVoter || !name)
		return new BadRequestError("Please provide topic, votesPerVoter and name");

	const pollID = await createPollID();
	const adminID = await createUserID();
	const poll = await Poll.create({ topic, votesPerVoter, pollID, adminID });
	const token = poll.createJWT(adminID, name);
	res.json({ poll, token });
};

const joinPoll = async (req, res) => {
	const { pollID, name } = req.body;
	if (!pollID || !name) return new BadRequestError("Please provide pollID and name");

	const userID = await createUserID();

	// const token = addParticipant(pollID, userID, name);
	const poll = await Poll.findOne({ pollID });
	if (!poll) throw new BadRequestError("PollID invalid or poll expired");

	const token = poll.createJWT(userID, name);

	res.json({ token });
};

const rejoinPoll = async (req, res) => {
	res.json({ poll: req.poll });
};

module.exports = { createPoll, joinPoll, rejoinPoll };
