const { readFile } = require("fs/promises");
const { BorderController } = require("./controllers/border/controller");
const { CountryController } = require("./controllers/country/controller");
const { LanguagesController } = require("./controllers/language/controller");
const { RegionController } = require("./controllers/region/controller");

const pathToSeed = __dirname + "/json/countries.json";

const createBorders = async (borders, modelCountry) => {
	const promises = borders.map(async (border) => {
		try {
			const {
				error,
				content: { border: newBorder },
			} = await BorderController.findOrCreateBorder({ initials: border }, { where: { initials: border } });
			if (!error) {
				modelCountry.addBorder(newBorder);
			}
		} catch (err) {
			console.log("Error creating Border");
		}
	});
	return Promise.allSettled(promises);
};

const createRegions = async (region, modelCountry) => {
	if (region) {
		try {
			const {
				error,
				content: { region: newRegion },
			} = await RegionController.findOrCreateRegion({ name: region }, { where: { name: region } });
			if (!error) {
				modelCountry.setRegion(newRegion);
			}
		} catch (err) {
			console.log("Error creating Region: ", err);
		}
	}
};

const createLanguages = async (languages, modelCountry) => {
	const promises = languages.map(async (language) => {
		try {
			const {
				error,
				content: { language: newLanguage },
			} = await LanguagesController.findOrCreateLanguage({ name: language }, { where: { name: language } });
			if (!error) {
				modelCountry.addLanguage(newLanguage);
			}
		} catch (err) {
			console.log("Error creating Language: ", err);
		}
	});
	return Promise.allSettled(promises);
};

const readSeedAndFillDB = async () => {
	const data = await readFile(pathToSeed, "utf8");
	const countries = JSON.parse(data);
	countries.forEach(async (country = {}) => {
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
	return true;
};

module.exports = {
	readSeedAndFillDB,
};
