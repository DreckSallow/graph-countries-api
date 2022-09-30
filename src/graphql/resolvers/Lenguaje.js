const { UserInputError } = require("apollo-server");
const { LenguajeController } = require("../../controllers/lenguaje/controller");
const { LenguajeMiddleware } = require("../../controllers/lenguaje/middleware");

class LenguajeResolver {
	static async getAllLenguajes() {
		const { error, content } = await LenguajeController.getAllLenguajes();
		if (error) return [];
		return content;
	}
	static async createLenguaje(root, args) {
		const onlyParams = {
			name: args?.name,
		};
		const { errors, existError } = LenguajeMiddleware.createLenguaje(onlyParams);
		if (existError) {
			throw new UserInputError(Object.values(errors)[0]);
		}
		const { content } = await LenguajeController.createLenguaje(onlyParams);
		return content;
	}
}

module.exports = {
	LenguajeResolver,
};
