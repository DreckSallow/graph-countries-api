const { validator, verifyErrors } = require("../../utils/validation");

class CountryMiddleware {
	static createCountry(params = {}) {
		const validations = {
			name: validator(params?.name || "")
				.isLength({ max: 30 })
				.is("string"),
			capital: validator(params?.capital || "").isLength({ max: 30 }),
			area: validator(params?.area).inRange({ min: 0 }),
			population: validator(params?.population).inRange({ min: 0 }),
			image: validator(params?.image).isUrlWithHttp().isLength({ min: 5 }),
			fifa: validator(params?.fifa).is("string"),
		};
		return verifyErrors(validations);
	}
	static getOneCountryByName(params = {}) {
		const validations = {
			name: validator(params?.name).isLength({ min: 0, max: 100 }),
		};
		return verifyErrors(validations);
	}
	static getOneCountryById(params = {}) {
		const validations = {
			id: validator(params?.id).isNumber(),
		};
		return verifyErrors(validations);
	}
}

module.exports = {
	CountryMiddleware,
};
