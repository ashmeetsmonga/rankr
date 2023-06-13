const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PollSchema = new mongoose.Schema(
	{
		topic: {
			type: String,
			minLength: 1,
			maxLength: 100,
			required: [true, "Please provide an Poll topic"],
		},
		pollID: {
			type: String,
			required: [true, "Please provide pollID"],
		},
		votesPerVoter: {
			type: Number,
			required: [true, "Please provide votesPerVoter"],
		},
		participants: {
			type: [{ userID: String, name: String }],
			default: [],
		},
		adminID: {
			type: String,
			required: [true, "Please provide adminID"],
		},
	},
	{
		timestamps: true,
	}
);

PollSchema.methods.createJWT = function (userID, name) {
	const token = jwt.sign({ pollID: this.pollID, userID, name }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	return token;
};

module.exports = new mongoose.model("Poll", PollSchema);
