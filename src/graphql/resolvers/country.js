const { UserInputError } = require("apollo-server");
const { Op } = require("sequelize");
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

const TypeSort = {
	asc: "ASC",
	des: "DESC",
};

const getProps = (props = {}) => {
	const cleanProps = {
		languages: {},
		regions: {},
		sort: [],
	};
	if (props.languages && Array.isArray(props.languages)) {
		cleanProps.languages = { name: props.languages };
	}
	if (props.regions && Array.isArray(props.regions)) {
		cleanProps.regions = { name: props.regions };
	}
	if (props.sort) {
		const entries = Object.entries(props.sort);
		entries.forEach(([k, bool]) => {
			if (k in SortTypes && Boolean(bool)) {
				cleanProps.sort.push([CountrySort[k], CountrySort[k] === "name" ? TypeSort.asc : TypeSort.des]);
			}
		});
	}
	if (!props.sort) {
		cleanProps.sort.push([CountrySort[SortTypes.alpha], "ASC"]);
	}
	return {
		language: cleanProps.languages,
		regions: cleanProps.regions,
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
	static async getCountriesMatchName(root, args) {
		const onlyParams = {
			name: args?.name,
		};
		const { existError, errors } = CountryMiddleware.getOneCountryByName({ ...onlyParams });
		if (existError) {
			throw new UserInputError(Object.values(errors)[0]);
		}
		const { content } = await CountryController.getAllCountries({
			where: {
				name: {
					[Op.substring]: "%" + onlyParams.name + "%",
				},
			},
		});
		return content;
	}
	static async getCountriesById(root, args) {
		const onlyParams = {
			id: Number(args?.id),
		};
		const { existError, errors } = CountryMiddleware.getOneCountryById({ ...onlyParams });
		if (existError) {
			throw new UserInputError(Object.values(errors)[0]);
		}
		const { content: c } = await CountryController.findByPk(onlyParams.id, {
			include: [{ model: Border }, { model: Language }, { model: Region }],
		});
		return { ...c.dataValues, borders: c?.Borders, languages: c?.Languages, region: c?.Region };
	}
}

module.exports = {
	CountryResolver,
};
