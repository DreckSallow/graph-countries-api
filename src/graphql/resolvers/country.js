const { UserInputError } = require("apollo-server");
const { CountryController } = require("../../controllers/country/controller");
const { CountryMiddleware } = require("../../controllers/country/middleware");
const { Border, Region, Language } = require("../../schemas/db");

const SortTypes = {
	alpha: "alpha",
	population: "population",
	area: "area",
};

const CountrySort = {
	[SortTypes.alpha]: "name",
	[SortTypes.population]: "population",
	[SortTypes.area]: "area",
};

const getProps = (props = {}) => {
	const cleanProps = {
		language: [],
		regions: [],
		sort: [],
	};
	if (props.languages && Array.isArray(props.languages)) {
		cleanProps.language = props.languages;
	}
	if (props.regions && Array.isArray(props.regions)) {
		cleanProps.regions = props.regions;
	}
	if (props.sort) {
		const entries = Object.entries(props.sort);
		entries.forEach(([k, bool]) => {
			if (k in SortTypes && Boolean(bool)) {
				cleanProps.sort.push([CountrySort[k], "ASC"]);
			}
		});
	}
	return {
		language: cleanProps.language.length > 0 ? { name: cleanProps.language } : {},
		regions: cleanProps.regions.length > 0 ? { name: cleanProps.regions } : {},
		sort: cleanProps.sort,
	};
};

class CountryResolver {
	static async getAllCountries(root, args) {
		const cleanProps = getProps(args);
		const { error, content } = await CountryController.getAllCountries({
			order: cleanProps.sort,
			include: [
				{
					model: Border,
				},
				{
					model: Region,
					where: cleanProps.regions,
				},
				{
					model: Language,
					where: cleanProps.language,
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
