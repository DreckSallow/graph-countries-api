const { validator, verifyErrors } = require("../../utils/validation");

class BorderMiddleware {
	static createBorder(params) {
		const validations = {
			initials: validator(params?.name || "")
				.isLength({ max: 5 })
				.is("string"),
		};
		return verifyErrors(validations);
	}
}

module.exports = {
	BorderMiddleware,
};
