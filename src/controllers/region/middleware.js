const { validator, verifyErrors } = require("../../utils/validation");

class RegionMiddleware {
	static createRegion(params) {
		const validations = {
			initials: validator(params?.name || "")
				.isLength({ max: 20 })
				.is("string"),
		};
		return verifyErrors(validations);
	}
}

module.exports = {
	RegionMiddleware,
};
