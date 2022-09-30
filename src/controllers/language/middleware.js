const { validator, verifyErrors } = require("../../utils/validation");

class LanguageMiddleware {
	static createLanguage(params = {}) {
		const validations = {
			name: validator(params?.name).is("string"),
		};
		return verifyErrors(validations);
	}
}

module.exports = {
	LanguageMiddleware,
};
