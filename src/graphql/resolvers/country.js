const { CountryController } = require("../../controllers/country/controller");

class CountryResolver {
	static async getAllCountries() {
		const { error, content } = await CountryController.getAllCountries();
		if (error) return [];
		return content;
	}
}

module.exports = {
	CountryResolver,
};
