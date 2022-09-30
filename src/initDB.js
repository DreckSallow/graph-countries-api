const { readFile } = require("fs/promises");
const { BorderController } = require("./controllers/border/controller");

const pathToSeed = __dirname + "/json/countries.json";

const createBorders = (borders) => {
	const promises = borders.map((border) => {
		return BorderController.findOrCreateBorder({ initials: border.name }, { where: { initials: border.name } });
	});
	return Promise.allSettled(promises);
};

const createFields = (lenguajes) => {
	const promises = lenguajes.map((lenguaje) => {
		return BorderController.findOrCreateBorder({ name: lenguaje.name }, { where: { name: lenguaje.name } });
	});
	return Promise.allSettled(promises);
};

const readSeedAndFillDB = async () => {
	const data = await readFile(pathToSeed, "utf8");
	const countries = JSON.parse(data);
	countries.forEach(async (country = {}) => {
		const { borders, lenguajes, ...props } = country;
		props.icon_flag == props.iconFlag;
		props.image == props.flag;
		await createBorders(borders ?? []);
		await createFields(Object.values(lenguajes ?? []));
	});
};

readSeedAndFillDB()
	.then((d) => console.log(d[0]))
	.catch((e) => console.log("error: ", e));

module.exports = {
	readSeedAndFillDB,
};
