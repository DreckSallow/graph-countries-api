const { readFile } = require("fs/promises");
const { BorderController } = require("./controllers/border/controller");
const { CountryController } = require("./controllers/country/controller");
const { LanguagesController } = require("./controllers/language/controller");
const { RegionController } = require("./controllers/region/controller");

const pathToSeed = __dirname + "/json/countries.json";
const cacheBorders = {};

const createBorders = async (borders, modelCountry) => {
	const promises = borders.map(async (border) => {
		if (cacheBorders[border] === undefined || cacheBorders[border] === null) {
			const { error, content } = await BorderController.createBorder({ initials: border });
			if (!error) {
				await modelCountry.addBorder(content);
				cacheBorders[border] = content;
			}
		} else {
			await modelCountry.addBorder(cacheBorders[border]);
		}
	});
	await Promise.allSettled(promises);
};

const createRegions = async (region, modelCountry) => {
	if (region) {
		const {
			error,
			content: { region: newRegion },
		} = await RegionController.findOrCreateRegion({ name: region }, { where: { name: region } });
		if (!error) {
			await modelCountry.setRegion(newRegion);
		}
	}
};

const createLanguages = async (languages, modelCountry) => {
	const promises = languages.map(async (language) => {
		const {
			error,
			content: { language: newLanguage },
		} = await LanguagesController.findOrCreateLanguage({ name: language }, { where: { name: language } });
		if (!error) {
			await modelCountry.addLanguage(newLanguage);
		}
	});
	await Promise.allSettled(promises);
};
const readCountries = (countries) => {
	return countries.map(async (country = {}) => {
		const { borders, languages, region, ...props } = country;
		props.icon_flag = props.iconFlag;
		props.image = props.flag;
		delete props.iconFlag;
		delete props.flag;
		try {
			const { error, content: newCountry } = await CountryController.createCountry(props);
			if (!error) {
				await createBorders(borders ?? [], newCountry);
				await createLanguages(Object.values(languages ?? {}), newCountry);
				await createRegions(region, newCountry);
			}
		} catch (err) {
			console.log("Error created the models: ", err);
		}
	});
};
const getPartial = (length, n) => {
	let state = 0;
	const partial = Math.floor(length / n);
	return {
		get: () => {
			return {
				init: state,
				next: (state += n),
			};
		},
		partial,
	};
};
let seconds = 2000;

const readSeedAndFillDB = async () => {
	const data = await readFile(pathToSeed, "utf8");
	const countries = JSON.parse(data);
	if (!Array.isArray(countries)) return;
	let partial = getPartial(countries.length, 10);
	const promises = [];
	for (let i = 0; i < partial.partial + 1; i++) {
		const measures = partial.get();
		const zipCountries = countries.slice(measures.init, measures.next);
		promises.push(
			new Promise((res) => {
				setTimeout(() => {
					res(readCountries(zipCountries));
				}, (seconds += 3000));
			}),
		);
	}
	await Promise.allSettled(promises);
};

module.exports = {
	readSeedAndFillDB,
};
