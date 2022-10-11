const { Country } = require("../../schemas/db");

class CountryController {
	static getAllCountries = async ({ where, include, order } = {}) => {
		const props = { where: where ?? {} };
		if (include) {
			props.include = include;
		}
		if (order) props.order = order;
		const countries = await Country.findAll(props);
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
