const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("Token not found");
	}

	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.poll = { userID: decoded.userID, name: decoded.name, pollID: decoded.pollID };
		next();
	} catch (err) {
		throw new UnauthenticatedError("Invalid Token");
	}
};

module.exports = authMiddleware;
