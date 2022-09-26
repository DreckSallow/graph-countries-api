const { readdirSync } = require("fs");
const modelsPath = __dirname + "/models";
let models = {};
const skipFiles = [];

readdirSync(modelsPath).forEach((file) => {
	const fileName = file.split(".")[0];
	if (!skipFiles.includes(fileName)) {
		const objectModels = require(`${modelsPath}/${fileName}`);
		models = {
			...models,
			...objectModels,
		};
	}
});

module.exports = models;
