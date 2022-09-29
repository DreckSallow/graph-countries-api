const { Country } = require("../../schemas/db");

class CountryController {
	static getAllCountries = async ({ where } = {}) => {
		try {
			const whereProp = where ?? {};
			const countries = await Country.findAll({ where: whereProp });
			console.log(countries);
			return { error: false, content: countries };
		} catch (err) {
			return { error: true, content: err };
		}
	};
	static createCountry = async (props) => {
		try {
			const newCountry = await Country.create(props);
			return { error: false, content: newCountry };
		} catch (err) {
			return { error: true, content: err };
		}
	};
	static getCountry = async ({ where } = {}) => {
		try {
			const whereProp = where ?? {};
			const country = await Country.findOne({ where: whereProp });
			return { error: false, content: country };
		} catch (err) {
			return { error: true, err, content: err };
		}
	};
}

module.exports = {
	CountryController,
};
