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

const createNominationID = () =>
	import("nanoid").then(({ customAlphabet }) => {
		return customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8)();
	});

const getResults = (nominations, rankings, votesPerVoter) => {
	const results = [];
	for (let nomination of nominations)
		results.push({ nominationID: nomination.nominationID, name: nomination.name, score: 0 });

	for (let ranking of rankings) {
		let count = votesPerVoter;
		for (let nominationID of ranking.nominations) {
			const nomination = results.find((nom) => nom.nominationID === nominationID);
			nomination.score += count;
			count -= 1;
		}
	}

	results.sort((a, b) => a.score - b.score);

	console.log("results", results);

	return results;
};

module.exports = { createPollID, createUserID, createNominationID, getResults };
