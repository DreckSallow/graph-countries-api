const { Country } = require("../../schemas/db");

class CountryController {
	static getAllCountries = async ({ where } = {}) => {
		const whereProp = where ?? {};
		const countries = await Country.findAll({ where: whereProp });
		console.log(countries);
		return { error: false, content: countries };
	};
	static createCountry = async (props) => {
		const newCountry = await Country.create(props);
		return { error: false, content: newCountry };
	};
	static getCountry = async ({ where } = {}) => {
		const whereProp = where ?? {};
		const country = await Country.findOne({ where: whereProp });
		return { error: false, content: country };
	};
}

module.exports = {
	CountryController,
};
