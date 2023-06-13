const { body } = require("express-validator");

const createValidationMiddleware = () => {
	console.log("In createValidation...");
	return [body("topic").isLength({ min: 1, max: 100 })];
};

module.exports = createValidationMiddleware;
