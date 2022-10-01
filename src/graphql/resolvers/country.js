const { UserInputError } = require("apollo-server");
const { CountryController } = require("../../controllers/country/controller");
const { CountryMiddleware } = require("../../controllers/country/middleware");
const { Border, Region, Language } = require("../../schemas/db");

class CountryResolver {
	static async getAllCountries() {
		const { error, content } = await CountryController.getAllCountries({
			include: [
				{
					model: Border,
				},
				{ model: Region },
				{
					model: Language,
				},
			],
		});
		if (error) throw new Error("Internal server error");
		return content.map((c) => ({ ...c.dataValues, borders: c?.Borders, languages: c?.Languages, region: c?.Region }));
	}
	static async getOneCountryByName(root, args) {
		const onlyParams = {
			name: args?.name,
		};
		const { existError, errors } = CountryMiddleware.getOneCountryByName({ ...onlyParams });
		if (existError) {
			throw new UserInputError(Object.values(errors)[0]);
		}
		const { content } = await CountryController.getCountry({
			where: {
				name: onlyParams.name,
			},
		});
		return content;
	}
}

module.exports = {
	CountryResolver,
};
