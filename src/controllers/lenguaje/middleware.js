const { validator, verifyErrors } = require("../../utils/validation");

class LenguajeMiddleware {
	static createLenguaje(params = {}) {
		const validations = {
			name: validator(params?.name).is("string"),
		};
		return verifyErrors(validations);
	}
}

module.exports = {
	LenguajeMiddleware,
};
